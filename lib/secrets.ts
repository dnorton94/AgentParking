import {env} from 'cloudflare:workers';
// Secrets are supplied by the deployment host, never stored in source or the UI.
const allowed=['OPENAI_API_KEY','AGENTMAIL_API_KEY','AGENTMAIL_INBOX_ID','AGENTPHONE_API_KEY','AGENTPHONE_WEBHOOK_SECRET'];
export async function getSecret(name:string):Promise<string|undefined>{if(!allowed.includes(name))return;return (env as unknown as Record<string,string>)[name]||undefined}
