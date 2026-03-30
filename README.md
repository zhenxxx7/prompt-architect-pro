# Prompt Architect Pro

A sleek web application that transforms raw ideas into expertly crafted AI prompts using the RCTCO framework.

## Features

- **Modern Dark UI**: Sleek Slate & Indigo color palette
- **RCTCO Framework**: Professional prompt optimization using Role-Context-Task-Constraint-Output
- **Real-time Optimization**: Transform simple ideas into structured prompts
- **Copy to Clipboard**: One-click copy with visual feedback
- **Responsive Design**: Optimized for mobile and desktop
- **Loading States**: Smooth animations and feedback

## Quick Start

```bash
npm install
npm run dev
```

## LLM API Integration

To integrate with a real LLM API (Gemini, OpenAI, etc.), edit `src/App.tsx` and replace the `generateOptimizedPrompt` function with your API call:

```typescript
const generateOptimizedPrompt = async (input: string): Promise<string> => {
  // Example with OpenAI
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{
        role: 'user',
        content: `Optimize this prompt using RCTCO framework: ${input}`
      }]
    })
  })
  const data = await response.json()
  return data.choices[0].message.content
}
```

Add your API key to `.env.local`:

```env
VITE_OPENAI_API_KEY=your-api-key-here
```

## RCTCO Framework

- **R**ole: Define the AI's persona and expertise
- **C**ontext: Provide necessary background information
- **T**ask: Clearly state what needs to be accomplished
- **C**onstraints: Specify any limitations or requirements
- **O**utput: Define the expected format and quality

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