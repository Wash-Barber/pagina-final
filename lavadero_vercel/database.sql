CREATE TABLE IF NOT EXISTS washes (
  id BIGSERIAL PRIMARY KEY,
  token VARCHAR(64) UNIQUE NOT NULL,
  phone VARCHAR(40) NOT NULL,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  dni VARCHAR(30) NOT NULL,
  vehicle VARCHAR(20) NOT NULL CHECK (vehicle IN ('auto','camioneta','moto')),
  service VARCHAR(30) NOT NULL CHECK (service IN ('full','habitaculo','exterior','premium','moto_completo')),
  current_step INTEGER NOT NULL DEFAULT 0,
  steps JSONB NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS washes_status_created_idx ON washes(status, created_at);
CREATE INDEX IF NOT EXISTS washes_token_idx ON washes(token);
