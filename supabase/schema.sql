create table if not exists public.project_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  full_name text not null,
  email text not null,
  company text not null,
  industry text not null,
  service text not null,
  budget text null,
  description text not null,
  status text not null default 'New',
  created_at timestamptz not null default now()
);

create index if not exists project_requests_created_at_idx
  on public.project_requests (created_at desc);
