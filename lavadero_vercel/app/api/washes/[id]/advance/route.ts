// app/api/washes/[id]/advance/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const washIndex = db.washes.findIndex(w => w.id === id);
  if (washIndex === -1) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });

  const wash = db.washes[washIndex];
  const next = Math.min(wash.current_step + 1, wash.steps.length - 1);
  const status = next === wash.steps.length - 1 ? 'finished' : 'active';

  // Actualizamos en memoria
  db.washes[washIndex] = { ...wash, current_step: next, status, updated_at: new Date().toISOString() };

  return NextResponse.json({ ok: true, current_step: next, status });
}