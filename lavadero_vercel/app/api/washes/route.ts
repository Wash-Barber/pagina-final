// app/api/washes/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import QRCode from 'qrcode';
import { db } from '@/lib/db';
import { stepsFor, SERVICE_LABEL, VEHICLE_LABEL, Vehicle, Service } from '@/lib/wash';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, firstName, lastName, dni, vehicle, service } = body;
    
    if (!phone || !firstName || !lastName || !dni || !vehicle || !service) {
      return NextResponse.json({ error: 'Completá todos los campos.' }, { status: 400 });
    }

    const steps = stepsFor(vehicle as Vehicle, service as Service);
    const token = crypto.randomBytes(24).toString('hex');
    const newId = Date.now().toString(); // ID simulado

    const newWash = {
      id: newId,
      token,
      phone,
      first_name: firstName,
      last_name: lastName,
      dni,
      vehicle,
      service,
      current_step: 0,
      steps,
      status: 'active',
      created_at: new Date().toISOString()
    };

    // Guardamos en la memoria global
    db.washes.push(newWash);

    const base = (process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin).replace(/\/$/, '');
    const trackingUrl = `${base}/seguimiento/${token}`;
    const qr = await QRCode.toDataURL(trackingUrl, { margin: 1, width: 500 });
    
    return NextResponse.json({
      id: newId,
      trackingUrl,
      qr,
      vehicleLabel: VEHICLE_LABEL[vehicle as Vehicle],
      serviceLabel: SERVICE_LABEL[service as Service]
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error interno simulado.' }, { status: 500 });
  }
}