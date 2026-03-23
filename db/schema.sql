-- GoDorm core schema for Supabase PostgreSQL
create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  target_university text,
  preferred_city text,
  budget_weekly int,
  created_at timestamptz default now()
);

create table if not exists properties (
  id text primary key,
  name text not null,
  city text not null,
  university text,
  price_per_week int not null,
  distance_km numeric not null,
  room_type text not null,
  social_score int not null,
  image_url text,
  description text,
  amenities jsonb default '[]'::jsonb,
  lat numeric,
  lng numeric,
  availability text not null,
  updated_at timestamptz default now()
);

create table if not exists saved_properties (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  property_id text references properties(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, property_id)
);

create table if not exists applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  property_id text references properties(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  move_in_date date,
  provider_reference text,
  status text not null default 'submitted',
  created_at timestamptz default now()
);

create table if not exists user_events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  event_name text not null,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
