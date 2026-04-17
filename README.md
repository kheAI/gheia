# Running the GaiaGrid App

To run this Next.js app locally, follow these steps:

## Prerequisites

- Node.js installed on your system

## Setup Instructions

1. **Install dependencies:** `npm install`
2. **Configure your Gemini API key:**
   - Create a `.env` file in the project root (copy from ``.env.example`)
   - Add your Gemini API key: `GEMINI_API_KEY="your_actual_gemini_api_key_here"`
3. **Start the development server:** `npm run dev`
4. **Open the app:**
   - Navigate to `http://localhost:3000` in your browser
   - The app should load with the GaiaGrid dashboard

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run clean` - Clean Next.js build cache

## Troubleshooting

- **Missing Gemini API key:** The app requires `GEMINI_API_KEY` in `.env` for the plant diagnostic feature to work
- **Port 3000 in use:** The dev server defaults to port 3000; you can specify a different port with `npm run dev -- -p 3001`

The app should now be running and ready to test the plant diagnosis, Solana feed, and node grid features!