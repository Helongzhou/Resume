#!/usr/bin/env bash
# Deploy portfolio to Tencent CVM / Lighthouse via tar+scp + Docker Compose.
#
# Usage:
#   DEPLOY_HOST=root@111.229.225.2 bash scripts/deploy.sh
#
# Auth (pick one):
#   DEPLOY_KEY=/path/to/private_key
#   DEPLOY_SSH_PRIVATE_KEY='-----BEGIN OPENSSH PRIVATE KEY-----...'
#
# Runtime config (LLM_*, AGENT_*): pass them in the environment to change them.
# When omitted, the values already present in the server's .env are reused, so a
# plain `bash scripts/deploy.sh` never wipes the production LLM key.
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOY_HOST="${DEPLOY_HOST:-root@111.229.225.2}"
REMOTE_DIR="${REMOTE_DIR:-/opt/portfolio}"
SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://zhouhelong.saaslab.cn}"
PORT="${PORT:-3020}"
TMP_TGZ="/tmp/portfolio-deploy.tgz"
TMP_KEY=""
TMP_REMOTE_ENV=""

cleanup() {
  if [[ -n "$TMP_KEY" && -f "$TMP_KEY" ]]; then
    rm -f "$TMP_KEY"
  fi
  if [[ -n "$TMP_REMOTE_ENV" && -f "$TMP_REMOTE_ENV" ]]; then
    rm -f "$TMP_REMOTE_ENV"
  fi
}
trap cleanup EXIT

resolve_key() {
  if [[ -n "${DEPLOY_SSH_PRIVATE_KEY:-}" ]]; then
    TMP_KEY="$(mktemp)"
    # Support secrets that store literal \n sequences.
    printf '%s\n' "${DEPLOY_SSH_PRIVATE_KEY}" | sed 's/\\n/\n/g' >"$TMP_KEY"
    chmod 600 "$TMP_KEY"
    echo "$TMP_KEY"
    return
  fi

  local key_path="${DEPLOY_KEY:-$HOME/.ssh/id_ed25519}"
  if [[ ! -f "$key_path" ]]; then
    echo "ERROR: SSH private key not found." >&2
    echo "Provide DEPLOY_KEY=/path/to/key or DEPLOY_SSH_PRIVATE_KEY=<pem contents>." >&2
    exit 1
  fi
  echo "$key_path"
}

DEPLOY_KEY_PATH="$(resolve_key)" || exit 1
SSH=(ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new -i "$DEPLOY_KEY_PATH")
SCP=(scp -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new -i "$DEPLOY_KEY_PATH")

# Read a key from the .env captured off the server (empty string when absent).
remote_env_get() {
  if [[ -z "$TMP_REMOTE_ENV" || ! -f "$TMP_REMOTE_ENV" ]]; then
    printf ''
    return 0
  fi
  sed -n "s/^$1=//p" "$TMP_REMOTE_ENV" | tail -n 1
}

# Incoming environment wins, then the value already on the server, then default.
pick_env() {
  local incoming="${1:-}" remote="${2:-}" fallback="${3:-}"
  if [[ -n "$incoming" ]]; then
    printf '%s' "$incoming"
  elif [[ -n "$remote" ]]; then
    printf '%s' "$remote"
  else
    printf '%s' "$fallback"
  fi
}

echo "==> Pack project"
tar czf "$TMP_TGZ" \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  --exclude='.env*' \
  -C "$ROOT_DIR" .

echo "==> Upload to $DEPLOY_HOST"
"${SSH[@]}" "$DEPLOY_HOST" "mkdir -p '$REMOTE_DIR'"
"${SCP[@]}" "$TMP_TGZ" "$DEPLOY_HOST:/tmp/portfolio-deploy.tgz"

echo "==> Read existing remote .env (so unset values are reused, not wiped)"
TMP_REMOTE_ENV="$(mktemp)"
"${SSH[@]}" "$DEPLOY_HOST" "cat '$REMOTE_DIR/.env' 2>/dev/null || true" >"$TMP_REMOTE_ENV" || true

LLM_API_KEY_EFF="$(pick_env "${LLM_API_KEY:-}" "$(remote_env_get LLM_API_KEY)" "")"
LLM_BASE_URL_EFF="$(pick_env "${LLM_BASE_URL:-}" "$(remote_env_get LLM_BASE_URL)" "https://api.deepseek.com")"
LLM_MODEL_EFF="$(pick_env "${LLM_MODEL:-}" "$(remote_env_get LLM_MODEL)" "deepseek-chat")"
AGENT_IP_EFF="$(pick_env "${AGENT_IP_DAILY_LIMIT:-}" "$(remote_env_get AGENT_IP_DAILY_LIMIT)" "20")"
AGENT_GLOBAL_EFF="$(pick_env "${AGENT_GLOBAL_DAILY_LIMIT:-}" "$(remote_env_get AGENT_GLOBAL_DAILY_LIMIT)" "200")"

if [[ -n "${LLM_API_KEY:-}" ]]; then
  echo "    LLM_API_KEY : from environment (updating)"
elif [[ -n "$LLM_API_KEY_EFF" ]]; then
  echo "    LLM_API_KEY : reused from server .env (unchanged)"
else
  echo "    LLM_API_KEY : empty — agent runs in recorded demo mode"
fi

echo "==> Extract + env"
# Wipe remote tree first so deleted local files (e.g. redesign pages) do not linger.
"${SSH[@]}" "$DEPLOY_HOST" "rm -rf '$REMOTE_DIR' && mkdir -p '$REMOTE_DIR' && tar xzf /tmp/portfolio-deploy.tgz -C '$REMOTE_DIR' && cat > '$REMOTE_DIR/.env' <<EOF
NEXT_PUBLIC_SITE_URL=$SITE_URL
PORT=$PORT
LLM_API_KEY=$LLM_API_KEY_EFF
LLM_BASE_URL=$LLM_BASE_URL_EFF
LLM_MODEL=$LLM_MODEL_EFF
AGENT_IP_DAILY_LIMIT=$AGENT_IP_EFF
AGENT_GLOBAL_DAILY_LIMIT=$AGENT_GLOBAL_EFF
EOF"

echo "==> Build & start (Docker Compose)"
"${SSH[@]}" "$DEPLOY_HOST" "cd '$REMOTE_DIR' && docker compose up -d --build"

echo "==> Health"
sleep 3
"${SSH[@]}" "$DEPLOY_HOST" "curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:$PORT/zh"

echo "Done. Open: $SITE_URL/zh"
echo "Verify FBE stack: $SITE_URL/zh/projects/fbe-dtc"
