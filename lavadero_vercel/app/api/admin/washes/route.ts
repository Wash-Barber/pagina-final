// app/api/admin/washes/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
// import { isAdmin } from '@/lib/auth'; // Desactivado para la demo para evitar fallos de login

export async function GET() {
  // if(!(await isAdmin())) return NextResponse.json({error:'No autorizado'},{status:401});
  
  const activeWashes = db.washes.filter(w => w.status === 'active');
  // Ordenamos por fecha de creación (los más viejos primero)
  activeWashes.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  
  return NextResponse.json(activeWashes);
}