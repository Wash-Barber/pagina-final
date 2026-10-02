import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { SERVICE_LABEL, VEHICLE_LABEL } from '@/lib/wash';
export async function GET(_:Request,{params}:{params:Promise<{token:string}>}){const {token}=await params;const {rows}=await pool.query(`SELECT id,first_name,last_name,vehicle,service,current_step,steps,status,created_at,updated_at FROM washes WHERE token=$1`,[token]);if(!rows[0])return NextResponse.json({error:'Lavado no encontrado'},{status:404});const w=rows[0];return NextResponse.json({...w,vehicleLabel:VEHICLE_LABEL[w.vehicle as keyof typeof VEHICLE_LABEL],serviceLabel:SERVICE_LABEL[w.service as keyof typeof SERVICE_LABEL]})}
