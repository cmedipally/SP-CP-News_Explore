# Prototype 5 - Code Additions (Copy-Paste Ready)

Add these code blocks to `prototype4_agentic_future.html` to create Prototype 5.

---

## STEP 1: Add CSS (Insert after line 650, before `/* Context-Aware Banner */`)

```css
/* Predictive Panel */
.predictive-panel {
    position: fixed;
    top: 100px;
    right: 30px;
    width: 400px;
    background: var(--surface);
    border: 1px solid var(--primary);
    border-radius: 20px;
    padding: 28px;
    box-shadow: var(--glow-primary), 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2000;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100px) scale(0.9);
    }
    to {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
}

.predictive-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.predictive-icon {
    font-size: 28px;
    animation: rotate 3s linear infinite;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.predictive-label {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--primary);
}

.predictive-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
}

.predictive-subtitle {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 24px;
}

.predictive-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
}

.predictive-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 14px;
    padding: 12px;
    background: rgba(0, 102, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(0, 102, 255, 0.1);
}

.predictive-item-icon {
    font-size: 16px;
    margin-top: 2px;
}

.predictive-actions {
    display: flex;
    gap: 12px;
}

.predictive-btn {
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.3s;
    font-size: 14px;
    font-weight: 600;
}

.predictive-btn:hover {
    background: var(--surface-hover);
    transform: translateY(-2px);
}

.predictive-btn.primary {
    background: var(--primary);
    border-color: var(--primary);
    box-shadow: var(--glow-primary);
}

.predictive-btn.primary:hover {
    background: var(--secondary);
    box-shadow: var(--glow-secondary);
}

/* Agent Thinking Overlay */
.agent-thinking {
    position: absolute;
    top: -160px;
    left: 50%;
    transform: translateX(-50%);
    width: 280px;
    background: var(--surface);
    border: 1px solid var(--primary);
    border-radius: 16px;
    padding: 16px 20px;
    box-shadow: var(--glow-primary);
    animation: thoughtBubble 0.4s ease;
}

@keyframes thoughtBubble {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px) scale(0.8);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
    }
}

.agent-thinking::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid var(--primary);
}

.thinking-steps {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.thinking-step {
    font-size: 13px;
    color: var(--text-secondary);
    padding: 8px 12px;
    background: rgba(0, 102, 255, 0.05);
    border-radius: 8px;
    animation: fadeInStep 0.5s ease;
    position: relative;
    padding-left: 32px;
}

.thinking-step::before {
    content: '⚡';
    position: absolute;
    left: 10px;
    animation: pulse 1s infinite;
}

@keyframes fadeInStep {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.thinking-step.complete {
    color: var(--success);
    background: rgba(0, 217, 163, 0.05);
}

.thinking-step.complete::before {
    content: '✓';
    color: var(--success);
    animation: none;
}

/* Multi-Agent Collaboration */
.agent-collab-container {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    align-items: flex-end;
}

.collab-agent {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    animation: agentJoin 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes agentJoin {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.8);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.collab-avatar {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border: 2px solid var(--border);
}

.collab-avatar.nova {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
}

.collab-avatar.finance {
    background: linear-gradient(135deg, #FFB800, #FF8C00);
}

.collab-avatar.hr {
    background: linear-gradient(135deg, var(--success), #00B894);
}

.collab-avatar.it {
    background: linear-gradient(135deg, var(--secondary), #6C5CE7);
}

.collab-name {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-tertiary);
}

.collab-message {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px 20px;
    margin-bottom: 12px;
    position: relative;
}

.collab-message.finance {
    border-color: rgba(255, 184, 0, 0.3);
    background: rgba(255, 184, 0, 0.05);
}

.collab-message.hr {
    border-color: rgba(0, 217, 163, 0.3);
    background: rgba(0, 217, 163, 0.05);
}

.collab-message.it {
    border-color: rgba(123, 97, 255, 0.3);
    background: rgba(123, 97, 255, 0.05);
}

.collab-message-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 600;
}

.collab-message-header .agent-icon {
    font-size: 16px;
}

/* Confidence Indicator */
.confidence-indicator {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 12px;
    padding: 10px 14px;
    background: rgba(0, 102, 255, 0.05);
    border-radius: 10px;
    border: 1px solid rgba(0, 102, 255, 0.1);
}

.confidence-bar {
    flex: 1;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
}

.confidence-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary), var(--success));
    border-radius: 3px;
    transition: width 1s ease;
}

.confidence-text {
    font-size: 12px;
    font-weight: 600;
    color: var(--primary);
    white-space: nowrap;
}

.confidence-detail {
    font-size: 11px;
    color: var(--text-tertiary);
    cursor: pointer;
    text-decoration: underline;
}

.confidence-detail:hover {
    color: var(--primary);
}
```

---

## STEP 2: Add JavaScript Functions (Insert before `// Initialize` at line 1058)

