# Prompt Architect Pro - Technical Specification

## Overview
Prompt Architect Pro is a sleek web application that transforms raw ideas into expertly crafted AI prompts using **Meta-Prompt Engineer v2.0** - a dynamic, context-aware RCTCO framework powered by **Google Gemini AI**.

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **UI Components**: @blinkdotnew/ui
- **AI Integration**: @blinkdotnew/sdk with Google Gemini
- **State Management**: React useState hooks
- **Access**: Public (no authentication required)

## Design System

### Color Palette (Slate & Indigo Dark Theme)
- **Background**: Deep slate (#0B0F19)
- **Foreground**: Off-white (#F1F5F9)
- **Primary**: Indigo (#818CF8)
- **Secondary**: Slate (#1E293B)
- **Accent**: Indigo (#818CF8)
- **Border**: Slate border (#334155)
- **Muted**: Muted slate (#94A3B8)

### Typography
- **Font Family**: DM Sans (sans-serif)
- **Heading**: Bold (700), 48px - 24px
- **Body**: Regular (400), 16px
- **Mono**: IBM Plex Mono (for code blocks)

### Spacing & Layout
- **Max Width**: 5xl (1024px)
- **Padding**: 6 (24px) horizontal, 8 (32px) vertical
- **Border Radius**: 0.75rem (12px)
- **Gap**: 6 (24px) between sections

## Features

### 1. Header Component
- **Logo**: Sparkles icon with gradient background (primary to accent)
- **Title**: "Prompt Architect" (text-3xl, bold, tracking-tight)
- **Tagline**: "Transform raw ideas into high-performance AI instructions"
- **Style**: Sticky top, backdrop-blur, border-bottom

### 2. Input Section
- **Label**: "Raw Prompt" with Clear button
- **Textarea**:
  - Height: 48 (192px)
  - Placeholder: "Paste your raw prompt here... (e.g., 'write a diet plan')"
  - Border: 1px solid border color
  - Focus: Ring-2 with primary color
  - Resize: None

### 3. Optimize Button
- **Icon**: Sparkles (left)
- **States**:
  - Default: Primary background, shadow
  - Hover: Scale-105, scale-95 on active
  - Disabled: Muted background, cursor-not-allowed
  - Loading: Loader2 icon with spin animation, text "Optimizing..."
- **Size**: px-8 py-4 (32px x 16px), text-lg

### 4. Output Section
- **Label**: "Optimized Prompt" with Copy button
- **Code Block**:
  - Preformatted text (whitespace-pre-wrap)
  - Monospace font
  - Background: Card color
  - Border: 1px solid border color
  - Padding: 6 (24px)
  - Shadow: Large shadow
- **Gradient Overlay**: Subtle primary gradient for depth
- **Badge**: "Powered by RCTCO Framework"

### 5. Copy Button
- **Icon**: Copy or Check (when copied)
- **Text**: "Copy to Clipboard" or "Copied!"
- **Feedback**: 2-second timeout before reverting

### 6. RCTCO Framework Info Section
- **Layout**: Grid (1 col mobile, 2 cols desktop)
- **Sections**:
  - Role (R): Define AI persona
  - Context (C): Provide background
  - Task (T): State objective
  - Constraints (C): Specify limitations
  - Output (O): Define format
- **Styling**: Secondary background, border, padded

### 7. Footer
- **Content**: "Built with precision for AI enthusiasts and prompt engineers"
- **Style**: Centered, muted foreground, border-top

## Animations

### Fade In Animation
- Duration: 0.3s
- Easing: ease-in-out
- Transform: translateY(10px) to 0
- Opacity: 0 to 1

### Button Interactions
- Hover: scale(1.05)
- Active: scale(0.95)
- Duration: 200ms
- Transition: all

### Loading Spinner
- Lucide Loader2 icon
- Animate-spin utility class

## Responsive Design

### Breakpoints
- Mobile-first approach
- md: (768px) - Grid layout for RCTCO info
- Container: max-w-5xl, centered

### Mobile Adjustments
- Header: Full width
- Buttons: Stack vertically on mobile
- Textarea: Full width
- Padding: Reduced on smaller screens

## State Management

### Component State
```typescript
const [rawPrompt, setRawPrompt] = useState('')        // Input value
const [optimizedPrompt, setOptimizedPrompt] = useState('')  // Output value
const [isOptimizing, setIsOptimizing] = useState(false) // Loading state
const [copied, setCopied] = useState(false)            // Copy feedback
```

### Event Handlers
1. `optimizePrompt()`: Triggers optimization process
2. `copyToClipboard()`: Copies output to clipboard
3. `clearAll()`: Resets all state

## RCTCO Implementation

### Placeholder Algorithm
Current implementation uses a template-based approach that:
1. Accepts raw prompt input
2. Wraps it in RCTCO structure
3. Adds role definition
4. Includes task breakdown
5. Specifies constraints
6. Defines output requirements

### API Integration Point
```typescript
const generateOptimizedPrompt = async (input: string): Promise<string> => {
  // Replace this with actual LLM API call
  // Supports: OpenAI GPT-4, Google Gemini, Anthropic Claude, etc.
}
```

## Accessibility

### Semantic HTML
- Proper heading hierarchy (h1 > h2 > h3)
- Semantic section elements
- Button elements for interactions
- Pre elements for code output

### Focus Management
- Visible focus rings on interactive elements
- Disabled state styling
- Proper form labels

### Color Contrast
- High contrast text on backgrounds
- Primary color: 67.5% lightness (readable)
- Foreground: 96% lightness (high contrast)

## AI Integration

### Blink SDK Configuration
- **AI Module**: Public (no authentication required)
- **Provider**: Google Gemini via Blink SDK
- **Model**: Automatically selected by Blink SDK
- **Fallback**: Local RCTCO transformation if API unavailable

### Meta-Prompt Engineer System
```typescript
const META_PROMPT_ENGINEER = `You are a Meta-Prompt Engineer. Your only job is to transform a simple user idea into a comprehensive, high-level professional prompt...

Transform the user's input into a detailed, structured prompt that includes:
- ROLE: Assign an expert role appropriate to the topic
- PERSONA: Describe the expert's background and specialties
- CONTEXT: Provide necessary background information
- TASK: Rewrite the request professionally and in detail
- AUDIENCE: Infer the target audience based on the topic
- TONE: Set the appropriate communication style
- CONSTRAINTS: Expert-level guidance and actionable insights
- OUTPUT FORMAT: Define the best structure for the deliverable`
```

### API Call Pattern
```typescript
const { text } = await blink.ai.generateText({
  messages: [
    { role: 'user', content: META_PROMPT_ENGINEER },
    { role: 'user', content: `Transform this idea: "${prompt}"` }
  ],
  maxTokens: 2048,
  temperature: 0.7
});
```

### Error Handling
- Try-catch wrapper around API calls
- Automatic fallback to local RCTCO transformation if API fails
- Console logging for debugging
- User-friendly error messages

## File Structure
```
src/
├── App.tsx           # Main application component
├── main.tsx         # React entry point
├── index.css        # Global styles & design system
├── blink/
│   └── client.ts   # Blink SDK client initialization
├── lib/
│   └── utils.ts     # Utility functions
```

## Future Enhancements
- Real LLM API integration (Gemini, OpenAI, Claude)
- Prompt history/management
- Multiple optimization frameworks
- Export to various formats
- Dark/light theme toggle
- Custom RCTCO templates
