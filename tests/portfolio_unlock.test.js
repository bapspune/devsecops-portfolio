const { test, expect } = require('@playwright/test');

// Helper to hide automation flags
test.beforeEach(async ({ page }) => {
  // Override navigator.webdriver to evade basic detection
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });
});

test('Portfolio unlock flow - incorrect PIN shows error', async ({ page }) => {
  // Navigate to the locally served portfolio and wait for all network activity to settle
  await page.goto('http://localhost:8000');
  await page.waitForLoadState('networkidle');

  // Directly activate the Unlock tab via page evaluation (bypassing possible click issues)
  await page.evaluate(() => {
    // Call the global function to switch tabs
    if (typeof switchGateTab === 'function') {
      switchGateTab('unlock');
    }
  });

  // Wait for the Unlock pane to become active and the input visible
  await page.waitForSelector('#paneUnlock.active', { timeout: 30000 });
  const pinInput = page.locator('#unlockInput');
  await pinInput.waitFor({ state: 'visible', timeout: 20000 });
  await expect(pinInput).toBeVisible();
  await pinInput.fill('1234'); // intentionally incorrect PIN

  // Click the Verify Unlock button
  const submitBtn = page.locator('#btnSubmitUnlock');
  await expect(submitBtn).toBeVisible();
  await submitBtn.click();

  // Wait for the alert to become visible
  const alertBox = page.locator('#gateAlert');
  await alertBox.waitFor({ state: 'visible', timeout: 20000 });
  await expect(alertBox).toBeVisible();
  await expect(alertBox).toContainText('Invalid 2FA PIN');

  // The portfolio should remain locked (body has class portfolio-locked)
  const body = page.locator('body');
  await expect(body).toHaveClass(/portfolio-locked/);
});
