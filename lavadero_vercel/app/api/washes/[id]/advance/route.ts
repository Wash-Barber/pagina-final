import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { isAdmin } from '@/lib/auth';
export async function POST(_:Request,{params}:{params:Promise<{id:string}>}){if(!(await isAdmin()))return NextResponse.json({error:'No autorizado'},{status:401});const {id}=await params;const {rows}=await pool.query(`SELECT current_step,steps FROM washes WHERE id=$1`,[id]);if(!rows[0])return NextResponse.json({error:'No encontrado'},{status:404});const steps=rows[0].steps;const next=Math.min(rows[0].current_step+1,steps.length-1);const status=next===steps.length-1?'finished':'active';await pool.query(`UPDATE washes SET current_step=$1,status=$2,updated_at=NOW() WHERE id=$3`,[next,status,id]);return NextResponse.json({ok:true,current_step:next,status})}
