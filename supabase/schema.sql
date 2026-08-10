create table if not exists public.project_requests (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  full_name text not null,
  email text not null,
  company text not null,
  industry text not null,
  service text not null,
  budget text,
  description text not null,
  status text not null default 'New',
  created_at timestamptz not null default now()
);

alter table public.project_requests enable row level security;
