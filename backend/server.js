// Sanderson's AI Assistant Backend
// Powered by Claude API with RAG knowledge base

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Knowledge base - same as frontend for context
const knowledgeBase = {
    policies: {
        pto: {
            keywords: ['pto', 'time off', 'vacation', 'leave', 'days off', 'holiday'],
            content: {
                title: "Time Off Policy",
                balance: "15 PTO days remaining for 2026",
                process: [
                    "Open the Scheduling Portal",
                    "Click 'Request Time Off'",
                    "Select your dates",
                    "Submit for Sarah's approval"
                ],
                tips: "Submit requests at least 2 weeks in advance for better approval chances!",
                links: ["→ Open Scheduling Portal"]
            }
        },
        benefits: {
            keywords: ['benefit', 'insurance', 'health', 'medical', 'dental', '401k', 'retirement'],
            content: {
                title: "Benefits Package",
                categories: {
                    "Health & Wellness": [
                        "Medical, Dental, Vision Insurance",
                        "Wellness Programs & Gym Discounts"
                    ],
                    "Financial": [
                        "401(k) with 4% company match",
                        "Life & Disability Insurance",
                        "Employee Discount: 20% on all products"
                    ],
                    "Time Off": [
                        "Paid Time Off (PTO)",
                        "Sick Leave",
                        "Paid Holidays"
                    ]
                },
                note: "Open enrollment is in November each year.",
                links: ["→ View Full Benefits Details"]
            }
        },
        dress_code: {
            keywords: ['dress code', 'uniform', 'what to wear', 'clothing', 'attire'],
            content: {
                title: "Dress Code Policy",
                guidelines: [
                    "Floor staff: Green Sanderson's polo + khaki pants/skirt",
                    "Management: Business casual (collared shirt, slacks)",
                    "Closed-toe shoes required (non-slip preferred)",
                    "Name badge must be visible at all times",
                    "Hair must be tied back for food handling areas"
                ],
                note: "Uniforms provided by company. See your manager for sizing.",
                links: ["→ View Full Dress Code Guide"]
            }
        },
        breaks: {
            keywords: ['break', 'lunch', 'rest', 'meal period'],
            content: {
                title: "Break Policy",
                rules: [
                    "4-6 hour shift: One 15-minute paid break",
                    "6+ hour shift: One 30-minute unpaid meal break + one 15-minute paid break",
                    "8+ hour shift: One 30-minute unpaid meal break + two 15-minute paid breaks"
                ],
                note: "Coordinate break times with your supervisor to ensure floor coverage.",
                links: ["→ View Break Schedule Guidelines"]
            }
        }
    },
    locations: {
        stores: {
            keywords: ['store', 'location', 'where', 'address', 'hours'],
            content: {
                title: "Store Locations",
                stores: [
                    {name: "Store 1: Downtown (Flagship)", hours: "6 AM - 11 PM", phone: "(555) 100-1000"},
                    {name: "Store 2: Riverside Plaza", hours: "7 AM - 10 PM", phone: "(555) 100-2000"},
                    {name: "Store 3: Northgate Center", hours: "6 AM - 11 PM", phone: "(555) 100-3000"},
                    {name: "Store 4: Valley Heights (New!)", hours: "7 AM - 10 PM", phone: "(555) 100-4000"}
                ],
                links: ["→ View Store Directory", "→ Get Directions"]
            }
        }
    },
    hr: {
        payroll: {
            keywords: ['payroll', 'salary', 'pay', 'paycheck', 'payment', 'direct deposit', 'stub'],
            content: {
                title: "Payroll Information",
                schedule: "Bi-weekly (every other Friday)",
                next_pay: "January 3, 2026",
                details: [
                    "Access pay stubs in the Payroll Portal",
                    "Direct deposit changes: Contact HR",
                    "Questions? Email: payroll@sandersons.com"
                ],
                links: ["→ Open Payroll Portal"]
            }
        },
        manager: {
            keywords: ['manager', 'sarah', 'supervisor', 'boss', '1:1', 'one on one'],
            content: {
                title: "Your Manager",
                name: "Sarah Chen",
                role: "Regional Store Manager",
                contact: {
                    email: "sarah.chen@sandersons.com",
                    office: "Store 1, 2nd Floor"
                },
                next_meeting: "January 31, 2026 at 2:00 PM",
                links: []
            }
        }
    },
    training: {
        courses: {
            keywords: ['training', 'learn', 'course', 'certification', 'education'],
            content: {
                title: "Training & Development",
                available: [
                    "📚 New Employee Orientation",
                    "📚 Customer Service Excellence",
                    "📚 Food Safety Certification",
                    "📚 Leadership Development",
                    "📚 Tech Skills Workshops"
                ],
                alert: "You have 2 required trainings due by Jan 15.",
                links: ["→ View Training Dashboard"]
            }
        }
    },
    products: {
        produce: {
            keywords: ['produce', 'fruit', 'vegetable', 'organic', 'fresh'],
            content: {
                title: "Produce Department",
                info: [
                    "Daily deliveries arrive at 5 AM",
                    "Organic section rotates seasonally",
                    "Check expiration dates during stocking",
                    "Remove damaged items immediately"
                ],
                contact: "Produce Manager: Mike Torres (ext. 2341)",
                links: ["→ Produce Handling Guide", "→ Seasonal Calendar"]
            }
        },
        inventory: {
            keywords: ['inventory', 'stock', 'count', 'reorder', 'out of stock'],
            content: {
                title: "Inventory Management",
                process: [
                    "Check stock levels daily via POS system",
                    "Reorder point triggers automatic notifications",
                    "Weekly physical counts required for high-value items",
                    "Use scanner app for real-time updates"
                ],
                links: ["→ Inventory System Login", "→ Reorder Procedures"]
            }
        }
    }
};

