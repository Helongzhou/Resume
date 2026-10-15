# Journal - HelongZhou (Part 1)

> AI development session journal
> Started: 2026-10-15

---



## Session 1: saaslab.cn domain migration, copy-button fix, Trellis bootstrap
<!-- trellis-session: v=2 fp=b9b809991eae7998 -->

**Date**: 2026-10-15
**Task**: saaslab.cn domain migration, copy-button fix, Trellis bootstrap
**Branch**: `main`

### Summary

Moved the portfolio from icedew.online to saaslab.cn end to end (DNSPod record, nginx vhosts, Let's Encrypt certs, Docker redeploy) and fixed copy buttons that silently failed on insecure origins. Trellis workflow was also initialised in this repo.

### Main Changes

- DNS: created the zhouhelong.saaslab.cn A record via tccli/DNSPod; apex saaslab.cn now 301s to the canonical subdomain
- nginx: new vhosts for zhouhelong.saaslab.cn (port 80 ACME + 443) and the saaslab.cn apex; resolved a server_name conflict in the legacy default vhost
- TLS: Let's Encrypt certs for zhouhelong.saaslab.cn and saaslab.cn, auto-renewed by certbot.timer
- code: replaced *.icedew.online with *.saaslab.cn across content, compose, deploy script and docs; renamed the edge-proxy worker file
- fix: added src/lib/clipboard.ts with an execCommand fallback and wired it into ProjectDemoPanel, CopyEmailButton and AskSection
- fix: ParallaxCover useTransform overload errors via typed range constants (tsc --noEmit is now clean)
- infra: freed 30.5GB on the CVM by pruning the Docker build cache after npm ci hit ENOSPC
- chore: initialised Trellis (.trellis/.claude/.dsh/.agents) and ignored local interview-prep notes

### Git Commits

| Hash | Message |
|------|---------|
| `0630e23` | chore: init trellis AI workflow |
| `7e5e4a7` | feat: migrate site domain to saaslab.cn |
| `0d4b28d` | fix: copy buttons did nothing on insecure origins |

### Testing

- [OK] tsc --noEmit clean; local production build succeeds
- [OK] https://zhouhelong.saaslab.cn/zh returns 200; http and https apex 301 to canonical with the path preserved; IP access still 200
- [OK] no icedew residue in served HTML; canonical/og:url/sitemap/robots all saaslab.cn; DTC links resolve
- [OK] clipboard fallback confirmed present in the deployed JS chunk fetched over plain http

### Status

[OK] **Completed**

### Next Steps

- run the 00-bootstrap-guidelines task to populate .trellis/spec for this repo
- retire the legacy icedew.online vhosts and certs once the migration has soaked


## Session 2: Enable live LLM agent in production and harden deploy env handling
<!-- trellis-session: v=2 fp=ddf679a07f41ae5d -->

**Date**: 2026-10-15
**Task**: Enable live LLM agent in production and harden deploy env handling
**Branch**: `main`

### Summary

Turned on the real LLM-backed agent on the live site and fixed a deploy script that silently blanked the production LLM key on every redeploy.

### Main Changes

- validated the DeepSeek key via /models before deploying, then redeployed with LLM_API_KEY injected so the site agent runs live instead of in recorded demo mode
- diagnosed that scripts/deploy.sh rewrote the server .env on every run (LLM_API_KEY=${LLM_API_KEY:-}), wiping the key whenever it was not exported
- deploy.sh now reads the existing server .env before the tree is wiped and reuses present values when the env var is absent, logging the source without printing the secret

### Git Commits

| Hash | Message |
|------|---------|
| `be256f9` | fix(deploy): stop wiping the production LLM key on redeploy |

### Testing

- [OK] verified end to end with a streaming POST to /api/agent/chat returning liveEnabled=true and tokens
- [OK] redeployed with no LLM_* variables exported: log reports 'reused from server .env', container still shows LLM_API_KEY set (35 chars)
- [OK] bash -n scripts/deploy.sh clean; site health 200 after deploy

### Status

[OK] **Completed**

### Next Steps

- retire the icedew.online vhosts and certs once the new domain has soaked (backup at /opt/portfolio-env.bak.20261015-172807 can be removed then)
