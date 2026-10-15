'use client';
import {useEffect,useState} from 'react';
import {Localise} from './preferences';
export type Transaction={id:string;location:string;date:string;time:string;minutes:number;pence:number;created:string;stay:string};
export type Wallet={balance:number;transactions:Transaction[]};
export const initialWallet:Wallet={balance:5000,transactions:[]};
export function useWallet(){
 const [wallet,setWallet]=useState<Wallet>(initialWallet),[ready,setReady]=useState(false),[notice,setNotice]=useState('');
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem('agentparking-demo-wallet-v1')||'null');if(saved&&Number.isInteger(saved.balance)&&saved.balance>=0&&Array.isArray(saved.transactions))setWallet(saved)}catch{}setReady(true)},[]);
 function save(next:Wallet){setWallet(next);try{localStorage.setItem('agentparking-demo-wallet-v1',JSON.stringify(next));setNotice('')}catch{setNotice('Browser storage is unavailable. Your transactions will last only for this visit.')}}
 return {wallet,ready,notice,save};
}
export const money=(pence:number)=>new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(pence/100);
export function WalletView({wallet,notice,onReset}:{wallet:Wallet;notice:string;onReset:()=>void}){return <Localise><section className="wallet-view"><div className="section-label">YOUR WALLET</div><h2>Your parking, in one place.</h2><div className="wallet-card"><p>Available balance</p><strong>{money(wallet.balance)}</strong></div><p className="helper">Simulated balance and activity, saved on this device. No real funds or parking bookings.</p>{notice&&<p role="status">{notice}</p>}<div className="history-heading"><h3>Transaction history</h3><button className="text-button" onClick={onReset}>Reset wallet</button></div>{!wallet.transactions.length?<div className="empty-history"><h3>No activity yet.</h3><p>Your parking payments will appear here once phone payments are connected.</p></div>:<div className="transactions">{wallet.transactions.map(t=><article className="transaction" key={t.id}><div><h3>{t.location}</h3><p>{t.date} at {t.time} · {t.minutes} minutes</p><small>Receipt {t.id}</small></div><div className="transaction-amount"><strong>−{money(t.pence)}</strong><span>Simulated</span></div></article>)}</div>}</section></Localise>}
