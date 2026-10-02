import { NextResponse } from 'next/server';
import crypto from 'crypto';
import QRCode from 'qrcode';
import { pool } from '@/lib/db';
import { stepsFor, SERVICE_LABEL, VEHICLE_LABEL, Vehicle, Service } from '@/lib/wash';

export async function POST(req: Request){
  try{
    const body=await req.json(); const {phone,firstName,lastName,dni,vehicle,service}=body;
    if(!phone||!firstName||!lastName||!dni||!vehicle||!service) return NextResponse.json({error:'Completá todos los campos.'},{status:400});
    const steps=stepsFor(vehicle as Vehicle, service as Service); const token=crypto.randomBytes(24).toString('hex');
    const {rows}=await pool.query(`INSERT INTO washes (token, phone, first_name, last_name, dni, vehicle, service, current_step, steps, status) VALUES ($1,$2,$3,$4,$5,$6,$7,0,$8,'active') RETURNING id, token`,[token,phone,firstName,lastName,dni,vehicle,service,JSON.stringify(steps)]);
    const base=(process.env.NEXT_PUBLIC_APP_URL||new URL(req.url).origin).replace(/\/$/,''); const trackingUrl=`${base}/seguimiento/${rows[0].token}`; const qr=await QRCode.toDataURL(trackingUrl,{margin:1,width:500});
    return NextResponse.json({id:rows[0].id,trackingUrl,qr,vehicleLabel:VEHICLE_LABEL[vehicle as Vehicle],serviceLabel:SERVICE_LABEL[service as Service]});
  }catch(e){console.error(e);return NextResponse.json({error:'Error de base de datos. Revisá DATABASE_URL y el SQL.'},{status:500})}
}
