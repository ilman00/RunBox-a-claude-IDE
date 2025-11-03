import { useState, useRef, useEffect } from 'react';
import { 
  Code, 
  Save, 
  RotateCcw,
  Copy,
  Check,
  Download,
  Maximize2,
  Minimize2
} from 'lucide-react';
import Editor from '@monaco-editor/react';

// Interface for file data
interface CodeEditorProps {
  fileName?: string;
  language?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
  onSave?: (value: string) => void;
  readOnly?: boolean;
  theme?: 'vs-dark' | 'light';
}

export default function CodeEditor({
  fileName = 'untitled.js',
  language = 'javascript',
  value = '',
  onChange,
  onSave,
  readOnly = false,
  theme = 'vs-dark'
}: CodeEditorProps) {
  const [editorValue, setEditorValue] = useState(value);
  const [isDirty, setIsDirty] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<any>(null);

  // Update editor when value prop changes
  useEffect(() => {
    setEditorValue(value);
    setIsDirty(false);
  }, [value]);

  // Detect if file extension matches language
  const getLanguageFromFileName = (name: string): string => {
    const ext = name.split('.').pop()?.toLowerCase();
    const languageMap: { [key: string]: string } = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      py: 'python',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      cs: 'csharp',
      php: 'php',
      rb: 'ruby',
      go: 'go',
      rs: 'rust',
      html: 'html',
      css: 'css',
      scss: 'scss',
      json: 'json',
      xml: 'xml',
      md: 'markdown',
      sql: 'sql',
      sh: 'shell',
      yaml: 'yaml',
      yml: 'yaml'
    };
    return languageMap[ext || ''] || language;
  };

  const detectedLanguage = getLanguageFromFileName(fileName);

  const handleEditorChange = (newValue: string | undefined) => {
    setEditorValue(newValue || '');
    setIsDirty(true);
    onChange?.(newValue);
  };

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
    
    // Add custom keyboard shortcuts
    editor.addCommand(
      // Ctrl/Cmd + S for Save
      window.navigator.platform.match('Mac') ? 2048 + 49 : 2048 + 49,
      () => handleSave()
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editorValue);
      setIsDirty(false);
    }
    // TODO: API call to save file
    // await fetch(`/api/files/${fileId}`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ content: editorValue })
    // });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editorValue);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([editorValue], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setEditorValue(value);
    setIsDirty(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`flex flex-col bg-black h-full w-full ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Editor Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        {/* Left: File Info */}
        <div className="flex items-center gap-3">
          <Code className="w-5 h-5 text-purple-400" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                {fileName}
              </span>
              {isDirty && (
                <span className="w-2 h-2 bg-orange-500 rounded-full" title="Unsaved changes" />
              )}
            </div>
            <span className="text-xs text-gray-500 capitalize">
              {detectedLanguage}
            </span>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Reset Button */}
          {isDirty && (
            <button
              onClick={handleReset}
              className="p-2 hover:bg-gray-800 rounded-lg transition-all text-gray-400 hover:text-white"
              title="Reset changes"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-800 rounded-lg transition-all text-gray-400 hover:text-white"
            title="Copy code"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-800 rounded-lg transition-all text-gray-400 hover:text-white"
            title="Download file"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-gray-800 rounded-lg transition-all text-gray-400 hover:text-white"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          {/* Save Button */}
          {!readOnly && (
            <button
              onClick={handleSave}
              disabled={!isDirty}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                isDirty
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/50 text-white'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
              title="Save (Ctrl/Cmd + S)"
            >
              <Save className="w-4 h-4" />
              <span className="text-sm">Save</span>
            </button>
          )}
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 w-full overflow-hidden">
        <Editor
          width="100%"
          height="100%"
          language={detectedLanguage}
          value={editorValue}
          onChange={handleEditorChange}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            readOnly: readOnly,
            fontSize: 14,
            fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
            fontLigatures: true,
            lineNumbers: 'on',
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            formatOnPaste: true,
            formatOnType: true,
            suggest: {
              showKeywords: true,
              showSnippets: true
            },
            quickSuggestions: {
              other: true,
              comments: false,
              strings: true
            },
            parameterHints: {
              enabled: true
            },
            bracketPairColorization: {
              enabled: true
            },
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            // Custom dark theme colors
            'semanticHighlighting.enabled': true
          }}
          loading={
            <div className="flex items-center justify-center h-full bg-black">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Loading Editor...</p>
              </div>
            </div>
          }
        />
      </div>

      {/* Footer Status Bar */}
      <div className="bg-gray-900 border-t border-gray-800 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>Lines: {editorValue.split('\n').length}</span>
          <span>Characters: {editorValue.length}</span>
          <span className="capitalize">{detectedLanguage}</span>
        </div>
        <div className="flex items-center gap-4">
          {isDirty && (
            <span className="text-orange-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              Unsaved Changes
            </span>
          )}
          {readOnly && (
            <span className="text-yellow-400">Read Only</span>
          )}
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}