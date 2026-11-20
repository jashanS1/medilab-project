# MediLab Diagnostics - Pathology Laboratory Web Application

A full-stack diagnostic laboratory web platform built with Node.js/Express and React.

---

## 🚀 Quick Start (1-Click Run)

Just double-click:
- **`start-all.bat`**: Launches both Backend (port 3333) and Frontend (port 3000) automatically!

Or run individually via terminal:

### 1. Start Backend:
```bash
cd backend
npm start
```
*Backend runs on: `http://localhost:3333`*

### 2. Start Frontend:
```bash
cd frontend
npm start
```
*Frontend runs on: `http://localhost:3000`*

---

## 🔑 Demo Credentials (Pre-Configured)

You can click the **"Patient Demo"** or **"Admin Demo"** quick-fill buttons on the Sign In page:
- **Patient Account**:
  - Email: `demo@medilab.com`
  - Password: `123456`
- **Admin Account**:
  - Email: `admin@medilab.com`
  - Password: `123456`
- Or click **"Create your account"** to register a new user!

---

## 📋 Features to Showcase in the Demo

1. **Homepage**:
   - Modern hero section with diagnostic highlights
   - Value propositions (Quality, Home collection, Digital reports)
   - Popular diagnostic packages and "How it works" 4-step workflow

2. **Tests & Packages**:
   - Comprehensive test package cards (Complete Blood Count, Full Body Check-up, Diabetes & Heart Care, etc.)
   - Direct "Book this test" routing

3. **Online Appointment & Home Sample Collection**:
   - Interactive appointment request form with date picker and test selector
   - Immediate confirmation with official generated **Booking Reference ID** (e.g. `ML-2026-XXXXX`)

4. **Digital Patient Diagnostic Reports**:
   - Enter lab reference number (e.g., click **"Sample Report"** for `ML-2026-10482` or any reference)
   - Renders a complete, clinical NABL-certified laboratory report with parameter tables, observed values, reference intervals, units, status badges, and pathologist digital signature
   - **"Print / Save PDF"** button (invokes clean print-ready format)

5. **Laboratory Departments & Leadership**:
   - Highlights pathology, biochemistry, hematology, and microbiology divisions
   - Medical leadership team showcase

6. **Patient Contact Portal**:
   - Contact form with topic selector, hours, and direct hotline details

7. **Secure Patient Authentication**:
   - Sign up with validation
   - Login with JWT token issuing and persistent session state
   - Navbar dynamically updates with patient greeting and secure Sign Out
