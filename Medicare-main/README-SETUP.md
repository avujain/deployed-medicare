# Fixes made
1. `nodemon.json` was pointing at a non-existent `server/index.ts` via `ts-node` — the
   real file is `server/index.js`. This meant `npm run server` (and `npm run dev`)
   crashed instantly on a fresh clone. Fixed to run `node server/index.js` directly.
2. `src/pages/BookAppointment.jsx` called the payment API on port `4240`, but the
   Express server listens on `4242` (`server/index.js`). Fixed both fetch calls.

Everything else (Firebase auth, hardcoded sample doctors in `Doctors.jsx`/`Profile.jsx`)
was left as-is per your call — those aren't wired to the Express/Mongo backend, only
payments are.

# To run it locally

1. **Install MongoDB** (backend needs a running Mongo instance):
   - Easiest: install MongoDB Community Server and run it as a local service, OR
   - `docker run -d -p 27017:27017 --name mongo mongo` if you have Docker.

2. **Get a free Stripe test account** at stripe.com → Developers → API keys.
   You need the `Secret key` (sk_test_...) and `Publishable key` (pk_test_...).

3. **Create your `.env`** at the project root — copy `.env.example` to `.env` and
   fill in real values:
   ```
   cp .env.example .env
   ```

4. **Install dependencies**:
   ```
   npm install
   ```

5. **Run both frontend + backend together**:
   ```
   npm run dev
   ```
   This runs `nodemon server/index.js` (port 4242) and `vite` (port 5173) at once.
   Watch the terminal for `Connected to MongoDB` — if you see a connection error,
   Mongo isn't running or `MONGODB_URI` is wrong.

6. Open the Vite URL (usually `http://localhost:5173`).

# Notes
- Firebase auth still uses the config hardcoded in `src/config/firebase.js` — that's
  a real Firebase project's public config (safe to expose client-side), so login/
  register will work as long as that Firebase project is still live.
- Only the **payment flow** (Book Appointment → pay) talks to your local Express
  backend now. Doctors, Appointments, Prescriptions pages still show static/sample
  data, not live from MongoDB.
- Stripe test card `4242 4242 4242 4242` is already hardcoded in the payment flow,
  so you don't need to type a real card for testing.
