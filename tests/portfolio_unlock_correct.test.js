const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Override navigator.webdriver to evade basic detection
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });
});

test('Portfolio unlock flow - correct PIN unlocks portfolio', async ({ page }) => {
  // Navigate to the locally served portfolio and wait for network idle
  await page.goto('http://localhost:8000');
  await page.waitForLoadState('networkidle');

  // Directly activate the Unlock tab via page evaluation (bypassing possible click issues)
  await page.evaluate(() => {
    if (typeof switchGateTab === 'function') {
      switchGateTab('unlock');
    }
  });

  // Wait for the Unlock pane to become active and the input visible
  await page.waitForSelector('#paneUnlock.active', { timeout: 30000 });
  const pinInput = page.locator('#unlockInput');
  await pinInput.waitFor({ state: 'visible', timeout: 20000 });
  await expect(pinInput).toBeVisible();
  await pinInput.fill('70119928485050871');

  // Submit the PIN
  const submitBtn = page.locator('#btnSubmitUnlock');
  await expect(submitBtn).toBeVisible();
  await submitBtn.click();

  // Expect a success alert indicating authorization verified
  const alertBox = page.locator('#gateAlert');
  await expect(alertBox).toBeVisible();
  await expect(alertBox).toContainText('Authorization Verified');

  // The body should no longer have the locked class
  const body = page.locator('body');
  await expect(body).not.toHaveClass(/portfolio-locked/);

  // Decrypted portfolio content should be mounted
  const mount = page.locator('#portfolio-mount');
  await expect(mount).not.toBeEmpty();
});
