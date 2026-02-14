# Menu Management System

A role-based menu management platform built with **Next.js (App Router)** and **TypeScript**.  
Administrators manage categories and menu items, while users can browse menus in a structured interface.

---

## Live Demo
https://menu-system-nseeorwdc-ezzaldeens-projects-50597db9.vercel.app/

## GitHub Repository
https://github.com/Splendor-3zz/Menu-system

---

## Features

**Admin**
- Secure authentication using Clerk
- Middleware-protected dashboard routes
- Create, update, and delete categories
- Create, update, and delete menu items
- Image upload via Cloudinary
- Server-side role-based authorization enforcement

**User**
- Browse menu items
- View items grouped by category
- Responsive interface

---

## Tech Stack

**Frontend**
- React
- Next.js (App Router)
- TypeScript
- HTML / CSS

**Backend & Data**
- Prisma ORM
- MongoDB
- Next.js Route Handlers / Server Actions

**Authentication & Security**
- Clerk Authentication
- Middleware-based route protection
- Role-Based Access Control (RBAC)
- Server-side authorization validation

**Infrastructure**
- Vercel (Deployment)
- Cloudinary (Image storage + CDN)

---

## Local Setup

```bash
git clone https://github.com/Splendor-3zz/Menu-system.git
cd Menu-system
npm install
