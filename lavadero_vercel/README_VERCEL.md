# Lavadero — versión Vercel

Esta versión reemplaza WhatsApp por un QR único de seguimiento.

## Arquitectura
- Next.js + TypeScript
- Vercel para publicar la aplicación
- PostgreSQL alojado (recomendado: Neon o Supabase)
- QR único por lavado
- Panel `/admin` para el personal
- Seguimiento público `/seguimiento/<token>`

## 1. Base de datos
En Vercel podés instalar Neon o Supabase desde Marketplace. Luego copiá la variable `DATABASE_URL` al proyecto.

Abrí el SQL editor del proveedor y ejecutá el contenido de `database.sql`.

## 2. Variables de entorno
En Vercel → Project → Settings → Environment Variables:

DATABASE_URL = conexión PostgreSQL
ADMIN_PASSWORD = contraseña del personal
NEXT_PUBLIC_APP_URL = https://TU-PROYECTO.vercel.app

No pongas las contraseñas en el código.

## 3. Publicar
Opción sencilla:
1. Subí esta carpeta a GitHub.
2. En Vercel elegí Add New → Project.
3. Importá el repositorio.
4. Agregá las variables de entorno.
5. Deploy.

También podés usar Vercel CLI desde la carpeta:

npm install
vercel

## 4. Flujo
1. Cliente carga teléfono, nombre, apellido y DNI.
2. Selecciona vehículo y servicio.
3. Se crea el lavado en PostgreSQL.
4. El sistema genera un QR único.
5. El cliente escanea el QR y entra directamente a `/seguimiento/...`.
6. El personal entra a `/admin` y avanza los estados.
7. El celular consulta el estado cada 3 segundos.

## Credencial inicial
La contraseña NO viene fija en el proyecto. La definís con `ADMIN_PASSWORD` en Vercel.

## Importante
El MySQL de XAMPP no sirve como base de datos online para una app desplegada en Vercel. Esta versión usa PostgreSQL alojado para que el QR funcione desde cualquier celular con internet.
