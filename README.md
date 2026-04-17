# 🌍 GheiaGrid

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.4-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Solana](https://img.shields.io/badge/Solana-Web3.js-14f195?logo=solana&logoColor=black)
![Gemini](https://img.shields.io/badge/Gemini-3.1_Pro-blue?logo=google)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-magenta?logo=framer)

**A decentralized, zero-trust bio-economic grid for urban farming.**

The GheiaGrid is an IoT-driven, AI-powered platform designed to securely ingest distributed urban farming node data, archive it immutably, and reward ecological action. This platform bridges the gap between biological systems, machine-to-machine agents, and the blockchain using enterprise-grade zero-trust principles.

---

## ⚡ Architecture & Tech Stack

This project features a highly decoupled, modern tech stack designed for security, scale, and interactivity:

*   **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS v4, and **Framer Motion** for a highly reactive, physics-based UI.
*   **Theme:** "Sleek Interface" (Cyberpunk-meets-nature aesthetic, Inter & JetBrains Mono typography).
*   **Identity & Access (Zero-Trust):** Secures the grid using **Auth0 Machine-to-Machine (M2M)** authentication. The backend dynamically downloads Auth0 JWKS to mathematically verify the RSA signature and enforce `write:sensor_data` scopes before dropping the payload.
*   **Data Lake (Snowflake):** Built to handle massive streams of continuous telemetry (moisture, ambient CO2, temperature) via the Snowflake SDK. Extracts raw device telemetry into flexible `VARIANT` columns without breaking database schemas.
*   **Data Provenance (Solana):** Integrates Solana `web3.js` to autonomously generate SHA-256 hashes of incoming data and authorize them to the Devnet ledger, providing mathematical proof against data tampering.
*   **AI Engine (Google Gemini):** Utilizes `@google/genai` (Gemini 3.1 Pro) for multimodal plant health diagnostics. Upload plant photos to autonomously identify chlorosis and nutrient deficiencies directly in the browser via streamed markdown parsing.

## 🚀 Key Features

*   **Real-time HUD Dashboard:** A tactical command center with animated entrances, live global ticking network stats, and dynamic progress bars.
*   **Live Sensor Feed:** The UI actively polls and syncs with local temporary memory—flashing the Data Lake Analytics UI and swapping active Urban Farm nodes dynamically when pinged.
*   **Automated Diagnostics:** Seamless integration with Google's state-of-the-art vision models to prescribe organic, urban-farming-compliant treatments.
*   **Immutable Ledger Recording:** Live feed of simulated Solana transactions securely logging data payload proofs.

## 🛠️ Getting Started

### Prerequisites

Ensure you have Node.js 20+ installed. You will also need active accounts and API configurations for:
*   Google Gemini API
*   Auth0 (M2M Application Setup & Tenant Domain)
*   Snowflake (Warehouse, Database `IOT_DB`, Schema `PUBLIC`)
*   Solana (Devnet configuration is mocked locally unless private keys are provided)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/kheai/gheia.git
    cd gheia
    ```

2.  **Install dependencies**
    ```bash
    # If on an older Mac, run: npm install --ignore-scripts
    npm install
    ```

3.  **Environment Variables**
    Copy `.env.example` to `.env` and populate your secrets:
    ```bash
    cp .env.example .env
    ```
    *Ensure `GEMINI_API_KEY`, `AUTH0_` keys, and `SNOWFLAKE_` credentials are set.*

## 🧪 Testing the Live Pipeline

We built a standalone edge-device simulator to prove the end-to-end Zero-Trust pipeline.

1. **Boot the Backend / UI**
   Open Terminal 1 and start the Next.js server:
   ```bash
   npm run dev
   ```

2. **Fire the Edge Sensor**
   Open Terminal 2 and trigger the backend M2M script:
   ```bash
   npm run mock-sensor
   ```

3. **Verify the Magic**
   *   **Terminal 2** requests a token from Auth0 and POSTs the encrypted payload.
   *   **Terminal 1** mathematically verifies the Token, pushes the `VARIANT` JSON to Snowflake, generates an SHA-256 hash, and mocks the Solana confirmation.
   *   **The Browser UI** (http://localhost:3000) actively detects the new payload, increments the Data Lake sync count with a glowing pulse, and updates the Node Grid with live simulated moisture data!

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
