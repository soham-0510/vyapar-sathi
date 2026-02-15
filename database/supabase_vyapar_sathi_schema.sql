create extension if not exists "uuid-ossp";

begin;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  business_name text not null,
  business_type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy profiles_select_own on public.profiles for select using (id = auth.uid());
create policy profiles_insert_self on public.profiles for insert with check (id = auth.uid());
create policy profiles_update_own on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy profiles_delete_own on public.profiles for delete using (id = auth.uid());

create table if not exists public.inventory (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  sku text,
  quantity integer not null default 0,
  unit_price numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.inventory enable row level security;
create policy inventory_select_own on public.inventory for select using (user_id = auth.uid());
create policy inventory_insert_own on public.inventory for insert with check (user_id = auth.uid());
create policy inventory_update_own on public.inventory for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy inventory_delete_own on public.inventory for delete using (user_id = auth.uid());

create table if not exists public.staff (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  full_name text not null,
  role text,
  email text,
  phone text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.staff enable row level security;
create policy staff_select_own on public.staff for select using (user_id = auth.uid());
create policy staff_insert_own on public.staff for insert with check (user_id = auth.uid());
create policy staff_update_own on public.staff for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy staff_delete_own on public.staff for delete using (user_id = auth.uid());

create table if not exists public.suppliers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  address text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.suppliers enable row level security;
create policy suppliers_select_own on public.suppliers for select using (user_id = auth.uid());
create policy suppliers_insert_own on public.suppliers for insert with check (user_id = auth.uid());
create policy suppliers_update_own on public.suppliers for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy suppliers_delete_own on public.suppliers for delete using (user_id = auth.uid());

create table if not exists public.alerts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  description text,
  resolved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.alerts enable row level security;
create policy alerts_select_own on public.alerts for select using (user_id = auth.uid());
create policy alerts_insert_own on public.alerts for insert with check (user_id = auth.uid());
create policy alerts_update_own on public.alerts for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy alerts_delete_own on public.alerts for delete using (user_id = auth.uid());

commit;