// RAG retrieval function
function retrieveKnowledge(query) {
    const queryLower = query.toLowerCase();
    const matches = [];

    for (const category in knowledgeBase) {
        for (const topic in knowledgeBase[category]) {
            const item = knowledgeBase[category][topic];

            let score = 0;
            item.keywords.forEach(keyword => {
                if (queryLower.includes(keyword)) {
                    score += keyword.length;
                }
            });

            if (score > 0) {
                matches.push({
                    category,
                    topic,
                    score,
                    content: item.content
                });
            }
        }
    }

    matches.sort((a, b) => b.score - a.score);
    return matches;
}

// Format knowledge as context for Claude
function formatContextForClaude(matches) {
    if (matches.length === 0) {
        return "No specific knowledge found in the database.";
    }

    let context = "Here is relevant information from Sanderson's knowledge base:\n\n";

    matches.slice(0, 3).forEach((match, i) => {
        context += `${i + 1}. ${match.content.title || match.topic}:\n`;
        context += JSON.stringify(match.content, null, 2) + "\n\n";
    });

    return context;
}

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Retrieve relevant knowledge (RAG)
        const retrievedKnowledge = retrieveKnowledge(message);
        const context = formatContextForClaude(retrievedKnowledge);

        // Build messages array for Claude
        const messages = [
            ...conversationHistory,
            { role: 'user', content: message }
        ];

        // Call Claude API
        const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1024,
            system: `You are Sanderson's AI Assistant, a helpful workplace companion for employees at Sanderson's World Foods (a supermarket chain).

Your role:
- Answer questions about company policies, benefits, store locations, training, and products
- Be friendly, professional, and concise
- Use the provided knowledge base context to give accurate information
- Format responses with HTML for display (use <br> for line breaks, <strong> for bold, <em> for italics)
- Keep responses under 300 words when possible
- If you don't know something, suggest helpful resources or who to contact

Knowledge Base Context:
${context}

Important:
- Always prioritize information from the knowledge base context above
- Employee's manager is Sarah Chen (sarah.chen@sandersons.com)
- Today's date is January 2, 2026`,
            messages: messages
        });

        const assistantMessage = response.content[0].text;

        res.json({
            message: assistantMessage,
            success: true
        });

    } catch (error) {
        console.error('Error calling Claude API:', error);
        res.status(500).json({
            error: 'Failed to get response from AI assistant',
            details: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Sanderson\'s AI Assistant Backend is running',
        apiKeyConfigured: !!process.env.ANTHROPIC_API_KEY
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Sanderson's AI Assistant Backend running on http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`🔑 API key configured: ${process.env.ANTHROPIC_API_KEY ? 'Yes ✅' : 'No ❌'}`);

    if (!process.env.ANTHROPIC_API_KEY) {
        console.log('\n⚠️  WARNING: ANTHROPIC_API_KEY not found!');
        console.log('   Please create a .env file with your API key:');
        console.log('   ANTHROPIC_API_KEY=your_key_here\n');
    }
});
