Menu Management System

A full-stack menu management platform built with Next.js (App Router) and TypeScript, designed to support role-based access control and structured data workflows for managing restaurant menus.

Live Demo:
https://menu-system-nseeorwdc-ezzaldeens-projects-50597db9.vercel.app/

GitHub Repository:
https://github.com/Splendor-3zz/Menu-system

Overview

The system enables two user roles:

Admin

Create, update, and delete categories

Manage menu items

Upload item images

User

View available menu items

Browse by category

The application is structured with clear separation between authentication, authorization, data modeling, and UI layers.

Tech Stack
Frontend

React

Next.js (App Router)

TypeScript

HTML / CSS

Backend & Data

Prisma ORM

MongoDB

Next.js Route Handlers / Server Actions

Authentication & Security

Clerk Authentication

Middleware-based route protection

Role-Based Access Control (RBAC)

Server-side authorization enforcement

Infrastructure

Vercel (Deployment)

Cloudinary (Image upload & CDN delivery)

Architecture Highlights

Modular Component Design
UI is structured using reusable components with clear separation of concerns.

Role-Based Access Control
Admin-only operations are protected using Clerk authentication combined with server-side role validation.

Data Modeling with Prisma
Structured schema design supports scalable category and item relationships.

Secure CRUD Workflows
All mutations are validated and enforced server-side to prevent unauthorized access.

Cloud Image Handling
Image uploads are handled via Cloudinary to ensure optimized delivery through CDN.

Key Features

Admin dashboard for managing categories and items

Public menu browsing interface

Image upload and storage

Environment-based configuration

Production-ready deployment on Vercel

Local Development Setup
1. Clone Repository
git clone https://github.com/Splendor-3zz/Menu-system.git
cd Menu-system

2. Install Dependencies
npm install

3. Configure Environment Variables

Create a .env file in the root directory and configure:

DATABASE_URL=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

4. Run Development Server
npm run dev


The application will run on:

http://localhost:3000

Production Deployment

The application is deployed on Vercel with environment-based configuration.
Database connection and authentication keys are managed through environment variables.

Future Improvements

Pagination for large menus

Search and filtering functionality

Order management system

Performance optimizations (caching strategies)

Unit and integration testing

Author

Ezzaldeen Al-Shaibani
Frontend Engineer (React / Next.js / TypeScript)
Istanbul, Turkey

GitHub: https://github.com/Splendor-3zz

LinkedIn: https://www.linkedin.com/in/ezzaldeen-al-shaibani-560640372/
