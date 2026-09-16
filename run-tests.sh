#!/usr/bin/env bash

# Start a simple Python HTTP server in the background
python3 -m http.server 8000 > /dev/null 2>&1 &
SERVER_PID=$!

echo "Started local server (PID $SERVER_PID) on http://localhost:8000"

# Give the server a moment to start
sleep 2

# Run Playwright tests
npx playwright test
TEST_EXIT_CODE=$?

# Kill the server
kill $SERVER_PID || true

echo "Stopped local server (PID $SERVER_PID)"

exit $TEST_EXIT_CODE
