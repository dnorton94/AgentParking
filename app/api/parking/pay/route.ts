// Phone agent integration boundary. The complete parking context is submitted
// here; connect the chosen provider server-side when its account is configured.
// Never mark a payment successful until the operator/provider confirms it.
export async function POST(request:Request){
 const respond=(message:string,status:number)=>Response.json({status:'unavailable',message},{status,headers:{'Cache-Control':'no-store'}});
 if(request.headers.get('origin')!==new URL(request.url).origin)return respond('Request not allowed.',403);
 if(Number(request.headers.get('content-length')||0)>30000)return respond('Request too large.',413);
 try{const context:any=await request.json();if(typeof context.vehicleRegistration!=='string'||! /^[A-Z0-9 ]{2,12}$/.test(context.vehicleRegistration)||context.assessment!=='allowed')return respond('Check your vehicle registration and parking assessment.',400);
 return respond('Phone payments will be available soon. No call has been placed or payment taken.',503);
 }catch{return respond('Please check your details.',400)}
}
