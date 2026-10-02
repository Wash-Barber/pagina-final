// app/api/washes/[token]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { VEHICLE_LABEL, SERVICE_LABEL, Vehicle, Service } from '@/lib/wash';

export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  
  const wash = db.washes.find(w => w.token === token);
  if (!wash) return NextResponse.json({ error: 'Lavado no encontrado o ya finalizado.' }, { status: 404 });

  return NextResponse.json({
    ...wash,
    vehicleLabel: VEHICLE_LABEL[wash.vehicle as Vehicle],
    serviceLabel: SERVICE_LABEL[wash.service as Service]
  });
}