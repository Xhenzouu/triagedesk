# Triagedesk - E-Commerce Order Triage Dashboard

A premium B2B dashboard that simulates the n8n Workflow 2 (Shopify Order Confirmation Pipeline). This app demonstrates how to handle webhook payloads, visualize HMAC verification, and preview automated HTML emails.

**Live Demo:** [triagedesk.lovable.app](https://triagedesk.lovable.app)

## Features
- **Order Triage Table:** Displays incoming webhook payloads with a clear view of HMAC validity and email dispatch status.
- **Order Drawer:** A slide-out panel that details the order items and the webhook audit metadata (Webhook ID, Shopify Note Status, Resend ID).
- **Mock Email Preview:** Simulates the exact HTML email built by the n8n Resend node, complete with a white background to mimic an actual inbox.
- **Top Navigation:** A clean, distraction-free layout that differs from standard sidebar dashboards.
- **Core UI Pattern:** Strict flat charcoal (#1A1918), solid accents, and no gradients.

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Run Locally
1. Clone the repo:
   ```bash
   git clone https://github.com/Xhenzouu/triagedesk.git
