# Sanderson's AI Assistant Backend

Backend API server powered by Claude (Anthropic) for the Sanderson's World Foods retail intranet assistant.

## Features
- Real Claude AI integration via Anthropic API
- RAG (Retrieval Augmented Generation) with knowledge base
- CORS enabled for local development
- Context-aware responses using Sanderson's company data

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure API Key
1. Get your Anthropic API key from: https://console.anthropic.com/
2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```
3. Edit `.env` and add your API key:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 3. Start the Server
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### POST `/api/chat`
Send a message to the AI assistant.

**Request:**
```json
{
  "message": "What are the store hours?",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "message": "Store hours for Sanderson's locations...",
  "success": true
}
```

### GET `/api/health`
Check if the server is running and API key is configured.

**Response:**
```json
{
  "status": "ok",
  "message": "Sanderson's AI Assistant Backend is running",
  "apiKeyConfigured": true
}
```

## Testing
Once the server is running, test it with:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the break policies?"}'
```

## Troubleshooting

### "API key not found" error
- Make sure you created the `.env` file in the `backend` folder
- Check that your API key starts with `sk-ant-`
- Restart the server after adding the API key

### CORS errors
- Make sure the frontend is accessing `http://localhost:3000`
- The server allows all origins in development mode

### Port already in use
- Change the PORT in `.env` file
- Or kill the process using port 3000

## Production Deployment
For production, consider:
- Using environment variables instead of `.env` file
- Adding rate limiting
- Implementing authentication
- Using a reverse proxy (nginx)
- Deploying to Vercel, Railway, or AWS
