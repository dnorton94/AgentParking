'use client';
import {useEffect,useState} from 'react';
import {PhoneCall} from './phone-call';
import {usePreferences,Localise} from './preferences';
type Props={date:string;time:string;duration:string;permit:string;returned:string;demo:boolean;result:{status:string;restrictions:string;payment:string;maximum:string;returnRule:string;caution:string;paymentPhone?:string;locationCode?:string}};
export function PhonePayment(p:Props){
 const {preferences}=usePreferences();
 const [selected,setSelected]=useState('');
 useEffect(()=>{const vehicle=preferences.vehicles.find(v=>v.id===preferences.defaultVehicle);if(vehicle){setSelected(vehicle.id);setRegistration(vehicle.registration)}},[preferences.defaultVehicle]);
 const [registration,setRegistration]=useState(''),[notice,setNotice]=useState(''),[busy,setBusy]=useState(false);
 const context={kind:'parking' as const,language:preferences.language,paymentPhone:p.demo?'+442070050055':p.result.paymentPhone||'',locationCode:p.demo?'70094':p.result.locationCode||'',vehicleRegistration:registration.trim().toUpperCase(),arrivalDate:p.date,arrivalTime:p.time,timeZone:'Europe/London',durationMinutes:Number(p.duration),paymentInstructions:p.result.payment,restrictions:p.result.restrictions,maximumStay:p.result.maximum,noReturn:p.result.returnRule};
 if(p.result.status!=='allowed')return null;
 return <Localise><section className="payment-box"><div className="section-label">PAY FOR PARKING</div><div>{preferences.vehicles.length>0&&<label>Vehicle<select value={selected} onChange={e=>{setSelected(e.target.value);const vehicle=preferences.vehicles.find(v=>v.id===e.target.value);setRegistration(vehicle?.registration||'');setNotice('')}}><option value="">Use another vehicle</option>{preferences.vehicles.map(v=><option key={v.id} value={v.id}>{v.registration}{v.name?' · '+v.name:''}</option>)}</select></label>}<label htmlFor="vehicle-registration">Vehicle registration<input id="vehicle-registration" required pattern="[A-Za-z0-9 ]{2,12}" minLength={2} maxLength={12} value={registration} onChange={e=>{setRegistration(e.target.value.toUpperCase());setNotice('')}} autoComplete="off" autoCapitalize="characters" spellCheck={false} placeholder="AB12 CDE"/></label><PhoneCall key={[registration,p.date,p.time,p.duration].join('|')} context={context}/></div></section></Localise>
}
