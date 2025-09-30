import React, { useState, useEffect } from 'react';
import { Code2, Zap, Globe, Lock, Terminal, Sparkles } from 'lucide-react';

export default function CodeEditorLanding() {
  const [activeCode, setActiveCode] = useState(0);
  const [cursorPos, setCursorPos] = useState(0);

  const codeSnippets = [
    'const hello = "world";',
    'function build() { }',
    'import React from "react";'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCode((prev) => (prev + 1) % codeSnippets.length);
      setCursorPos(0);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursor = setInterval(() => {
      setCursorPos((prev) => (prev + 1) % (codeSnippets[activeCode].length + 1));
    }, 100);
    return () => clearInterval(cursor);
  }, [activeCode]);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Instant compilation and real-time preview with zero configuration needed"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Code Anywhere",
      description: "Access your projects from any device, anytime, with cloud synchronization"
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "Multiple Languages",
      description: "Support for JavaScript, Python, TypeScript, and 20+ other languages"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Secure & Private",
      description: "End-to-end encryption ensures your code stays safe and private"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
              <span className="ml-2 text-purple-400 font-semibold tracking-wide">NEXT-GEN DEVELOPMENT</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Code Without Limits
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              A powerful online code editor that transforms the way you build. Write, run, and deploy instantly from your browser.
            </p>
            
            {/* Animated Code Preview */}
            <div className="max-w-2xl mx-auto mb-12 bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-2xl">
              <div className="flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="ml-4 text-sm text-gray-500">editor.tsx</span>
              </div>
              <div className="font-mono text-left text-sm md:text-base">
                <span className="text-purple-400">
                  {codeSnippets[activeCode].substring(0, cursorPos)}
                </span>
                <span className="inline-block w-2 h-5 bg-purple-400 animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                Start Coding Free
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
              <button className="px-8 py-4 bg-gray-900 rounded-lg font-semibold text-lg border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:scale-105">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for Modern Developers</h2>
          <p className="text-xl text-gray-400">Everything you need to code, collaborate, and create</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="group relative p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex p-3 bg-purple-600/20 rounded-lg text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
          </div>
          <div className="relative px-8 py-16 text-center">
            <Code2 className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Start Building?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of developers already using our platform to bring their ideas to life
            </p>
            <button className="px-8 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl">
              Get Started Now
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-500">
            <p>&copy; 2025 CodeEditor. Built for developers, by developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}