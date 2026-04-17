# 🌍 The GheiaGrid

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.4-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Solana](https://img.shields.io/badge/Solana-Web3.js-14f195?logo=solana&logoColor=black)
![Gemini](https://img.shields.io/badge/Gemini-3.1_Pro-blue?logo=google)

**A decentralized, autonomous bio-economic grid for urban farming.**

The GheiaGrid is an IoT-driven, AI-powered platform designed to optimize distributed urban farming nodes, sequester carbon, and reward ecological action through automated Web3 micro-transactions. This platform bridges the gap between biological systems, machine-to-machine agents, and the blockchain.

## ⚡ Architecture & Tech Stack

This project was accelerated using **GitHub Copilot** to rapidly scaffold the Next.js App Router structure, enabling a highly modular and decoupled architecture to be brought to life seamlessly.

*   **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS v4, shadcn/ui.
*   **Theme:** "Sleek Interface" (Cyberpunk-meets-nature aesthetic, Inter & JetBrains Mono typography).
*   **AI Engine (Google Gemini):** Utilizes `@google/genai` (Gemini 3.1 Flash Lite Preview) for multimodal plant health diagnostics. Upload telemetry and photos of leaves to autonomously identify chlorosis and nutrient deficiencies.
*   **Data Lake (Snowflake):** Built to handle massive streams of continuous telemetry (moisture, ambient CO2, temperature) from distributed IoT sensors via the Snowflake Node.js driver.
*   **Identity & Access (Auth0 for Agents):** Secures the grid using Auth0's Machine-to-Machine (M2M) authentication, ensuring only verified IoT edge devices can publish telemetry and trigger state changes.
*   **Admin & Routing (Backboard):** Employs Backboard for dynamic external admin UI routing and complex agent management, securely orchestrating the sensor armada.
*   **Crypto Rewards (Solana):** Integrates Solana `web3.js` to autonomously mint **LeafTokens (LF)** on the Devnet whenever a node successfully hits verified carbon sequestration milestones (1 LF = 1kg CO₂e).

## 🚀 Key Features

*   **Real-time HUD Dashboard:** A tactical command center visualizing network health, live data lake analytics, and active farming nodes.
*   **Automated Diagnostics:** Seamless integration with Google's state-of-the-art vision models to prescribe organic, urban-farming-compliant treatments.
*   **Autonomous Ledger Recording:** Live feed of Solana transactions logging ecological milestones transparently on-chain.
*   **Zero-Trust Sensor Network:** Every data point is securely authenticated and validated via Auth0 before resting in the Snowflake data warehouse.

## 🛠️ Getting Started

### Prerequisites

Ensure you have Node.js 20+ installed. You will also need active accounts and API keys/configurations for:
*   Google Gemini API
*   Auth0 (M2M Application Setup)
*   Snowflake (Warehouse, Database, Schema configurations)
*   Solana CLI (for Devnet testing)
*   Backboard (for admin orchestration)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/kheai/gheia.git
    cd gheia
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Copy `.env.example` to `.env` or `.env.local` and populate your secrets:
    ```bash
    cp .env.example .env
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the HUD.

## 📁 Project Structure

*   `/app`: Next.js App Router pages (Dashboard UI), Global CSS, and Layout.
*   `/components/dashboard`: HUD elements (`NodeGrid`, `DiagnosePlant`, `SolanaFeed`).
*   `/services`: Isolated system logic handling integrations:
    *   `auth0-agent.ts`: M2M authentication pipelines.
    *   `gemini.ts`: Multimodal AI image processing and prompt engineering.
    *   `snowflake.ts`: Secure data lake ingestion.
    *   `solana.ts`: Devnet token minting and ledger transactions.
*   `/lib/utils.ts`: Tailwind CSS class merging and utility functions.

## 🤝 Contribution & Agents

Autonomous agents and human contributors are welcome! Standard PR processes apply. If your agent is submitting a PR, ensure its Auth0 M2M token is included in the PR metadata for automated security clearance via Backboard.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
