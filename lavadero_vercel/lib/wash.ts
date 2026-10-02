export type Vehicle = 'auto' | 'camioneta' | 'moto';
export type Service = 'full' | 'habitaculo' | 'exterior' | 'premium' | 'moto_completo';

export const SERVICE_LABEL: Record<Service, string> = {
  full: 'Lavado Full', habitaculo: 'Limpieza Habitáculo', exterior: 'Limpieza Exterior', premium: 'Lavado Premium', moto_completo: 'Lavado Completo'
};

export const VEHICLE_LABEL: Record<Vehicle, string> = { auto: 'Auto', camioneta: 'Camioneta', moto: 'Moto' };

export function stepsFor(vehicle: Vehicle, service: Service) {
  if (vehicle === 'moto') return ['En espera', 'En proceso de lavado', 'En proceso de secado', 'Lavado finalizado'];
  if (service === 'full' || service === 'premium') return ['En espera', 'Lavado de exterior', 'Secado', 'Limpieza de habitáculo', 'Lavado finalizado'];
  return ['En espera', 'En proceso', 'Limpieza finalizada'];
}
