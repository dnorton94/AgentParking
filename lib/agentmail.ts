// Server-only adapter; called only from the verified appeal submission workflow
// once recipient verification, duplicate protection and abuse controls are ready.
export async function sendAppeal(apiKey:string,inboxId:string,mail:{to:string;subject:string;text:string;reply_to:string;attachments:{filename:string;content_type:string;content:string}[]}){
 const response=await fetch(`https://api.agentmail.to/v0/inboxes/${encodeURIComponent(inboxId)}/messages/send`,{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify(mail),signal:AbortSignal.timeout(30000)});
 if(!response.ok)throw new Error('AgentMail did not confirm sending.');
 const result:any=await response.json();if(typeof result.message_id!=='string')throw new Error('No message confirmation.');
 return {messageId:result.message_id,threadId:result.thread_id};
}
