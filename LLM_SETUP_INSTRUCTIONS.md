# Nova LLM Integration Setup Guide

## Overview

Your prototype now has **Hybrid LLM Integration** that combines the best of both worlds:
- ✅ Pre-scripted responses for reliable demo flow (12 insight cards + 5 smart responses)
- ✅ LLM fallback for custom/off-script questions (proves it's real AI)
- ✅ Graceful degradation if API fails

## Quick Start (3 Options)

### Option 1: OpenAI API (Recommended)

**Step 1: Get API Key**
1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)

**Step 2: Configure in prototype5_next_level.html**

Find this section (around line 2200):
```javascript
const LLM_CONFIG = {
    provider: 'openai',
    apiKey: 'YOUR_API_KEY_HERE', // ← Paste your key here
    model: 'gpt-4', // or 'gpt-3.5-turbo' for faster/cheaper
    endpoint: 'https://api.openai.com/v1/chat/completions',
    enabled: true // ← Change to true
};
```

**Step 3: Test**
- Open the HTML file in browser
- Ask a custom question like: "What's the weather like?"
- Nova should respond intelligently using GPT-4

**Cost:** ~$0.03 per conversation (GPT-4) or ~$0.002 (GPT-3.5 Turbo)

---

### Option 2: Azure OpenAI (Enterprise)

**Step 1: Set up Azure OpenAI**
1. Go to Azure Portal → Create Azure OpenAI resource
2. Deploy a model (gpt-4 or gpt-35-turbo)
3. Get your endpoint and API key from "Keys and Endpoint"

**Step 2: Configure**
```javascript
const LLM_CONFIG = {
    provider: 'azure',
    apiKey: 'YOUR_AZURE_KEY',
    model: 'gpt-4', // Must match your deployment name
    endpoint: 'https://YOUR-RESOURCE.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT/chat/completions?api-version=2024-02-15-preview',
    enabled: true
};
```

**Step 3: Update callLLM function**

Change the Authorization header to:
```javascript
'api-key': `${LLM_CONFIG.apiKey}` // Azure uses 'api-key' instead of 'Bearer'
```

---

### Option 3: Anthropic Claude (Alternative)

**Step 1: Get API Key**
1. Go to https://console.anthropic.com/
2. Create account and get API key

**Step 2: Configure**
```javascript
const LLM_CONFIG = {
    provider: 'anthropic',
    apiKey: 'YOUR_ANTHROPIC_KEY',
    model: 'claude-3-sonnet-20240229',
    endpoint: 'https://api.anthropic.com/v1/messages',
    enabled: true
};
```

**Step 3: Update callLLM function** (around line 2250)

Replace the fetch call with Anthropic format:
```javascript
const response = await fetch(LLM_CONFIG.endpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': LLM_CONFIG.apiKey,
        'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
        model: LLM_CONFIG.model,
        max_tokens: 500,
        messages: messages.slice(1) // Remove system message
    })
});

const data = await response.json();
const aiResponse = data.content[0].text;
```

---

## How It Works: Hybrid Approach

When a user asks a question, Nova follows this priority:

```
User Question
    ↓
1. Check pre-scripted responses
   (focus, priorities, meetings, networking, etc.)
    ↓ Not Found
2. Check multi-agent triggers
   (budget, PTO, IT access, etc.)
    ↓ Not Found
3. Call LLM API
   (custom questions with full context)
    ↓ If Fails
4. Generic fallback responses
   (always works, no API needed)
```

**Example Flows:**

| User Question | Response Type | Why |
|---------------|---------------|-----|
| "What should I focus on?" | Pre-scripted | Reliable demo flow |
| "How much PTO do I have?" | Multi-agent (HR) | Specialized expertise |
| "What's for lunch today?" | LLM | Off-script custom query |
| (LLM fails) | Generic fallback | Graceful degradation |

---

## Testing Your Setup

### Test 1: Pre-scripted (Should Always Work)
- Ask: "What are my priorities today?"
- Expected: Detailed 3-priority list with specific recommendations
- Source: Pre-scripted response

### Test 2: Multi-Agent (Should Always Work)
- Ask: "How much budget do I have left?"
- Expected: Finance Agent collaboration with budget details
- Source: Pre-scripted multi-agent

### Test 3: LLM Fallback (Requires API Key)
- Ask: "Tell me a joke about programming"
- Expected: Custom LLM-generated response with 85-95% confidence
- Source: LLM API

### Test 4: Graceful Degradation (Works Without API)
- Set `enabled: false`
- Ask: "Tell me a joke"
- Expected: Generic response like "I understand what you're looking for..."
- Source: Fallback response

---

## Customizing Nova's Personality

Edit the `NOVA_SYSTEM_PROMPT` (around line 2210) to change Nova's behavior:

```javascript
const NOVA_SYSTEM_PROMPT = `You are Nova...

**Your Personality:**
- Proactive and insightful, but never pushy
- Professional yet warm and conversational
- [ADD YOUR CUSTOM TRAITS HERE]

**Your Capabilities:**
- [LIST WHAT YOU WANT NOVA TO DO]

**Current User Context:**
- Name: [USER NAME]
- Role: [USER ROLE]
- [ADD MORE CONTEXT]
`;
```

