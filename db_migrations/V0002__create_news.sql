CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Городские новости',
  status TEXT NOT NULL DEFAULT 'done' CHECK (status IN ('done', 'inprogress', 'planned')),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);