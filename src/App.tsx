import { useState } from 'react';
import { Sparkles, Copy, Trash2, Loader2, Zap } from 'lucide-react';
import { callGeminiAPI } from './lib/gemini';

function App() {
  const [rawPrompt, setRawPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');

  // Meta-Prompt Engineer System Prompt
  const META_PROMPT_ENGINEER = `You are a Meta-Prompt Engineer. Your only job is to transform a simple user idea into a comprehensive, high-level professional prompt for an AI assistant.

Transform the user's input into a detailed, structured prompt that includes:

## ROLE
Assign an expert role appropriate to the topic (e.g., Senior Developer for coding, Professional Chef for cooking, Marketing Director for marketing, etc.). Include 15+ years of relevant experience.

## PERSONA
Describe the expert's background, specialties, and approach.

## CONTEXT
Provide necessary background information and scope for the task.

## TASK
Rewrite the user's request professionally and in detail. Break it down into clear, actionable components.

## AUDIENCE
Infer the target audience based on the topic.

## TONE
Set the appropriate communication style (technical, creative, professional, etc.).

## CONSTRAINTS
- Provide expert-level guidance with practical, actionable insights
- Include specific examples, templates, or code snippets where applicable
- Anticipate follow-up questions and address potential edge cases
- Maintain consistency and coherence throughout

## OUTPUT FORMAT
Define the best structure for the deliverable based on the domain (code format for development, recipe format for cooking, etc.).

Be creative and context-aware. Do not use generic templates. Each prompt should feel custom-crafted by an expert consultant.`;

  // RCTCO Framework Optimization Logic with Gemini AI
  const optimizePrompt = async () => {
    if (!rawPrompt.trim()) return;

    setIsOptimizing(true);
    setError('');

    try {
      // Get API key from environment variable
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const fullPrompt = `${META_PROMPT_ENGINEER}\n\nUser's idea: "${rawPrompt}"\n\nTransform this idea into a professional prompt following the RCTCO framework above.`;

      const optimized = await callGeminiAPI(fullPrompt, apiKey);
      setOptimizedPrompt(optimized);
    } catch (error) {
      console.error('Optimization failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      
      // Fallback: Dynamic RCTCO transformation
      const fallback = transformWithRCTCO(rawPrompt);
      setOptimizedPrompt(fallback);
    } finally {
      setIsOptimizing(false);
    }
  };

  // Dynamic Context-Aware RCTCO Transformation
  const transformWithRCTCO = (input: string): string => {
    // Analyze input to determine domain and appropriate role
    const analysis = analyzePrompt(input);
    
    // Creative expansion: rewrite the task professionally
    const expandedTask = expandTask(input, analysis);
    
    // Infer audience and tone based on context
    const { audience, tone } = inferAudienceAndTone(analysis);
    
    // Determine best output format
    const outputFormat = determineOutputFormat(analysis);

    return `## ROLE
${analysis.role}

${analysis.persona}

## CONTEXT
${analysis.context}

## TASK
${expandedTask}

## AUDIENCE
${audience}

## TONE
${tone}

## CONSTRAINTS
- Provide expert-level guidance with practical, actionable insights
- Use clear, concise language appropriate for ${analysis.audienceLevel}
- Include specific examples, templates, or code snippets where applicable
- Anticipate follow-up questions and address potential edge cases
- Maintain consistency and coherence throughout the response

## OUTPUT
${outputFormat}

---
Crafted by Prompt Architect Pro | Meta-Prompt Engineer v2.0`;
  };

  // Intelligent Prompt Analysis
  const analyzePrompt = (input: string): {
    domain: string;
    role: string;
    persona: string;
    context: string;
    audienceLevel: string;
    keywords: string[];
  } => {
    const lowerInput = input.toLowerCase();
    const keywords = extractKeywords(lowerInput);
    
    // Domain detection and role assignment
    if (matchesAny(lowerInput, ['code', 'programming', 'software', 'developer', 'function', 'api', 'database', 'debug', 'algorithm'])) {
      return {
        domain: 'software_development',
        role: 'Senior Software Architect & Technical Lead',
        persona: 'You have 15+ years of experience in software engineering, system design, and code architecture. You specialize in writing clean, maintainable, scalable code following industry best practices and design patterns.',
        context: 'The user needs a solution for software development, programming, or technical implementation. Consider performance, scalability, security, and maintainability in your response.',
        audienceLevel: 'technical professionals',
        keywords
      };
    }
    
    if (matchesAny(lowerInput, ['cook', 'recipe', 'food', 'chef', 'meal', 'diet', 'nutrition', 'ingredient', 'kitchen'])) {
      return {
        domain: 'culinary_arts',
        role: 'Professional Executive Chef & Nutrition Consultant',
        persona: 'You are a classically trained chef with expertise in various cuisines, nutritional science, and culinary techniques. You balance creativity with practicality, ensuring dishes are both delicious and suitable for the target audience.',
        context: 'The user needs culinary guidance ranging from specific recipes to meal planning. Consider dietary restrictions, cooking skill level, available equipment, and nutritional balance.',
        audienceLevel: 'home cooks to culinary enthusiasts',
        keywords
      };
    }
    
    if (matchesAny(lowerInput, ['marketing', 'brand', 'campaign', 'seo', 'social media', 'content', 'advertising', 'copywrite'])) {
      return {
        domain: 'marketing_strategy',
        role: 'Strategic Marketing Director & Brand Architect',
        persona: 'You have deep expertise in digital marketing, brand development, content strategy, and consumer psychology. You create data-driven marketing solutions that resonate with target audiences and achieve measurable results.',
        context: 'The user needs marketing guidance for promoting products, services, or brands. Consider market trends, audience segmentation, multi-channel strategies, and ROI optimization.',
        audienceLevel: 'marketing professionals and business owners',
        keywords
      };
    }
    
    if (matchesAny(lowerInput, ['write', 'blog', 'article', 'story', 'creative', 'fiction', 'book', 'novel', 'script'])) {
      return {
        domain: 'creative_writing',
        role: 'Professional Author & Creative Writing Coach',
        persona: 'You are an accomplished writer with expertise in multiple genres and styles. You understand narrative structure, character development, pacing, and the art of engaging storytelling.',
        context: 'The user needs creative writing assistance, whether it\'s crafting compelling narratives, developing characters, or structuring content for maximum impact.',
        audienceLevel: 'writers and content creators',
        keywords
      };
    }
    
    if (matchesAny(lowerInput, ['design', 'ui', 'ux', 'interface', 'visual', 'graphic', 'layout', 'prototype', 'wireframe'])) {
      return {
        domain: 'design',
        role: 'Senior UX/UI Designer & Design Systems Expert',
        persona: 'You have a strong background in user experience design, visual design principles, and design thinking methodology. You create intuitive, accessible, and aesthetically pleasing interfaces.',
        context: 'The user needs design guidance for digital products or visual communication. Consider usability, accessibility, visual hierarchy, and design system consistency.',
        audienceLevel: 'designers and product teams',
        keywords
      };
    }
    
    if (matchesAny(lowerInput, ['business', 'strategy', 'startup', 'plan', 'consulting', 'management', 'executive'])) {
      return {
        domain: 'business_strategy',
        role: 'Senior Business Consultant & Strategy Advisor',
        persona: 'You have extensive experience in strategic planning, market analysis, business development, and organizational leadership. You provide actionable insights grounded in business fundamentals and market realities.',
        context: 'The user needs business guidance for decision-making, planning, or problem-solving. Consider market dynamics, competitive positioning, resource allocation, and risk assessment.',
        audienceLevel: 'business leaders and entrepreneurs',
        keywords
      };
    }
    
    if (matchesAny(lowerInput, ['data', 'analysis', 'analytics', 'machine learning', 'ai', 'ml', 'model', 'statistics', 'visualization'])) {
      return {
        domain: 'data_science',
        role: 'Principal Data Scientist & Machine Learning Engineer',
        persona: 'You have deep expertise in statistical analysis, machine learning algorithms, data visualization, and extracting actionable insights from complex datasets.',
        context: 'The user needs data science guidance for analysis, modeling, or decision support. Consider data quality, model selection, validation, and interpretability.',
        audienceLevel: 'data professionals and analysts',
        keywords
      };
    }
    
    // Default: General expert consultant
    return {
      domain: 'general',
      role: 'Subject Matter Expert & Professional Consultant',
      persona: 'You are a knowledgeable professional with deep expertise in providing comprehensive, well-researched guidance across various topics. You combine theoretical knowledge with practical experience.',
      context: 'The user needs expert guidance on their specific request. Provide thorough, accurate, and helpful information that addresses their underlying needs.',
      audienceLevel: 'general audience',
      keywords
    };
  };

  // Extract meaningful keywords from input
  const extractKeywords = (input: string): string[] => {
    const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very']);
    return input
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));
  };

  // Check if input matches any keywords
  const matchesAny = (input: string, keywords: string[]): boolean => {
    return keywords.some(keyword => input.includes(keyword));
  };

  // Creative Task Expansion
  const expandTask = (input: string, analysis: any): string => {
    // Professional rewrite of the user's request
    const cleanedInput = input.trim();
    
    // Detect intent and expand appropriately
    if (cleanedInput.endsWith('?')) {
      // It's a question - expand into a comprehensive answer request
      return `Provide a comprehensive, expert-level response to the following inquiry:\n\n"${cleanedInput.slice(0, -1)}"\n\nYour response should:\n- Address the core question directly and concisely\n- Provide relevant background or context where helpful\n- Include practical examples or applications\n- Consider potential follow-up questions or related considerations`;
    } else {
      // It's a request/task - expand into a detailed task description
      return `Execute the following task with professional expertise and attention to detail:\n\n"${cleanedInput}"\n\nRequired approach:\n- Break down the task into clear, actionable steps\n- Provide the deliverable with appropriate depth and complexity\n- Include relevant examples, templates, or demonstrations\n- Ensure the output is immediately usable and practical`;
    }
  };

  // Infer target audience and tone
  const inferAudienceAndTone = (analysis: any): { audience: string; tone: string } => {
    switch (analysis.domain) {
      case 'software_development':
        return {
          audience: 'Software developers, engineers, and technical architects who need precise, implementable solutions',
          tone: 'Technical, precise, and systematic with code examples and architectural considerations'
        };
      case 'culinary_arts':
        return {
          audience: 'Home cooks to intermediate chefs seeking delicious, practical recipes and culinary techniques',
          tone: 'Warm, encouraging, and detailed with emphasis on technique and flavor balance'
        };
      case 'marketing_strategy':
        return {
          audience: 'Marketing professionals, business owners, and entrepreneurs looking for effective strategies',
          tone: 'Strategic, results-oriented, and data-informed with creative insights'
        };
      case 'creative_writing':
        return {
          audience: 'Writers, content creators, and storytellers seeking engaging, well-crafted content',
          tone: 'Creative, evocative, and narrative-driven with attention to style and voice'
        };
      case 'design':
        return {
          audience: 'Designers, product managers, and teams creating user-centered digital experiences',
          tone: 'Visual, user-focused, and systematic with emphasis on usability and aesthetics'
        };
      case 'business_strategy':
        return {
          audience: 'Business leaders, executives, and entrepreneurs making strategic decisions',
          tone: 'Professional, analytical, and actionable with attention to market realities'
        };
      case 'data_science':
        return {
          audience: 'Data scientists, analysts, and technical professionals working with data-driven insights',
          tone: 'Analytical, methodical, and statistically rigorous with practical applications'
        };
      default:
        return {
          audience: 'Professionals and enthusiasts seeking expert guidance on the topic',
          tone: 'Professional, informative, and engaging with appropriate depth for the subject matter'
        };
    }
  };

  // Determine best output format
  const determineOutputFormat = (analysis: any): string => {
    switch (analysis.domain) {
      case 'software_development':
        return `- Structured code with comments and documentation
- Explanation of approach and design decisions
- Time and space complexity analysis
- Potential alternatives or optimizations
- Usage examples and testing considerations`;
      case 'culinary_arts':
        return `Detailed recipe with:
- Ingredient list with precise measurements
- Step-by-step cooking instructions
- Prep and cook times
- Serving suggestions and variations
- Pro tips for best results`;
      case 'marketing_strategy':
        return `Comprehensive marketing deliverable including:
- Executive summary
- Strategic recommendations
- Tactical implementation plan
- Key metrics and success indicators
- Budget and resource considerations`;
      case 'creative_writing':
        return `Polished written content with:
- Compelling narrative or argument
- Appropriate structure and pacing
- Vivid descriptions and engaging prose
- Clear beginning, middle, and end`;
      case 'design':
        return `Design specification including:
- Conceptual overview
- User flow and information architecture
- Visual design guidelines
- Component specifications
- Usability considerations and accessibility`;
      case 'business_strategy':
        return `Strategic business deliverable:
- Situation analysis
- Strategic options and recommendations
- Implementation roadmap
- Risk assessment and mitigation
- Expected outcomes and KPIs`;
      case 'data_science':
        return `Data science output with:
- Methodology and approach
- Data analysis and visualizations
- Model specifications (if applicable)
- Insights and recommendations
- Limitations and next steps`;
      default:
        return `Comprehensive response with:
- Clear, direct answer or solution
- Supporting details and context
- Practical examples or applications
- Actionable recommendations
- Quality and accuracy standards`;
    }
  };

  // Copy to Clipboard
  const copyToClipboard = async () => {
    if (!optimizedPrompt) return;

    try {
      await navigator.clipboard.writeText(optimizedPrompt);
      setCopied('✓');
      setTimeout(() => setCopied(''), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Clear All
  const clearAll = () => {
    setRawPrompt('');
    setOptimizedPrompt('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
                Prompt Architect
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base mt-1">
                Transform raw ideas into high-performance AI instructions
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Input Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Raw Prompt</h2>
              <p className="text-sm text-muted-foreground">
                Enter your basic prompt idea
              </p>
            </div>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-200"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          </div>

          <textarea
            value={rawPrompt}
            onChange={(e) => setRawPrompt(e.target.value)}
            placeholder="e.g., write a diet plan"
            className="w-full h-48 p-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all duration-200"
          />

          {/* Optimize Button */}
          <button
            onClick={optimizePrompt}
            disabled={!rawPrompt.trim() || isOptimizing}
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            {isOptimizing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Optimizing...</span>
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Optimize Prompt</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
              <p className="font-semibold mb-1">API Error:</p>
              <p>{error}</p>
              <p className="text-xs mt-2 opacity-80">
                Using offline mode. Results may be less sophisticated.
              </p>
            </div>
          )}
        </section>

        {/* Output Section */}
        {optimizedPrompt && (
          <section className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Optimized Prompt</h2>
                <p className="text-sm text-muted-foreground">
                  Your RCTCO-enhanced prompt
                </p>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-all duration-200 font-medium"
              >
                {copied ? (
                  <>
                    <Sparkles className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">{copied} Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>
            </div>

            {/* Optimized Prompt Display */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-indigo-400 rounded-l-xl" />
              <div className="bg-card border border-border rounded-xl p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <pre className="whitespace-pre-wrap break-words">
                  {optimizedPrompt}
                </pre>
              </div>
            </div>

            {/* RCTCO Framework Explanation */}
            <div className="bg-muted/30 border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                RCTCO Framework Breakdown
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Role</h4>
                  <p className="text-sm text-muted-foreground">
                    Defines who the AI should be
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Context</h4>
                  <p className="text-sm text-muted-foreground">
                    Provides background information
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Task</h4>
                  <p className="text-sm text-muted-foreground">
                    States the specific action needed
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Constraint</h4>
                  <p className="text-sm text-muted-foreground">
                    Sets guidelines and limitations
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Output</h4>
                  <p className="text-sm text-muted-foreground">
                    Specifies the expected format
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Built with precision • Powered by the RCTCO framework
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
