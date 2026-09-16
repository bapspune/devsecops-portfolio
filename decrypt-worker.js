/* Decrypt Worker */
self.importScripts('portfolio-vault.js');

function base64ToUint8(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function attemptVaultDecryption(secret) {
  if (!secret) return { success: false };
  const enc = new TextEncoder();
  const hashBuf = await crypto.subtle.digest('SHA-256', enc.encode(secret));
  const fullHash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
  const slotId = fullHash.substring(0, 16);
  const slot = self.PORTFOLIO_VAULT.slots[slotId];
  if (!slot) return { success: false };
  try {
    const salt = base64ToUint8(self.PORTFOLIO_VAULT.salt);
    const km = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'PBKDF2' }, false, ['deriveKey']);
    const derivedKey = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, km, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    const decMekRaw = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: base64ToUint8(slot.iv) }, derivedKey, base64ToUint8(slot.key));
    const decMek = await crypto.subtle.importKey('raw', decMekRaw, { name: 'AES-GCM' }, false, ['decrypt']);
    // Strip padding from payload if present
    const rawPayload = base64ToUint8(self.PORTFOLIO_VAULT.payload);
    const padLen = self.PORTFOLIO_VAULT.padding || 0;
    const payloadBuf = rawPayload.slice(padLen);
    const decHtmlBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: base64ToUint8(self.PORTFOLIO_VAULT.iv) }, decMek, payloadBuf);
    const decryptedHtml = new TextDecoder().decode(decHtmlBuf);
    return { success: true, html: decryptedHtml };
  } catch (e) {
    return { success: false };
  }
}

self.onmessage = async function (e) {
  const { secret } = e.data;
  const result = await attemptVaultDecryption(secret);
  self.postMessage(result);
};
