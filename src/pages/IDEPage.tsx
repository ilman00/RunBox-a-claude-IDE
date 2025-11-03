import { useState, useEffect } from 'react';
import {
    Code,
    FileText,
    Terminal,
    Monitor,
    Loader2,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    PanelLeftClose,
    PanelLeftOpen,
    PanelRightClose,
    PanelRightOpen
} from 'lucide-react';
import CodeEditor from '../components/ide/CodeEditor';

// Interfaces for type safety
interface FileNode {
    id: string;
    name: string;
    type: 'file' | 'folder';
    path: string;
    content?: string;
    language?: string;
    children?: FileNode[];
    expanded?: boolean;
}

interface IDEProject {
    id: string;
    userId: string;
    name: string;
    template: string;
    description: string;
    files: FileNode[];
    settings: {
        theme: string;
        fontSize: number;
        autoSave: boolean;
    };
    createdAt: string;
    lastModified: string;
}

interface IDEPageProps {
    projectId?: string;
    userId?: string;
}

export default function IDEPage({ projectId = 'proj_1a2b3c', userId = 'user_123' }: IDEPageProps) {
    const [project, setProject] = useState<IDEProject | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFile, setActiveFile] = useState<string | null>(null);

    // Collapsible panel states
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isPreviewOpen, setIsPreviewOpen] = useState(true);
    const [isTerminalOpen, setIsTerminalOpen] = useState(true);


        

    // Mock project data
    const mockProject: IDEProject = {
        id: projectId,
        userId: userId,
        name: 'E-Commerce Platform',
        template: 'react',
        description: 'Full-stack shopping application',
        createdAt: '2025-10-25T10:00:00Z',
        lastModified: '2025-10-31T14:30:00Z',
        settings: {
            theme: 'dark',
            fontSize: 14,
            autoSave: true
        },
        files: [
            {
                id: 'folder_1',
                name: 'src',
                type: 'folder',
                path: '/src',
                expanded: true,
                children: [
                    {
                        id: 'folder_2',
                        name: 'components',
                        type: 'folder',
                        path: '/src/components',
                        expanded: true,
                        children: [
                            {
                                id: 'file_1',
                                name: 'Header.jsx',
                                type: 'file',
                                path: '/src/components/Header.jsx',
                                language: 'javascript',
                                content: `import React from 'react';
import { ShoppingCart, User, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-600">ShopHub</h1>
          
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-gray-600" />
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <User className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
}`
                            },
                            {
                                id: 'file_2',
                                name: 'ProductCard.jsx',
                                type: 'file',
                                path: '/src/components/ProductCard.jsx',
                                language: 'javascript',
                                content: `import React from 'react';
import { Star } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className="w-4 h-4 fill-yellow-400 text-yellow-400" 
            />
          ))}
        </div>
        <p className="text-2xl font-bold text-purple-600">
          {product.price}
        </p>
      </div>
    </div>
  );
}`
                            }
                        ]
                    },
                    {
                        id: 'file_3',
                        name: 'App.jsx',
                        type: 'file',
                        path: '/src/App.jsx',
                        language: 'javascript',
                        content: `import React, { useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';

function App() {
  const [products] = useState([
    { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'https://via.placeholder.com/300' },
    { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://via.placeholder.com/300' },
    { id: 3, name: 'Laptop Stand', price: 49.99, image: 'https://via.placeholder.com/300' },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;`
                    },
                    {
                        id: 'file_4',
                        name: 'index.css',
                        type: 'file',
                        path: '/src/index.css',
                        language: 'css',
                        content: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}`
                    }
                ]
            },
            {
                id: 'folder_3',
                name: 'public',
                type: 'folder',
                path: '/public',
                expanded: false,
                children: [
                    {
                        id: 'file_5',
                        name: 'index.html',
                        type: 'file',
                        path: '/public/index.html',
                        language: 'html',
                        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="E-Commerce Platform" />
    <title>ShopHub - E-Commerce Platform</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`
                    }
                ]
            },
            {
                id: 'file_6',
                name: 'package.json',
                type: 'file',
                path: '/package.json',
                language: 'json',
                content: `{
  "name": "ecommerce-platform",
  "version": "1.0.0",
  "description": "Full-stack shopping application",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "react-scripts": "5.0.1"
  }
}`
            },
            {
                id: 'file_7',
                name: 'README.md',
                type: 'file',
                path: '/README.md',
                language: 'markdown',
                content: `# E-Commerce Platform

A modern e-commerce application built with React.

## Features

- Product listing with cards
- Shopping cart functionality
- User authentication
- Responsive design

## Getting Started

\`\`\`bash
npm install
npm start
\`\`\`

## Tech Stack

- React 18
- Tailwind CSS
- Lucide Icons`
            }
        ]
    };

    // Simulate API call to fetch project
    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true);

            // API Integration Ready
            // try {
            //   const response = await fetch(`/api/projects/${projectId}?userId=${userId}`);
            //   const data = await response.json();
            //   setProject(data);
            // } catch (error) {
            //   console.error('Failed to fetch project:', error);
            // }

            // Simulate loading delay
            setTimeout(() => {
                setProject(mockProject);
                setActiveFile('file_3'); // App.jsx
                setIsLoading(false);
            }, 1000);
        };

        fetchProject();
    }, [projectId, userId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                {/* Animated Background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 animate-pulse" />
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative z-10 text-center">
                    <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-white mb-2">Loading IDE...</h2>
                    <p className="text-gray-400">Preparing your development environment</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Code className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-600 mb-2">Project Not Found</h2>
                    <p className="text-gray-500">The requested project could not be loaded</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-black text-white overflow-hidden flex flex-col">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 animate-pulse" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* IDE Container */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Top Bar Placeholder */}
                <div className="bg-gray-900 border-b border-gray-800 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Code className="w-6 h-6 text-purple-400" />
                            <div>
                                <h1 className="text-lg font-semibold text-white">{project.name}</h1>
                                <p className="text-xs text-gray-500">IDETopBar Component Will Go Here</p>
                            </div>
                        </div>

                        {/* Panel Toggle Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                                title={isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                            >
                                {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                                title={isPreviewOpen ? 'Hide Preview' : 'Show Preview'}
                            >
                                {isPreviewOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                                title={isTerminalOpen ? 'Hide Terminal' : 'Show Terminal'}
                            >
                                {isTerminalOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main IDE Layout */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left Sidebar - Collapsible */}
                    <div
                        className={`bg-gray-900 border-r border-gray-800 overflow-y-auto transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-0'
                            }`}
                    >
                        {isSidebarOpen && (
                            <div className="w-64">
                                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <FileText className="w-5 h-5" />
                                        <span className="font-semibold">Explorer</span>
                                    </div>
                                    <button
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <div className="text-center py-8">
                                        <FileText className="w-12 h-12 text-gray-700 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">FileTree Component</p>
                                        <p className="text-xs text-gray-600 mt-1">{project.files.length} items</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Toggle Sidebar Button (When Collapsed) */}
                    {!isSidebarOpen && (
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="w-8 bg-gray-900 border-r border-gray-800 hover:bg-gray-800 transition-all flex items-center justify-center"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                        </button>
                    )}

                    {/* Center: Editor + Terminal */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Code Editor Area */}
                        <div className={`bg-black border-b border-gray-800 overflow-hidden transition-all duration-300 ${isTerminalOpen ? 'flex-1' : 'h-full'
                            }`}>
                            <div className="p-3 border-b border-gray-800 bg-gray-900 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Code className="w-5 h-5" />
                                    <span className="font-semibold text-sm">Editor</span>
                                    <span className="text-xs text-gray-600">App.jsx</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center h-full">
                                {/* <div className="text-center">
                                    <Code className="w-16 h-16 text-gray-700 mx-auto mb-3" />
                                    <p className="text-gray-500">CodeEditor Component</p>
                                    <p className="text-sm text-gray-600 mt-2">Monaco Editor will be integrated here</p>
                                </div> */}
                                <CodeEditor />
                            </div>
                        </div>

                        {/* Terminal Area - Collapsible */}
                        {isTerminalOpen && (
                            <div className="h-64 bg-black border-t border-gray-800 overflow-hidden transition-all duration-300">
                                <div className="p-3 border-b border-gray-800 bg-gray-900 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Terminal className="w-5 h-5" />
                                        <span className="font-semibold text-sm">Terminal</span>
                                    </div>
                                    <button
                                        onClick={() => setIsTerminalOpen(false)}
                                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                                    >
                                        <ChevronDown className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                                <div className="p-4 flex items-center justify-center h-32">
                                    <div className="text-center">
                                        <Terminal className="w-12 h-12 text-gray-700 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">Terminal Component</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Toggle Terminal Button (When Collapsed) */}
                        {!isTerminalOpen && (
                            <button
                                onClick={() => setIsTerminalOpen(true)}
                                className="h-8 bg-gray-900 border-t border-gray-800 hover:bg-gray-800 transition-all flex items-center justify-center"
                            >
                                <ChevronUp className="w-4 h-4 text-gray-500" />
                            </button>
                        )}
                    </div>

                    {/* Toggle Preview Button (When Collapsed) */}
                    {!isPreviewOpen && (
                        <button
                            onClick={() => setIsPreviewOpen(true)}
                            className="w-8 bg-gray-900 border-l border-gray-800 hover:bg-gray-800 transition-all flex items-center justify-center"
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-500" />
                        </button>
                    )}

                    {/* Right: Preview - Collapsible */}
                    <div
                        className={`bg-gray-900 border-l border-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${isPreviewOpen ? 'w-96' : 'w-0'
                            }`}
                    >
                        {isPreviewOpen && (
                            <div className="w-96">
                                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Monitor className="w-5 h-5" />
                                        <span className="font-semibold">Preview</span>
                                    </div>
                                    <button
                                        onClick={() => setIsPreviewOpen(false)}
                                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <div className="text-center py-8">
                                        <Monitor className="w-12 h-12 text-gray-700 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">Preview Component</p>
                                        <p className="text-xs text-gray-600 mt-1">Live preview will render here</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Debug Info (Remove in production) */}
            <div className="fixed bottom-4 left-4 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg p-3 text-xs text-gray-400 z-50">
                <div className="font-semibold text-purple-400 mb-2">Panel States:</div>
                <div>Sidebar: {isSidebarOpen ? '✅ Open' : '❌ Closed'}</div>
                <div>Preview: {isPreviewOpen ? '✅ Open' : '❌ Closed'}</div>
                <div>Terminal: {isTerminalOpen ? '✅ Open' : '❌ Closed'}</div>
            </div>
        </div>
    );
}