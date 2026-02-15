# Vyapar Sathi Supabase Database

## Public Tables
- profiles: One row per authenticated user. Links to auth.users via id. Stores full_name, business_name, business_type, timestamps.
- inventory: Product items owned by a user. Columns include name, sku, quantity, unit_price, timestamps, and user_id → profiles.id.
- staff: Team members for a user. Columns include full_name, role, email, phone, status, timestamps, and user_id → profiles.id.
- suppliers: Vendors for a user. Columns include name, email, phone, address, notes, timestamps, and user_id → profiles.id.
- alerts: Business alerts for a user. Columns include type, title, description, resolved, timestamps, and user_id → profiles.id.

## Keys and Relationships
- profiles.id → auth.users.id
- Each table includes user_id → profiles.id (on delete cascade)

## Row Level Security Policies
- Enabled on all tables.
- Access allowed only when the row belongs to the current user:
  - SELECT: user_id = auth.uid() (profiles uses id = auth.uid())
  - INSERT: user_id = auth.uid() (profiles uses id = auth.uid())
  - UPDATE: user_id = auth.uid()
  - DELETE: user_id = auth.uid()

## How to Apply the Schema
- Open Supabase Dashboard → SQL Editor.
- Copy contents of supabase_vyapar_sathi_schema.sql and run.
- Confirm all tables exist under the public schema.

## Quick Validation Steps
- Create two different authenticated users.
- For each user, insert into profiles with id = auth.uid() and metadata as desired.
- Insert inventory items with user_id = auth.uid() for User A; ensure User B cannot SELECT them.
- Attempt inserts with mismatched user_id; verify they are rejected.
- Try deleting a profile; verify cascading deletes on related rows.

## Common Queries
- Get current user profile:
  - select * from profiles where id = auth.uid();
- List current user inventory:
  - select * from inventory where user_id = auth.uid() order by created_at desc;
- Create a new inventory item:
  - insert into inventory (user_id, name, sku, quantity, unit_price) values (auth.uid(), 'Item', 'SKU-1', 10, 99.99);

