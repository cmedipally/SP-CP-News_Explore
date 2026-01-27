# 🚀 Quick Start: Enable LLM in 2 Minutes

## Step 1: Get OpenAI API Key (1 minute)

1. Visit: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-...`)

## Step 2: Configure Nova (30 seconds)

Open [prototype5_next_level.html](prototype5_next_level.html) and find line ~2200:

```javascript
const LLM_CONFIG = {
    provider: 'openai',
    apiKey: 'sk-YOUR-KEY-HERE', // ← Paste your key
    model: 'gpt-3.5-turbo', // Fast & cheap ($0.002 per conversation)
    endpoint: 'https://api.openai.com/v1/chat/completions',
    enabled: true // ← Change to true
};
```

## Step 3: Test (30 seconds)

1. Open the HTML file in browser
2. Ask: **"Tell me a joke about AI"**
3. Watch Nova respond intelligently! 🎉

---

## What You Get

### Without LLM (Still Amazing)
✅ 12 pre-scripted insight cards
✅ 5 smart contextual responses
✅ Multi-agent collaboration
✅ Predictive panel & thinking animations
✅ Complete conversation flows

### With LLM (Next Level)
✅ **Everything above PLUS...**
✅ Answers ANY custom question
✅ Maintains conversation context
✅ Adapts to user's style
✅ 85-95% confidence scores
✅ Proves it's real AI, not just scripted

---

## Cost

| Model | Speed | Quality | Per Conversation |
|-------|-------|---------|------------------|
| GPT-3.5 Turbo | ⚡⚡⚡ | ⭐⭐⭐ | $0.002 |
| GPT-4 | ⚡⚡ | ⭐⭐⭐⭐⭐ | $0.03 |

**Recommendation:** Start with GPT-3.5 Turbo for demos, upgrade later if needed.

**100 demo conversations = $0.20** 👍

---

## Test Questions

Try these to see the hybrid system in action:

| Question | Response Type |
|----------|---------------|
| "What should I focus on?" | Pre-scripted (instant) |
| "How much PTO do I have?" | Multi-agent HR (demo) |
| "What's the capital of France?" | LLM (intelligent) |
| "Tell me a joke" | LLM (custom) |

---

## Troubleshooting

**Console says "LLM is not enabled"**
→ Change `enabled: false` to `enabled: true`

**Error 401: Unauthorized**
→ Invalid API key. Check OpenAI dashboard.

**Error 429: Rate limit**
→ Wait 60 seconds or upgrade OpenAI plan.

---

## Full Documentation

See [LLM_SETUP_INSTRUCTIONS.md](LLM_SETUP_INSTRUCTIONS.md) for:
- Azure OpenAI setup
- Anthropic Claude setup
- Security best practices
- Production deployment guide
- Advanced features (streaming, memory)

---

**Ready to make Nova truly intelligent? Add your API key and watch the magic happen!** ✨
