const fs = require('fs');
const crypto = require('crypto').webcrypto;

async function buildVault() {
  const enc = new TextEncoder();
  const indexHtml = fs.readFileSync('index.html', 'utf-8');

  // Extract from <!-- ===== Navigation ===== --> to </div><!-- end portfolio-main -->
  const startMarker = '<!-- ===== Navigation ===== -->';
  const endMarker = '</div><!-- end portfolio-main -->';

  const startIndex = indexHtml.indexOf(startMarker);
  const endIndex = indexHtml.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    console.error('Markers not found in index.html!');
    process.exit(1);
  }

  const rawPortfolioHtml = indexHtml.substring(startIndex, endIndex + endMarker.length);
  console.log('Extracted raw portfolio HTML length:', rawPortfolioHtml.length, 'characters');

  // 1. Master Encryption Key (MEK) - 256-bit AES-GCM
  const mek = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
  const rawMek = await crypto.subtle.exportKey('raw', mek);

  // 2. Encrypt the portfolio HTML
  const payloadIv = crypto.getRandomValues(new Uint8Array(12));
  const encPayload = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: payloadIv },
    mek,
    enc.encode(rawPortfolioHtml)
  );

  // 3. PBKDF2 Salt (16 bytes)
  const pbkdf2Salt = crypto.getRandomValues(new Uint8Array(16));

  // 4. Authorized secrets - strictly restricted to owner's PIN
  const secrets = [
    '70119928485050871!',
    '70119928485050871'
  ];

  const slots = {};
  for (const s of secrets) {
    const cleanSecret = s.trim();
    // Compute SHA-256
    const hashBuf = await crypto.subtle.digest('SHA-256', enc.encode(cleanSecret));
    const fullHash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
    const slotId = fullHash.substring(0, 16);

    const km = await crypto.subtle.importKey('raw', enc.encode(cleanSecret), { name: 'PBKDF2' }, false, ['deriveKey']);
    const derivedKey = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: pbkdf2Salt, iterations: 100000, hash: 'SHA-256' },
      km,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );

    const slotIv = crypto.getRandomValues(new Uint8Array(12));
    const encMek = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: slotIv }, derivedKey, rawMek);

    slots[slotId] = {
      iv: Buffer.from(slotIv).toString('base64'),
      key: Buffer.from(encMek).toString('base64'),
      fullHash: fullHash
    };
  }

  const vaultData = {
    version: '2.0.0-AES256-GCM',
    cipher: 'AES-GCM-256',
    kdf: 'PBKDF2-SHA256',
    iterations: 100000,
    salt: Buffer.from(pbkdf2Salt).toString('base64'),
    iv: Buffer.from(payloadIv).toString('base64'),
    slots: slots,
    payload: Buffer.from(encPayload).toString('base64')
  };

  const vaultJs = `/* ============================================================
   ENCRYPTED PORTFOLIO VAULT (AES-256-GCM Cryptographic Storage)
   Zero Plaintext: Content is cryptographically locked at rest.
   ============================================================ */
(function(root) {
  root.PORTFOLIO_VAULT = ${JSON.stringify(vaultData, null, 2)};
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
`;

  fs.writeFileSync('portfolio-vault.js', vaultJs, 'utf-8');
  console.log('Successfully generated portfolio-vault.js (' + vaultJs.length + ' bytes)');

  // Verify decryption of vault with PIN "411014", "70119928485050871!", and "DevSecOps@411014#Suhas"
  for (const testPass of ['70119928485050871!', '70119928485050871']) {
    const testHashBuf = await crypto.subtle.digest('SHA-256', enc.encode(testPass));
    const testHashHex = Array.from(new Uint8Array(testHashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
    const testSlotId = testHashHex.substring(0, 16);

    const slot = slots[testSlotId];
    if (!slot) throw new Error('Slot not found for ' + testPass);

    const userKm = await crypto.subtle.importKey('raw', enc.encode(testPass), { name: 'PBKDF2' }, false, ['deriveKey']);
    const userDerivedKey = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: pbkdf2Salt, iterations: 100000, hash: 'SHA-256' },
      userKm,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );

    const decMekRaw = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: Buffer.from(slot.iv, 'base64') },
      userDerivedKey,
      Buffer.from(slot.key, 'base64')
    );

    const decMek = await crypto.subtle.importKey('raw', decMekRaw, { name: 'AES-GCM' }, false, ['decrypt']);
    const decHtmlBuf = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: Buffer.from(vaultData.iv, 'base64') },
      decMek,
      Buffer.from(vaultData.payload, 'base64')
    );

    const decryptedStr = new TextDecoder().decode(decHtmlBuf);
    if (decryptedStr === rawPortfolioHtml) {
      console.log(`[PASS] Decryption verified 100% byte-for-byte with "${testPass}"!`);
    } else {
      console.error(`[FAIL] Decrypted text did not match for "${testPass}"!`);
    }
  }
}

buildVault().catch(err => {
  console.error(err);
  process.exit(1);
});
