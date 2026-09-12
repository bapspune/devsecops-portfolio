#!/usr/bin/env bash
# Auto-enforce HTTPS on GitHub Pages once Let's Encrypt finishes issuing the SSL certificate
REPO="bapspune/devsecops-portfolio"
echo "Starting HTTPS enforcement monitor for devsecops411014.site on GitHub Pages..."

for i in {1..120}; do
  CERT_STATE=$(gh api /repos/$REPO/pages | jq -r '.https_certificate.state // "unknown"')
  ENFORCED=$(gh api /repos/$REPO/pages | jq -r '.https_enforced // false')
  echo "[$(date +'%T')] Check #$i: Certificate state = '$CERT_STATE', https_enforced = $ENFORCED"

  if [ "$ENFORCED" = "true" ]; then
    echo "HTTPS is already strictly enforced!"
    exit 0
  fi

  # Attempt enforcement PUT
  RESULT=$(gh api --method PUT /repos/$REPO/pages -F https_enforced=true 2>&1)
  if echo "$RESULT" | grep -q "The certificate has not finished being issued"; then
    echo "Certificate provisioning in progress with Let's Encrypt... waiting 30s"
    sleep 30
  else
    echo "HTTPS Enforcement Response: $RESULT"
    echo "Successfully enabled HTTPS enforcement on devsecops411014.site!"
    exit 0
  fi
done
