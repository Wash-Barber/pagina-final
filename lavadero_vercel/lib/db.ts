// lib/db.ts
// Base de datos temporal en memoria para la demo en Vercel
declare global {
  var _washes: any[];
}

// Mantenemos la instancia viva en la memoria del servidor
if (!globalThis._washes) {
  globalThis._washes = [];
}

export const db = {
  washes: globalThis._washes
};
