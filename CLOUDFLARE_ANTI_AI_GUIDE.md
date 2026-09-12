# Cloudflare Edge Hardening Guide for devsecops411014.site

Your custom domain `devsecops411014.site` is already routed and proxied through **Cloudflare** (`104.21.15.165` / `server: cloudflare`).

Because traffic hits Cloudflare's edge before GitHub Pages, you can block AI scrapers, Claude, and automated bots **at the network perimeter with HTTP 403 Forbidden** before they ever receive a single byte from your website.

Follow these 3 quick steps in your Cloudflare Dashboard:

---

### Step 1: Turn On 1-Click "Block AI Scrapers and Crawlers" (Most Important)

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Select your domain: `devsecops411014.site`.
3. In the left navigation menu, go to **Security** → **Bots**.
4. Locate the toggle **"Block AI scrapers and crawlers"** (or **"AI Scraper & Crawler Protection"**).
5. Toggle it to **ON**.

> **What this does:** Cloudflare maintains an automatically updated threat intelligence list of all IP ranges and user-agents belonging to Anthropic (ClaudeBot), OpenAI (GPTBot), Perplexity, Common Crawl (CCBot), ByteDance, etc., and drops their connections immediately.

---

### Step 2: Enable "Bot Fight Mode" (Free Tier)

1. Under **Security** → **Bots**:
2. Turn **Bot Fight Mode** to **ON**.
3. This runs automated JavaScript and behavioral detection on visitors. Headless scraper tools, automated Python/Node scripts, and command-line tools without real human interaction will be challenged or blocked automatically.

---

### Step 3: Add a Custom WAF Rule (Optional Defense-in-Depth)

To explicitly block requests that claim to be AI agents or scrapers:

1. In Cloudflare, go to **Security** → **WAF** → **Custom rules**.
2. Click **Create rule**.
3. Name the rule: `Block AI Crawlers & Scrapers`.
4. Under "If incoming requests match...", set:
   - Field: `User Agent`
   - Operator: `contains`
   - Value: `claude` OR `anthropic` OR `gptbot` OR `chatgpt` OR `perplexity` OR `bytespider` OR `ccbot` OR `scrapy` OR `python-requests`
5. Choose action: **Block** (or **Managed Challenge**).
6. Click **Deploy**.

---

### Summary of What Happens Now:
1. **Network Edge**: Cloudflare drops ClaudeBot / GPTBot / scrapers with `403 Forbidden`.
2. **Direct Crawlers**: `robots.txt` disallows all AI crawlers.
3. **HTTP Fetch**: Any scraper that manages to download `index.html` receives zero resume data and zero PII—only an AES-256 encrypted payload and a locked security gateway.
4. **Browser**: Only authorized humans with the PIN or approved link can decrypt and render the portfolio.
