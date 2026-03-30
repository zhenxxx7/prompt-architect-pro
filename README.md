# Prompt Architect Pro

A sleek web application that transforms raw ideas into expertly crafted AI prompts using **Meta-Prompt Engineer v2.0** - a dynamic, context-aware RCTCO framework powered by **Google Gemini AI**.

## Features

- **Powered by Google Gemini**: Real AI-powered prompt optimization using Blink SDK
- **Dynamic Role Assignment**: Automatically assigns expert roles based on topic (e.g., "Professional Chef" for cooking, "Senior Developer" for coding)
- **Context-Aware Intelligence**: Infers target audience, tone, and optimal output format
- **Creative Expansion**: Rewrites user input professionally, not just templated fill-in-the-blanks
- **8 Specialized Domains**: Software Development, Culinary Arts, Marketing Strategy, Creative Writing, Design, Business Strategy, Data Science, and General
- **Public Access**: No login required - ready to use immediately
- **Modern Dark UI**: Sleek Slate & Indigo color palette
- **Copy to Clipboard**: One-click copy with visual feedback
- **Responsive Design**: Optimized for mobile and desktop

## Quick Start

```bash
npm install
npm run dev
```

## How It Works

Unlike basic prompt templates, Prompt Architect Pro uses intelligent analysis powered by Google Gemini:

1. **Domain Detection**: Analyzes keywords to identify the topic area
2. **Role Assignment**: Assigns the most relevant expert role (not generic "AI Assistant")
3. **Task Expansion**: Rewrites the user's request professionally and in detail
4. **Audience Inference**: Determines the target audience automatically
5. **Tone Setting**: Sets the appropriate communication style
6. **Format Optimization**: Defines the best output structure for the domain

## AI Integration

This app uses **Blink SDK** with **Google Gemini AI** for real prompt optimization. The Meta-Prompt Engineer system prompt guides Gemini to create custom-crafted, professional prompts for any topic.

### API Configuration

The app uses Blink SDK's built-in AI capabilities. Configure your AI settings in the Blink dashboard:
- AI Module: Public (no authentication required)
- Model: Google Gemini (auto-selected by Blink SDK)
- Fallback: Local RCTCO transformation if API unavailable

### Environment Variables

Blink SDK automatically injects:
- `VITE_BLINK_PROJECT_ID`: Your project identifier
- `VITE_BLINK_PUBLISHABLE_KEY`: Your publishable key

No manual API key configuration needed - everything is handled by Blink SDK!

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
- @blinkdotnew/sdk (AI powered by Google Gemini)