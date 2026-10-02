'use client';
import { useEffect, useState } from 'react';

export default function Tracking({ params }: { params: Promise<{ token: string }> }) {
  const [token, setToken] = useState('');
  const [w, setW] = useState<any>(null);
  const [err, setErr] = useState('');

  useEffect(() => { params.then(p => setToken(p.token)) }, [params]);

  useEffect(() => {
    if (!token) return;
    let live = true;
    const load = async () => {
      const r = await fetch(`/api/washes/${token}`, { cache: 'no-store' });
      const d = await r.json();
      if (!r.ok) setErr(d.error);
      else if (live) setW(d);
    };
    load();
    const i = setInterval(load, 3000);
    return () => { live = false; clearInterval(i) }
  }, [token]);

  if (err) return <main className="wrap"><div className="top"><div className="brand">LAVA<span>DERO</span></div></div><div className="card center error">{err}</div></main>;
  if (!w) return <main className="wrap"><div className="card center">Cargando estado...</div></main>;

  return (
    <main className="wrap">
      <div className="top">
        <div>
          <div className="brand">LAVA<span>DERO</span></div>
          <div className="sub">Seguimiento en tiempo real</div>
        </div>
      </div>
      
      {/* Tarjeta 1: Estado del lavado */}
      <div className="card">
        <div className="big">{w.first_name} {w.last_name}</div>
        <p className="sub">{w.vehicleLabel} · {w.serviceLabel}</p>
        <h2>{w.steps[w.current_step]}</h2>
        <div className="track">
          {w.steps.map((s: string, i: number) => (
            <div className={`step ${i === w.current_step ? 'active' : ''} ${i < w.current_step ? 'done' : ''}`} key={s}>
              <div className="dot">{i < w.current_step ? '✓' : i === w.current_step ? '●' : '○'}</div>{s}
            </div>
          ))}
        </div>
        <p className="sub">La pantalla se actualiza automáticamente cada 3 segundos.</p>
      </div>

      {/* Tarjeta 2: Mapa 3D del Local */}
      <div className="card" style={{ marginTop: '20px', padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 20px 10px 20px' }}>
          <h2 style={{ margin: 0, color: '#f59e0b' }}>Mapa 3D del Local</h2>
          <p className="sub" style={{ marginTop: '5px' }}>Recorré las instalaciones mientras esperás. Deslizá para rotar, pellizcá para zoom.</p>
        </div>
        {/* Aquí cargamos tu archivo mapa.html */}
        <iframe 
          src="/mapa.html" 
          width="100%" 
          height="380px" 
          style={{ border: 'none', display: 'block', backgroundColor: '#09090b' }} 
          title="Mapa 3D Wash & Barber"
        />
      </div>
    </main>
  );
}
