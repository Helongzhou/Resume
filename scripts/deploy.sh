#!/usr/bin/env bash
# Deploy portfolio to Tencent Lighthouse via tar+scp + Docker Compose.
#
# Usage:
#   DEPLOY_HOST=root@111.229.225.2 bash scripts/deploy.sh
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOY_HOST="${DEPLOY_HOST:-root@111.229.225.2}"
DEPLOY_KEY="${DEPLOY_KEY:-$HOME/.ssh/id_ed25519}"
REMOTE_DIR="${REMOTE_DIR:-/opt/portfolio}"
SITE_URL="${NEXT_PUBLIC_SITE_URL:-http://111.229.225.2:3020}"
PORT="${PORT:-3020}"
TMP_TGZ="/tmp/portfolio-deploy.tgz"

SSH=(ssh -o IdentitiesOnly=yes -i "$DEPLOY_KEY")
SCP=(scp -o IdentitiesOnly=yes -i "$DEPLOY_KEY")

echo "==> Pack project"
tar czf "$TMP_TGZ" \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  --exclude='.env*' \
  -C "$ROOT_DIR" .

echo "==> Upload"
"${SSH[@]}" "$DEPLOY_HOST" "mkdir -p '$REMOTE_DIR'"
"${SCP[@]}" "$TMP_TGZ" "$DEPLOY_HOST:/tmp/portfolio-deploy.tgz"

echo "==> Extract + env"
# Wipe remote tree first so deleted local files (e.g. redesign pages) do not linger.
"${SSH[@]}" "$DEPLOY_HOST" "rm -rf '$REMOTE_DIR' && mkdir -p '$REMOTE_DIR' && tar xzf /tmp/portfolio-deploy.tgz -C '$REMOTE_DIR' && cat > '$REMOTE_DIR/.env' <<EOF
NEXT_PUBLIC_SITE_URL=$SITE_URL
PORT=$PORT
LLM_API_KEY=${LLM_API_KEY:-}
LLM_BASE_URL=${LLM_BASE_URL:-https://api.deepseek.com}
LLM_MODEL=${LLM_MODEL:-deepseek-chat}
AGENT_IP_DAILY_LIMIT=${AGENT_IP_DAILY_LIMIT:-20}
AGENT_GLOBAL_DAILY_LIMIT=${AGENT_GLOBAL_DAILY_LIMIT:-200}
EOF"

echo "==> Build & start"
"${SSH[@]}" "$DEPLOY_HOST" "cd '$REMOTE_DIR' && docker compose up -d --build"

echo "==> Health"
sleep 2
"${SSH[@]}" "$DEPLOY_HOST" "curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:$PORT/zh"

echo "Done. Open: $SITE_URL/zh"
