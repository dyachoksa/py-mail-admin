-- Add last login columns to the mailboxes table
ALTER TABLE public.mailboxes
    ADD COLUMN last_login_at timestamp with time zone NULL,
    ADD COLUMN last_login_ip inet DEFAULT NULL;
