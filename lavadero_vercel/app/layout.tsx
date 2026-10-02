import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Lavadero | Control de vehículos', description: 'Sistema de turnos y seguimiento de lavadero' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>;
}
