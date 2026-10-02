import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { isAdmin } from '@/lib/auth';

export async function GET(){
  if(!(await isAdmin())) return NextResponse.json({error:'No autorizado'},{status:401});
  const {rows}=await pool.query(`SELECT id,first_name,last_name,phone,dni,vehicle,service,current_step,steps,status,created_at FROM washes WHERE status='active' ORDER BY created_at ASC`);
  return NextResponse.json(rows);
}
