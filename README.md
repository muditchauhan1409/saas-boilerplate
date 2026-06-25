<div align="center">

<h1 align="center">🚀 Multi-Tenant SaaS Boilerplate</h1>
<h3 align="center">The complete foundation for building and scaling SaaS products</h3>

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=8B5CF6&center=true&vCenter=true&width=700&lines=Multi-Tenant+SaaS+Boilerplate+%F0%9F%9A%80;Auth+%2B+Orgs+%2B+Billing+%2B+AI+Insights+%E2%9C%A8;Built+with+Next.js+14+%2B+TypeScript;Production-Ready+from+Day+1+%F0%9F%94%A5" alt="Typing SVG" />
</a>

<br/>

</div>

---

## 🧠 About This Project

Every SaaS product needs the same boring foundation — a secure login system, team and organization management, a payment and subscription system, and insights into user behavior.

Building this from scratch takes **weeks**. This boilerplate gives you all of it — production-ready, fully typed, and built on the most in-demand stack in 2025. Whether you're a startup founder or a developer building your next product, this is your starting point.

---

## 🎯 What Problem Does This Solve?

Most developers spend the first few weeks of every SaaS project rebuilding the same things. Authentication gets hacked together. Multi-tenancy is an afterthought. Billing takes forever to wire up. And analytics never gets built at all.

This project solves all four of those problems in one place — so you can skip straight to building the thing that actually makes your product unique.

---

## ✨ Features

### 🔐 Authentication System
- Email and password registration with bcrypt hashing
- Secure JWT-based sessions via NextAuth.js
- Protected routes — unauthenticated users are automatically redirected to login
- Easily extensible to support Google or GitHub OAuth

### 🏢 Multi-Tenant Organization Management
- Users can create and belong to multiple organizations
- Each organization is fully isolated — data never leaks between tenants
- Admins can invite members by email
- Role-based access control — Admin and Member roles enforced across the app

### 💳 Stripe Billing and Subscriptions
- Free and Pro plan support out of the box
- Stripe Checkout integration — secure hosted payment page
- Subscription lifecycle management via Stripe Webhooks
- Billing is per organization, not per user — teams share one subscription
- Plan status syncs to the database automatically after payment

### 🤖 AI Business Intelligence Layer
- Churn Risk Scoring — analyzes plan age, member count, and engagement signals to flag at-risk organizations
- Upsell Detection — identifies organizations ready to upgrade based on growth signals
- Actionable Recommendations — surfaces specific next steps for each organization
- Designed to plug into any ML model or LLM API for enhanced predictions

---

## 🛠️ Tech Stack

### Framework and Language
![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### Styling and UI
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

### Database and ORM
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### Auth and Payments
![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

### Tools
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

---

## 🔮 Future Scope
🔄 Email notifications for member invites
🔄 Usage analytics dashboard with charts
🔄 Google and GitHub OAuth providers
🔄 Enterprise plan with custom limits
🔄 Deploy to production on Vercel
🔄 Admin super-dashboard across all orgs
🔄 Plug in LLM API for smarter AI insights

---

## ⚙️ How to Run This Project on Your PC

### 1. Clone the repository
```bash
git clone https://github.com/muditchauhan1409/saas-boilerplate.git
cd saas-boilerplate
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root folder and add:

```env
DATABASE_URL="your-supabase-postgresql-connection-string"
DIRECT_URL="your-supabase-direct-url"
NEXTAUTH_SECRET="any-random-secret-string"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_your-stripe-key"
STRIPE_PRO_PRICE_ID="price_your-stripe-price-id"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"
```

### 4. Run database migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're good to go 🚀

---

## 🌐 Built By

<div align="center">

**Mudit Chauhan**

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:muditc57@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/muditchauhan1409)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mudit-chauhan-atwork/)

<br/>

⭐ Star this repo if you find it useful — it helps a lot!

</div>