**Tips:**
- Keep it concise (current prompt is ~350 words)
- Include specific examples of desired behavior
- Add user context for personalization
- Define response format (length, tone, structure)

---

## Security Considerations

### ⚠️ API Key Safety

**DO NOT:**
- Commit API keys to Git/GitHub
- Share files with embedded keys
- Use production keys for demos

**DO:**
- Use environment variables for production
- Implement backend proxy for real deployments
- Rotate keys regularly
- Set usage limits in OpenAI dashboard

### Production Architecture

For real deployment, move API calls to backend:

```
[Browser] → [Your Backend] → [OpenAI API]
           ↑
    Handles auth, rate limiting, key management
```

Example backend setup (Node.js):
```javascript
// server.js
app.post('/api/chat', async (req, res) => {
    // Verify user authentication
    const apiKey = process.env.OPENAI_API_KEY; // Secure!

    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: req.body.messages
    });

    res.json(response);
});
```

---

## Troubleshooting

### "LLM is not enabled" in console
- Check: `enabled: true` in LLM_CONFIG
- Check: API key is set (not 'YOUR_API_KEY_HERE')

### "LLM API error: 401"
- Invalid API key
- Check OpenAI dashboard for key status

### "LLM API error: 429"
- Rate limit exceeded
- Wait a few minutes or upgrade plan

### "Response is too slow"
- Switch from gpt-4 to gpt-3.5-turbo (faster)
- Reduce max_tokens (currently 500)
- Enable streaming for perceived speed

### "Responses aren't personalized"
- Edit NOVA_SYSTEM_PROMPT with more user context
- Increase temperature (currently 0.7)
- Add more conversation history (currently 6 messages)

---

## Advanced Features

### Enable Streaming (Real-time responses)

Update callLLM function:
```javascript
body: JSON.stringify({
    model: LLM_CONFIG.model,
    messages: messages,
    temperature: 0.7,
    max_tokens: 500,
    stream: true // ← Enable streaming
})
```

Then process the stream:
```javascript
const reader = response.body.getReader();
const decoder = new TextDecoder();
let fullResponse = '';

while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(line => line.trim());

    for (const line of lines) {
        if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            const parsed = JSON.parse(data);
            const content = parsed.choices[0].delta.content;
            if (content) {
                fullResponse += content;
                // Update UI in real-time here
            }
        }
    }
}
```

### Add Conversation Memory

Already implemented! Nova remembers last 6 messages (3 exchanges):
```javascript
let conversationHistory = []; // Maintains context
```

To increase memory, change this line:
```javascript
if (conversationHistory.length > 12) { // ← Was 6
    conversationHistory = conversationHistory.slice(-12);
}
```

### Multi-Turn Follow-ups

Already supported via conversation history. Example:
```
User: "What are my priorities?"
Nova: [Lists 3 priorities]
User: "Tell me more about the first one"  ← Context remembered!
Nova: [Provides details on priority #1]
```

---

## Cost Estimation

### OpenAI Pricing (as of Jan 2025)

| Model | Input | Output | Per Conversation |
|-------|--------|--------|------------------|
| GPT-4 | $30/1M tokens | $60/1M tokens | ~$0.03 |
| GPT-3.5 Turbo | $0.50/1M tokens | $1.50/1M tokens | ~$0.002 |

**Average conversation:**
- System prompt: ~400 tokens
- User message: ~50 tokens
- Nova response: ~200 tokens
- Total: ~650 tokens per exchange

**Monthly estimates:**
- 100 conversations: $3 (GPT-4) or $0.20 (GPT-3.5)
- 1,000 conversations: $30 (GPT-4) or $2 (GPT-3.5)
- 10,000 conversations: $300 (GPT-4) or $20 (GPT-3.5)

**Tip:** Start with GPT-3.5 Turbo for demos, upgrade to GPT-4 for quality.

---

## Next Steps

1. ✅ **Set up your API key** (5 minutes)
2. ✅ **Test all 4 response types** (5 minutes)
3. ✅ **Customize Nova's personality** (10 minutes)
4. ✅ **Demo to stakeholders** (show both scripted and LLM responses)
5. ⏭️ **Plan production deployment** (backend proxy, authentication)

---

## Questions?

**Need help with:**
- API setup issues?
- Custom response formatting?
- Production deployment architecture?
- Cost optimization strategies?

Let me know what you need!

---

## Summary: What Changed

### Files Modified
- ✅ `prototype5_next_level.html` - Added LLM integration (lines 2194-2350)

### New Features
- ✅ Hybrid LLM approach (pre-scripted → multi-agent → LLM → fallback)
- ✅ OpenAI/Azure/Anthropic support
- ✅ Conversation history (6 messages)
- ✅ Enhanced thinking animations for LLM calls
- ✅ Confidence scoring (85-95% for LLM)
- ✅ Error handling and graceful degradation

### Still Works Without LLM
- ✅ All 12 insight cards with detailed responses
- ✅ 5 smart contextual responses (focus, meetings, etc.)
- ✅ Multi-agent collaboration (Finance, HR, IT)
- ✅ Predictive panel, confidence scores, thinking animations
- ✅ Complete conversation flows with follow-ups

**The demo still works perfectly without an API key. LLM just adds intelligence for custom questions!**
