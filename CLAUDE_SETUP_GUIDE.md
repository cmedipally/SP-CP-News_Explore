# 🤖 Claude-Powered Chat Setup Guide

Your Sanderson's AI Assistant is now ready to be powered by real Claude AI! Follow these steps to get it running.

## 🎯 What You're Building
A real AI assistant that:
- Uses Claude API (Anthropic) for intelligent conversations
- Retrieves company knowledge with RAG (Retrieval Augmented Generation)
- Maintains conversation context
- Runs locally on your machine

## 📋 Prerequisites
1. **Node.js** installed (v16 or higher)
   - Check: `node --version`
   - Download from: https://nodejs.org/

2. **Anthropic API Key** (free trial available)
   - Get yours at: https://console.anthropic.com/
   - You'll get free credits to start!

## 🚀 Setup Instructions (5 minutes)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Your API Key
1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open `.env` and add your API key:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

### Step 3: Start the Backend Server
```bash
npm start
```

You should see:
```
🚀 Sanderson's AI Assistant Backend running on http://localhost:3000
📡 API endpoint: http://localhost:3000/api/chat
🔑 API key configured: Yes ✅
```

### Step 4: Open the Frontend
1. Open `branded-agent-demo.html` in your browser
2. Click the chat button (green icon in bottom-right)
3. Start chatting!

## ✅ Testing Your Setup

### Test 1: Check Backend Health
Visit in browser: http://localhost:3000/api/health

Should see:
```json
{
  "status": "ok",
  "message": "Sanderson's AI Assistant Backend is running",
  "apiKeyConfigured": true
}
```

### Test 2: Try a Chat Message
In the chat interface, ask:
- "What are the store hours?"
- "Tell me about the benefits"
- "What's the dress code?"

You should get intelligent, context-aware responses from Claude!

## 🎨 Features You Now Have

### 1. **Real AI Intelligence**
- Natural language understanding
- Context-aware responses
- Conversational memory

### 2. **RAG Knowledge Base**
- Retrieves relevant company info
- Provides accurate, sourced answers
- Updates easily (just edit knowledgeBase in server.js)

### 3. **Conversation History**
- Remembers previous messages
- Maintains context across questions
- Natural back-and-forth dialogue

## 🔧 Configuration Options

### Switch to Mock Mode (No API needed)
In `branded-agent-demo.html`, change:
```javascript
const USE_LOCAL_BACKEND = false; // Switches to mock system
```

### Change Claude Model
In `backend/server.js`, line 198:
```javascript
model: 'claude-sonnet-4-20250514',  // Change to opus or haiku
```

### Adjust Response Length
In `backend/server.js`, line 199:
```javascript
max_tokens: 1024,  // Increase for longer responses
```

## 🐛 Troubleshooting

### Error: "Connection Error"
**Problem:** Frontend can't reach backend
**Solution:** Make sure backend is running on port 3000
```bash
cd backend
npm start
```

### Error: "API key not found"
**Problem:** Missing or incorrectAPIConfigure key
**Solution:**
1. Check `.env` file exists in `backend/` folder
2. Verify API key starts with `sk-ant-`
3. Restart the server

### Error: "CORS policy" in browser
**Problem:** Browser blocking request
**Solution:** Backend already handles CORS, but make sure you're accessing via `http://localhost` not `file://`

### Backend won't start - "Port already in use"
**Problem:** Another app is using port 3000
**Solution:** Kill the process or change port in `.env`:
```
PORT=3001
```

Then update frontend API_URL to match.

## 📈 Next Steps

### 1. **Add More Knowledge**
Edit `server.js` to add more company info:
```javascript
knowledgeBase: {
    // Add new categories here
    operations: {
        shipping: {
            keywords: ['ship', 'delivery', 'shipping'],
            content: { ... }
        }
    }
}
```

### 2. **Deploy to Production**
Options:
- **Vercel** (serverless): Deploy backend as API routes
- **Railway/Render**: Full backend hosting
- **AWS/Azure**: Enterprise deployment

### 3. **Add Authentication**
Secure your API with:
- API keys
- JWT tokens
- OAuth integration

### 4. **Connect Real Data**
- Database integration (MongoDB, PostgreSQL)
- SharePoint API
- Microsoft Graph
- HR systems

## 💡 Tips & Best Practices

1. **Keep API keys secret** - Never commit `.env` to git
2. **Monitor usage** - Check your Anthropic dashboard for API usage
3. **Test thoroughly** - Try edge cases and unusual questions
4. **Update knowledge** - Keep company info current in knowledge base
5. **Handle errors gracefully** - Always have fallback responses

## 🎉 You're All Set!

Your AI assistant is now running with real Claude intelligence. Try asking complex questions and watch it understand context and provide helpful answers!

**Questions?** Check the backend logs for debugging info.
**Issues?** Make sure Node.js and npm are up to date.

Happy building! 🚀
