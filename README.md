# Prompt Architect Pro

A sleek web application that transforms raw ideas into expertly crafted AI prompts using **Meta-Prompt Engineer v2.0** - a dynamic, context-aware RCTCO framework powered by **Google Gemini AI**.

## Features

- **Powered by Google Gemini**: Real AI-powered prompt optimization using direct Gemini API
- **Dynamic Role Assignment**: Automatically assigns expert roles based on topic (e.g., "Professional Chef" for cooking, "Senior Developer" for coding)
- **Context-Aware Intelligence**: Infers target audience, tone, and optimal output format
- **Creative Expansion**: Rewrites user input professionally, not just templated fill-in-the-blanks
- **8 Specialized Domains**: Software Development, Culinary Arts, Marketing Strategy, Creative Writing, Design, Business Strategy, Data Science, and General
- **Modern Dark UI**: Sleek Slate & Indigo color palette
- **Copy to Clipboard**: One-click copy with visual feedback
- **Responsive Design**: Optimized for mobile and desktop

## Deployment to Vercel

This app is optimized for deployment on Vercel with your own Google Gemini API key.

### Prerequisites

1. **Google Gemini API Key**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Free tier available with rate limits

2. **Vercel Account**
   - Sign up at [vercel.com](https://vercel.com)
   - Connect your GitHub repository

### Deployment Steps

#### Method 1: One-Click Deploy (Recommended)

1. Fork this repository to your GitHub account
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your forked repository
4. Add Environment Variable:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: Your Gemini API key
5. Click "Deploy"

#### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Add API key
vercel env add VITE_GEMINI_API_KEY

# Deploy
vercel
```

### Environment Variables

Create a `.env.local` file for local development:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

For Vercel, add this in your project settings:
- Go to Settings → Environment Variables
- Add `VITE_GEMINI_API_KEY` with your Gemini API key

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/prompt-architect-pro.git
cd prompt-architect-pro

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local and add your API key
nano .env.local

# Start development server
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

## Troubleshooting

### "API key not configured" Error

1. Make sure you've added `VITE_GEMINI_API_KEY` environment variable
2. For local development, create a `.env.local` file
3. For Vercel, add it in project settings → Environment Variables

### API Rate Limit

- Google Gemini has rate limits on free tier
- If you exceed limits, wait a few minutes and try again
- Consider upgrading to a paid plan for higher limits

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

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
- Google Gemini API (Direct Integration)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
1. Check the [troubleshooting section](#troubleshooting)
2. Review [Google Gemini API documentation](https://ai.google.dev/docs)
3. Open an issue on GitHub

## Deploy Now

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/prompt-architect-pro)

**Note**: Replace `your-username` with your GitHub username after forking.
