# Testing OAuth Login (UC1/UC2/UC3) Locally


## 1. Get both repos running

```bash
git clone <backend-repo-url>
cd evonix-backend
npm install
```
```bash
git clone <frontend-repo-url>
cd evonix-frontend
npm install
```

## 2. Set up the backend's `.env`

In `evonix-backend`, copy `.env.example` to `.env` and fill in the real
values (get these from whoever has Supabase dashboard access - Settings →
API):

```
PORT=5050
DATABASE_URL=
DIRECT_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

`FRONTEND_URL` must match the URL the frontend actually runs on (step 4) -
`5173` is Vite's default, so this usually needs no changes.

## 3. Set up the frontend's `.env`

In `evonix-frontend`, copy `.env.example` to `.env`:

```
VITE_SUPABASE_URL=<same value as the backend's SUPABASE_URL>
VITE_SUPABASE_ANON_KEY=<same value as the backend's SUPABASE_ANON_KEY>
VITE_API_BASE_URL=http://localhost:5050/api
```

`VITE_API_BASE_URL` must match whatever `PORT` you set in the backend's
`.env`.

Both `.env` files are git-ignored - never commit them or paste real values
into Slack/GitHub.

## 4. Start both servers (two terminals)

Terminal 1:
```bash
cd evonix-backend
npm run dev
```
Confirm it's up: open **http://localhost:5050/api/health** - you should see
`{"status":"ok", ...}`.

Terminal 2:
```bash
cd evonix-frontend
npm run dev
```
It'll print a URL, normally **http://localhost:5173**.

## 5. Confirm the redirect URL is allowed in Supabase

The login page redirects back to itself after Google sign-in. In the
Supabase dashboard → Authentication → URL Configuration → Redirect URLs,
confirm `http://localhost:5173/login` is in the list. If not, add it - ask
a teammate with dashboard access if you can't.

## 6. Test it

1. Open **http://localhost:5173/login**
2. Click **Sign in with Google**, log in with your test-listed Gmail account
3. You should land back on the page showing "You are signed in" with your
   user info
4. Click **Complete your profile** → fill in phone and/or address → **Save
   Profile** → should show "Profile saved successfully."
5. **Check it actually wrote to the database**: Supabase dashboard → Table
   Editor → `profiles` table → find your row (matches your email) → confirm
   `phone` updated. Then check the `addresses` table for a new row with a
   matching `user_id`.
6. Click **Sign Out** → page should revert to the signed-out view. Reloading
   `/login` afterward should not show you as signed in.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Google says "access blocked" | Your Gmail isn't in the Test users list yet (step 0) |
| Redirected back to a Google/Supabase error page instead of `/login` | `http://localhost:5173/login` isn't in Supabase's Redirect URLs list (step 5) |
| "Database error saving new user" on first sign-in | Known trigger bug, already fixed in `schema.sql` - make sure you're on the latest `main` |
| Buttons on `/login` don't seem to do anything / network errors in the console | `FRONTEND_URL` in the backend's `.env` doesn't match `http://localhost:5173`, or the backend isn't running - CORS blocks the request silently otherwise |
| "Session invalid" message after signing in | Your token may have been revoked (e.g. you signed out elsewhere) - try signing in again |



