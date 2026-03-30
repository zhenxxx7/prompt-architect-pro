import { useState } from 'react';
import { Sparkles, Copy, Trash2, Loader2, Zap } from 'lucide-react';

function App() {
  const [rawPrompt, setRawPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [copied, setCopied] = useState(false);

  // RCTCO Framework Optimization Logic
  const optimizePrompt = async () => {
    if (!rawPrompt.trim()) return;

    setIsOptimizing(true);

    try {
      // Placeholder for LLM API call (Gemini, OpenAI, etc.)
      // Replace this with your actual API integration
      const optimized = await callLLMAPI(rawPrompt);
      setOptimizedPrompt(optimized);
    } catch (error) {
      console.error('Optimization failed:', error);
      // Fallback: Basic RCTCO transformation
      const fallback = transformWithRCTCO(rawPrompt);
      setOptimizedPrompt(fallback);
    } finally {
      setIsOptimizing(false);
    }
  };

  // Placeholder LLM API call - Replace with your actual API
  const callLLMAPI = async (prompt: string): Promise<string> => {
    // Example integration (uncomment and configure as needed):
    // 
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer YOUR_API_KEY'
    //   },
    //   body: JSON.stringify({
    //     prompt: `Transform this prompt using the RCTCO framework (Role, Context, Task, Constraint, Output):
    //     
    //     Original Prompt: ${prompt}
    //     
    //     Provide the optimized prompt.`
    //   })
    // });
    // const data = await response.json();
    // return data.optimized_prompt;

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Fallback transformation using RCTCO framework
    return transformWithRCTCO(prompt);
  };

  // RCTCO Framework Transformation
  const transformWithRCTCO = (input: string): string => {
    const context = "You are an AI assistant specialized in providing expert assistance.";
    const task = input.includes('?') ? input : `${input}?`;
    const role = "Expert AI Assistant";
    const constraints = "Provide detailed, accurate, and well-structured responses. Use clear formatting with bullet points and examples when appropriate.";
    const output = "Deliver a comprehensive response that addresses the user's request with depth and practical value.";

    return `## Role
${role}

## Context
${context}

## Task
${task}

## Constraints
${constraints}

## Output
${output}`;
  };

  // Copy to Clipboard
  const copyToClipboard = async () => {
    if (!optimizedPrompt) return;

    try {
      await navigator.clipboard.writeText(optimizedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
                    <span className="text-green-500">Copied!</span>
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
