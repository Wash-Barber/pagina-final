// lib/wash.ts
export type Vehicle = 'auto' | 'camioneta' | 'moto';
export type Service = 'full' | 'habitaculo' | 'exterior' | 'premium' | 'moto_completo';

export const VEHICLE_LABEL = {
  auto: 'Auto',
  camioneta: 'Camioneta',
  moto: 'Moto'
};

export const SERVICE_LABEL = {
  full: 'Lavado Full',
  habitaculo: 'Limpieza Habitáculo',
  exterior: 'Limpieza Exterior',
  premium: 'Lavado Premium',
  moto_completo: 'Lavado Completo'
};

export function stepsFor(vehicle: Vehicle, service: Service) {
  if (vehicle === 'moto') {
    return ['En espera', 'En proceso de lavado', 'En proceso de secado', 'Lavado finalizado'];
  }
  if (service === 'habitaculo' || service === 'exterior') {
    return ['En espera', 'En proceso', 'Limpieza finalizada'];
  }
  return ['En espera', 'Lavado de exterior', 'Secado', 'Limpieza de habitáculo', 'Lavado finalizado'];
}
