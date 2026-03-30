# Prompt Architect Pro

A sleek web application that transforms raw ideas into expertly crafted AI prompts using **Meta-Prompt Engineer v2.0** - a dynamic, context-aware RCTCO framework.

## Features

- **Dynamic Role Assignment**: Automatically assigns expert roles based on topic (e.g., "Professional Chef" for cooking, "Senior Developer" for coding)
- **Context-Aware Intelligence**: Infers target audience, tone, and optimal output format
- **Creative Expansion**: Rewrites user input professionally, not just templated fill-in-the-blanks
- **8 Specialized Domains**: Software Development, Culinary Arts, Marketing Strategy, Creative Writing, Design, Business Strategy, Data Science, and General
- **Meta-Prompt Engineer**: Advanced prompt engineering with RCTCO framework
- **Modern Dark UI**: Sleek Slate & Indigo color palette
- **Copy to Clipboard**: One-click copy with visual feedback
- **Responsive Design**: Optimized for mobile and desktop

## Quick Start

```bash
npm install
npm run dev
```

## How It Works

Unlike basic prompt templates, Prompt Architect Pro uses intelligent analysis:

1. **Domain Detection**: Analyzes keywords to identify the topic area
2. **Role Assignment**: Assigns the most relevant expert role (not generic "AI Assistant")
3. **Task Expansion**: Rewrites the user's request professionally and in detail
4. **Audience Inference**: Determines the target audience automatically
5. **Tone Setting**: Sets the appropriate communication style
6. **Format Optimization**: Defines the best output structure for the domain

## LLM API Integration

To integrate with a real LLM API (Gemini, OpenAI, etc.), edit `src/App.tsx` and use the Meta-Prompt Engineer system prompt:

```typescript
const systemPrompt = `You are a Meta-Prompt Engineer. Your only job is to transform 
a simple user idea into a comprehensive, high-level professional prompt. You must 
decide the best Role, Context, and Constraints for that specific topic. If the user 
input is 'coffee landing page', you must expand it into a full marketing and design brief.`;

const response = await fetch('YOUR_API_ENDPOINT', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Transform this idea: ${input}` }
    ]
  })
});
const data = await response.json();
return data.choices[0].message.content;
```

Add your API key to `.env.local`:

```env
VITE_OPENAI_API_KEY=your-api-key-here
```

## RCTCO Framework

Extended RCTCO with intelligent enhancements:

- **R**ole: Context-appropriate expert persona
- **C**ontext: Domain-specific background and scope
- **T**ask: Professionally expanded and detailed
- **A**udience: Automatically inferred target users
- **T**one: Appropriate communication style
- **C**onstraints: Domain-specific guidelines
- **O**utput: Optimized format for the task type

## Supported Domains

- **Software Development**: Senior Software Architect
- **Culinary Arts**: Professional Executive Chef
- **Marketing Strategy**: Strategic Marketing Director
- **Creative Writing**: Professional Author
- **Design**: Senior UX/UI Designer
- **Business Strategy**: Senior Business Consultant
- **Data Science**: Principal Data Scientist
- **General**: Subject Matter Expert

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linting checks
```

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons
- @blinkdotnew/ui components