```javascript
// ========== PREDICTIVE PANEL ==========
function showPredictivePanel() {
    const panel = document.createElement('div');
    panel.className = 'predictive-panel';
    panel.id = 'predictivePanel';
    panel.innerHTML = `
        <div class="predictive-header">
            <div class="predictive-icon">🔮</div>
            <div>
                <div class="predictive-label">Nova Prepared This</div>
            </div>
        </div>
        <div class="predictive-title">Q2 Planning Meeting in 30 min</div>
        <div class="predictive-subtitle">I've prepared everything you'll need</div>
        <div class="predictive-items">
            <div class="predictive-item">
                <div class="predictive-item-icon">✓</div>
                <div>Budget analysis with Q1 comparison ready</div>
            </div>
            <div class="predictive-item">
                <div class="predictive-item-icon">✓</div>
                <div>Team OKR summary and progress metrics</div>
            </div>
            <div class="predictive-item">
                <div class="predictive-item-icon">✓</div>
                <div>3 discussion topics based on email threads</div>
            </div>
        </div>
        <div class="predictive-actions">
            <button class="predictive-btn" onclick="dismissPrediction()">Dismiss</button>
            <button class="predictive-btn primary" onclick="reviewPrediction()">Review Now</button>
        </div>
    `;
    document.body.appendChild(panel);

    // Auto-dismiss after 30 seconds
    setTimeout(() => {
        const existingPanel = document.getElementById('predictivePanel');
        if (existingPanel) {
            existingPanel.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => existingPanel.remove(), 500);
        }
    }, 30000);
}

function dismissPrediction() {
    const panel = document.getElementById('predictivePanel');
    if (panel) {
        panel.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => panel.remove(), 500);
    }
}

function reviewPrediction() {
    dismissPrediction();
    hideEmptyState();

    // Show agent thinking
    showAgentThinking([
        'Gathering meeting context...',
        'Analyzing budget data...',
        'Reviewing team metrics...',
        'Preparing recommendations...'
    ]);

    setTimeout(() => {
        addAIMessage("Perfect timing! Let me brief you on your Q2 Planning meeting. I've been tracking the key data points you'll need.", false);

        setTimeout(() => {
            addAIMessage("Your team is performing 12% above target, and I've identified 3 strategic investment areas to discuss. Would you like me to walk through them now?", 92);
        }, 1500);
    }, 3200);
}

// ========== AGENT THINKING ==========
function showAgentThinking(steps) {
    const agentHeader = document.querySelector('.agent-header');
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'agent-thinking';
    thinkingDiv.id = 'agentThinking';
    thinkingDiv.innerHTML = '<div class="thinking-steps"></div>';

    agentHeader.style.position = 'relative';
    agentHeader.appendChild(thinkingDiv);

    const stepsContainer = thinkingDiv.querySelector('.thinking-steps');

    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'thinking-step';
            stepDiv.textContent = step;
            stepsContainer.appendChild(stepDiv);

            // Mark previous step as complete
            if (index > 0) {
                stepsContainer.children[index - 1].classList.add('complete');
            }

            // Remove thinking overlay after last step
            if (index === steps.length - 1) {
                setTimeout(() => {
                    stepDiv.classList.add('complete');
                    setTimeout(() => {
                        thinkingDiv.style.animation = 'fadeOut 0.3s ease';
                        setTimeout(() => thinkingDiv.remove(), 300);
                    }, 800);
                }, 500);
            }
        }, index * 700);
    });
}

// ========== MULTI-AGENT COLLABORATION ==========
const agents = {
    nova: {
        name: 'Nova',
        avatar: '🤖',
        color: 'nova'
    },
    finance: {
        name: 'Finance Agent',
        avatar: '💰',
        color: 'finance'
    },
    hr: {
        name: 'HR Agent',
        avatar: '🎯',
        color: 'hr'
    },
    it: {
        name: 'IT Agent',
        avatar: '⚙️',
        color: 'it'
    }
};

function inviteAgent(agentKey, context) {
    const agent = agents[agentKey];
    hideEmptyState();

    // Nova announces bringing in specialist
    addAIMessage(`This requires ${agentKey} expertise. Let me bring in ${agent.name} to help...`, false);

    // Show agent thinking while fetching specialist
    setTimeout(() => {
        showAgentThinking([
            `Connecting to ${agent.name}...`,
            'Sharing context...',
            'Preparing analysis...'
        ]);
    }, 500);

    // Show collaboration
    setTimeout(() => {
        showCollaboration(agentKey, context);
    }, 3500);
}

function showCollaboration(agentKey, context) {
    const agent = agents[agentKey];
    const conversation = document.getElementById('conversation');

    // Show both agents
    const collabDiv = document.createElement('div');
    collabDiv.className = 'message-group';
    collabDiv.innerHTML = `
        <div class="agent-collab-container">
            <div class="collab-agent">
                <div class="collab-avatar nova">🤖</div>
                <div class="collab-name">Nova</div>
            </div>
            <div class="collab-agent">
                <div class="collab-avatar ${agent.color}">${agent.avatar}</div>
                <div class="collab-name">${agent.name}</div>
            </div>
        </div>
    `;
    conversation.appendChild(collabDiv);

    // Specialist responds
    setTimeout(() => {
        const response = getAgentResponse(agentKey, context);
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-group';
        messageDiv.innerHTML = `
            <div class="collab-message ${agent.color}">
                <div class="collab-message-header">
                    <span class="agent-icon">${agent.avatar}</span>
                    <span>${agent.name}</span>
                </div>
                <div>${response}</div>
            </div>
        `;
        conversation.appendChild(messageDiv);
        conversation.scrollTop = conversation.scrollHeight;

        // Nova synthesizes
        setTimeout(() => {
            addAIMessage(`Based on ${agent.name}'s analysis, here's my recommendation...`, 89);
        }, 2000);
    }, 1000);
}

function getAgentResponse(agentKey, context) {
    const responses = {
        finance: "I've analyzed your Q2 budget vs forecast. You're currently 12% under budget with strong ROI on recent investments. I recommend approving the additional $50K for engineering hiring—it aligns with your revenue projections.",
        hr: "I've reviewed your PTO balance and team coverage. You have 15 days available, and your team has good coverage next week. I recommend taking Wednesday-Friday off—it won't impact any critical deadlines.",
        it: "I've checked your access permissions and system logs. The issue is a recent security policy update. I can restore your access immediately and add an exception for your role."
    };
    return responses[agentKey] || "I've analyzed the situation and have recommendations ready.";
}

function detectNeededAgents(question) {
    const lowerQ = question.toLowerCase();

    if (lowerQ.includes('budget') || lowerQ.includes('approve') || lowerQ.includes('$') || lowerQ.includes('cost')) {
        return 'finance';
    }
    if (lowerQ.includes('pto') || lowerQ.includes('vacation') || lowerQ.includes('time off') || lowerQ.includes('benefits')) {
        return 'hr';
    }
    if (lowerQ.includes('access') || lowerQ.includes('password') || lowerQ.includes('laptop') || lowerQ.includes('technical')) {
        return 'it';
    }

    return null;
}

// ========== CONFIDENCE SCORES ==========
function addAIMessage(text, confidence = null) {
    hideEmptyState();
    const conversation = document.getElementById('conversation');

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-group';

    let confidenceHTML = '';
    if (confidence) {
        confidenceHTML = `
            <div class="confidence-indicator">
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${confidence}%"></div>
                </div>
                <span class="confidence-text">${confidence}% confident</span>
                <span class="confidence-detail" onclick="explainConfidence(${confidence})">Why?</span>
            </div>
        `;
    }

    messageDiv.innerHTML = `
        <div class="message">
            <div class="message-avatar">🤖</div>
            <div class="message-bubble">${text}</div>
        </div>
        ${confidenceHTML}
    `;

    conversation.appendChild(messageDiv);
    conversation.scrollTop = conversation.scrollHeight;
}

function explainConfidence(score) {
    addAIMessage(`My ${score}% confidence is based on analyzing 47 similar scenarios in your organization's history. The ${100 - score}% uncertainty comes from external market factors I can't fully predict. Would you like to see the risk analysis?`, false);
}

// Update sendMessage to detect multi-agent needs
const originalSendMessage = sendMessage;
function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();

    if (text) {
        addUserMessage(text);
        input.value = '';
        input.style.height = 'auto';

        // Check if we need specialist agent
        const neededAgent = detectNeededAgents(text);

        if (neededAgent) {
            setTimeout(() => {
                inviteAgent(neededAgent, text);
            }, 800);
        } else {
            // Normal AI response
            setTimeout(() => {
                const responses = [
                    "I understand what you're looking for. Let me analyze this and provide you with personalized recommendations...",
                    "That's a great question! Based on your work patterns and recent activities, here's what I found...",
                    "I've been tracking this for you. Here are the key insights that might help...",
                    "Interesting! I notice this connects to something we discussed earlier. Let me help you connect the dots..."
                ];
                addAIMessage(responses[Math.floor(Math.random() * responses.length)], Math.floor(Math.random() * 15) + 80);
            }, 800);
        }
    }
}
```

---

## STEP 3: Update Timing (Replace the existing proactive AI demonstration around line 1054)

```javascript
// Proactive AI demonstration - Updated
setTimeout(() => {
    addAIMessage("I noticed you're viewing your personalized feed. I've curated 12 items mixing AI insights and company news—each analyzed for relevance to your role and projects.", true);
}, 3000);

// Show predictive panel after 10 seconds
setTimeout(() => {
    showPredictivePanel();
}, 10000);
```

---

## STEP 4: Add Animation for fadeOut (in CSS animations section)

```css
@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100px);
    }
}
```

---

## Testing Your Prototype 5

1. **Predictive Panel**: Should appear 10 seconds after page load
2. **Agent Thinking**: Click "Review Now" to see thinking animation
3. **Multi-Agent**: Ask "Should I approve this budget?" to see Finance Agent join
4. **Confidence**: Look for "92% confident" with "Why?" link

---

## Quick Test Prompts

Try these in the chat:
- "Should I approve this $50K budget increase?" → Brings in Finance Agent
- "Can I take PTO next week?" → Brings in HR Agent
- "I can't access the server" → Brings in IT Agent

---

Save this file and follow the steps to upgrade prototype 4 to prototype 5!
