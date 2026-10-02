import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { VEHICLE_LABEL, SERVICE_LABEL, Vehicle, Service } from '@/lib/wash';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Como unificamos las carpetas, "id" capturará el token de la URL
  const wash = db.washes.find(w => w.token === id);
  if (!wash) return NextResponse.json({ error: 'Lavado no encontrado o ya finalizado.' }, { status: 404 });

  return NextResponse.json({
    ...wash,
    vehicleLabel: VEHICLE_LABEL[wash.vehicle as Vehicle],
    serviceLabel: SERVICE_LABEL[wash.service as Service]
  });
}
