# AgentParking

Mobile-first UK parking sign assistant with ticket/evidence review, vehicle settings and language selection.

## Secure configuration

There is no browser key-entry page. All credentials are read only on the server from the deployment environment:

- `OPENAI_API_KEY`: vision analysis of uploaded signs, tickets and evidence.
- `AGENTMAIL_API_KEY`: email provider credential.
- `AGENTMAIL_INBOX_ID`: sending inbox identifier.

Set these through your hosting provider's environment/secret manager. On Sites, use runtime environment secrets and redeploy. When deploying from GitHub, repository **Settings → Secrets and variables → Actions** can hold deployment secrets, but the workflow must explicitly configure them in your hosting platform's runtime environment. GitHub Actions secrets alone do not configure the running website.

Never paste keys into source code, commit them, prefix them with `NEXT_PUBLIC_` or `VITE_`, or put them in browser storage. `.env.example` contains variable names only. Real `.env*` and `.dev.vars*` files are ignored. For local Wrangler development, use an ignored `.dev.vars` file. For hosted environments, use the host's secret manager.

The previous owner key-entry page and database secret reader have been removed. No API credentials are included in source.

## Development and deployment

This is a Vinext app targeting Cloudflare Workers. Preserve the existing Sites build integration. Use the Sites install-dependencies and build-site helpers for this checkout. The hosting manifest is `.openai/hosting.json`. A different host requires its compatible Worker configuration; this is not a plain static export.

`node node_modules/typescript/bin/tsc --noEmit` checks types. `node scripts/run-framework.mjs build` builds the application.

## Current functionality

- The example sign uses a reviewed interpretation without API credentials.
- Other images and ticket/evidence uploads use server-side OpenAI vision once configured.
- AgentPhone calling is connected on the hosted site. Payment completion requires an authorised funded payment capability.
- Ticket review can prepare supported appeals, but actual sending awaits verified issuer routing, durable submission tracking and AgentMail activation. Merely setting an email key does not submit appeals automatically.
- Vehicle details and preferences are saved on the current device.
- Language selection localises the whole interface and AI explanations. Official appeal drafts remain in British English.

## AgentPhone integration

The server calls the documented `POST https://api.agentphone.ai/v1/calls` API with your existing agent ID and number ID, plus per-call context (vehicle, destination, issuer/ticket reference, amount, stay and restrictions). It does not create new agents or buy numbers. Configure `AGENTPHONE_API_KEY`, `AGENTPHONE_AGENT_ID`, `AGENTPHONE_NUMBER_ID`, and independently checked destinations in `AGENTPHONE_ALLOWED_NUMBERS` through server runtime settings. No API key is sent to the browser.

Register `/api/phone/webhook` as the existing agent's webhook and save its signing secret as `AGENTPHONE_WEBHOOK_SECRET`. The handler verifies HMAC-SHA256 over `timestamp.raw_body` and rejects stale timestamps. The configured AgentPhone agent uses hosted voice mode. Each outbound call supplies its own task-specific system prompt. D1 tracks duplicate requests and call status; the client receives a per-job status capability, never the AgentPhone credential.

**Payments:** the connected Stripe account is test mode. A Checkout charge, Stripe Customer/PaymentMethod ID, or test Issuing card cannot pay an unrelated real telephone IVR. Real spending requires a separately authorised live payment capability, such as an eligible funded Issuing card with a secure card-entry bridge, or an operator account with a saved payment method. `AGENTPHONE_PAYMENT_REFERENCE` carries only a non-sensitive reference to an existing capability, not card details. If no usable payment capability is configured, the phone agent must stop and request secure handover. For stays without a known price, the call is quote-only. A completed call is always shown as payment unconfirmed; this integration never treats `callSuccessful` as proof of a paid ticket.

## Hosted AgentPhone configuration

The hosted site has the AgentPhone API key, existing agent/number IDs and webhook signing secret configured as runtime secrets. The existing AgentPhone agent is set to hosted voice mode, with British English and a task-limited parking prompt. The signed webhook endpoint is registered at `/api/phone/webhook` with history disabled (`contextLimit: 0`).

The verified PayByPhone payment line `+442070050055` is enabled in the runtime destination allowlist. Other ticket issuers must be independently checked and added by the operator before calling. Verification source: https://www.newham.gov.uk/parking-permits/pay-parking-paybyphone

`STRIPE_MODE` remains `test`. No funded live payment capability has been supplied, so `AGENTPHONE_PAYMENT_REFERENCE` is intentionally unset. The agent must request secure handover rather than claim it has paid. Outbound calling and payment have not been exercised during configuration; webhook delivery is tested separately without placing a call.

Secrets are configured on the hosted site only and are never committed to this public repository. Deployments from this GitHub repository to another host need their own runtime secrets and D1 binding.
