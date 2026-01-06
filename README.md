# TRYEN
Buy Tickets. Instantly.
No accounts. No forms. Just click, pay, and go.

TRYEN is a brutally minimal ticketing platform that strips away everything unnecessary. Built for Gen Z who hate signups, forms, and friction.

Philosophy
"Click → Pay → Get ticket → Show up"

Anything beyond that is ego.

Traditional ticketing platforms fail when they:

Ask for too much information

Feel like government forms

Hijack payments

Make ticket access confusing

TRYEN fixes this by being instantly usable.

🎯 Features
User Side (Brutally Minimal)
✅ Zero-friction purchase - Just email & quantity
✅ No accounts required - Guest checkout by default
✅ Instant tickets - QR codes delivered via email immediately
✅ OPay integration - Direct payments to merchant wallet
✅ Single-scroll event pages - No clutter, just essentials

Event Creator Side
🎪 Simple event creation - Set up in under 2 minutes
💰 Transparent payouts - Money goes directly to your wallet
📱 Offline check-in - Works without internet, syncs later

What We DON'T Have
❌ No mandatory signups
❌ No address collection
❌ No gender/age/horoscope questions
❌ No fancy charts nobody looks at
❌ No approval loops (unless fraud)

🛠️ Tech Stack
Frontend: HTML/CSS/JS (Vanilla, no frameworks needed)

Backend: Node.js + Express

Database: PostgreSQL

Payments: OPay API

Deployment: Docker containers

📦 Quick Start
Option 1: Docker (Recommended)
bash
# Clone the repository
# Start everything with one command

Option 2: Local Development
bash
# Backend setup
# Frontend setup

Option 3: No-Backend Mock Mode
Just open frontend/index.html in your browser - it works with mock data!

📁 Project Structure

TRYEN/
├── frontend/           # Pure HTML/CSS/JS (no frameworks!)
│   ├── index.html      # Main landing page
│   ├── checkin.html    # Check-in system
│   └── success.html    # Payment success page
├── backend/            # Node.js API
│   ├── routes/         # API endpoints
│   ├── models/         # Database models
│   └── services/       # Email, OPay, etc.
├── database/           # SQL schemas
└── docker-compose.yml  # One-click deployment
🔧 Environment Variables
env
# Backend (.env)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tryen
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3001

# OPay (for payments)

🎨 Design Principles
Mobile-first - Works perfectly on phones

Offline-capable - Check-in works without internet

Progressive enhancement - Works even with JS disabled

Zero config - Sensible defaults everywhere

🔒 Security
QR codes with unique UUIDs

HTTPS enforced in production

Rate limiting on API endpoints

No sensitive data stored unnecessarily

📈 Business Model
Two transparent options:

Model A (Recommended for trust):

Payments go through platform OPay wallet

5% platform fee deducted before payout

Payouts to creators within 24 hours

🤝 Contributing
We keep it simple:

Fork the repository

Create a feature branch

Submit a pull request

No bureaucracy, just code that works

📄 License
MIT License - see LICENSE file for details.

Issues & Support
Found a bug? Have a feature request?

Open an issue on GitHub

Keep it concise - what's broken, how to reproduce

Better yet: submit a fix!

Remember: Every feature must justify its existence against "Click → Pay → Get ticket → Show up." Anything that doesn't serve this flow doesn't belong here.

💡 Why "TRYEN"?
Try + EN (as in "enable") – Enabling you to try events without the usual hassle.

"The simplest way to buy and sell tickets. Period."

