'use client';

import { useState, useEffect } from 'react';
import JsonEditor from './components/JsonEditor';
import Toolbar from './components/Toolbar';
import ErrorDisplay from './components/ErrorDisplay';
import TreeView from './components/TreeView';
import AdBanner from './components/AdBanner';
import {
  validateJson,
  formatJson,
  minifyJson,
  downloadJson,
  copyToClipboard,
  getSampleJson,
  getJsonSize,
  JsonError
} from './lib/jsonUtils';
import { addToHistory } from './lib/storage';
import { FiCode, FiGitBranch } from 'react-icons/fi';

export default function Home() {
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState<JsonError | undefined>();
  const [success, setSuccess] = useState<string>('');
  const [isValidJson, setIsValidJson] = useState(false);
  const [showTreeView, setShowTreeView] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Validate JSON on input change
  useEffect(() => {
    if (!inputJson.trim()) {
      setError(undefined);
      setIsValidJson(false);
      setOutputJson('');
      return;
    }

    const result = validateJson(inputJson);
    setIsValidJson(result.isValid);

    if (!result.isValid) {
      setError(result.error);
      setOutputJson('');
    } else {
      setError(undefined);
      if (result.formatted) {
        setOutputJson(result.formatted);
      }
    }
  }, [inputJson]);

  const showSuccessMessage = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleFormat = () => {
    try {
      setIsProcessing(true);
      const formatted = formatJson(inputJson, 2);
      setOutputJson(formatted);
      setInputJson(formatted);
      addToHistory(formatted, getJsonSize(formatted));
      showSuccessMessage('JSON formatted successfully!');
    } catch (err) {
      setError({ message: 'Failed to format JSON' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMinify = () => {
    try {
      setIsProcessing(true);
      const minified = minifyJson(inputJson);
      setOutputJson(minified);
      setInputJson(minified);
      addToHistory(minified, getJsonSize(minified));
      showSuccessMessage('JSON minified successfully!');
    } catch (err) {
      setError({ message: 'Failed to minify JSON' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setInputJson('');
    setOutputJson('');
    setError(undefined);
    setSuccess('');
  };

  const handleCopy = async () => {
    const textToCopy = outputJson || inputJson;
    const success = await copyToClipboard(textToCopy);
    if (success) {
      showSuccessMessage('Copied to clipboard!');
    } else {
      setError({ message: 'Failed to copy to clipboard' });
    }
  };

  const handleDownload = () => {
    try {
      // Use output JSON if available, otherwise use input
      const jsonToDownload = outputJson || inputJson;

      // Validate JSON before download
      if (!jsonToDownload || jsonToDownload.trim() === '') {
        setError({ message: 'No JSON to download' });
        return;
      }

      // Create filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `json-formatter-${timestamp}.json`;

      downloadJson(jsonToDownload, filename);
      showSuccessMessage(`JSON downloaded as ${filename}`);
    } catch (err) {
      setError({ message: 'Failed to download JSON file' });
    }
  };

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInputJson(content);
      const result = validateJson(content);
      if (result.isValid) {
        showSuccessMessage(`File "${file.name}" loaded successfully!`);
        addToHistory(content, getJsonSize(content));
      }
    };
    reader.onerror = () => {
      setError({ message: 'Failed to read file' });
    };
    reader.readAsText(file);
  };

  const handleSample = () => {
    const sample = getSampleJson();
    setInputJson(sample);
    showSuccessMessage('Sample JSON loaded!');
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-2xl)' }}>
      {/* Header */}
      <header style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
          <FiCode size={40} style={{ color: 'var(--accent-primary)' }} />
          <h1 style={{ margin: 0 }}>JSON Formatter</h1>
        </div>
        <p style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Format, validate, and beautify JSON instantly. Free online tool with tree view, error detection, and more.
        </p>
      </header>

      {/* Toolbar */}
      <Toolbar
        onFormat={handleFormat}
        onMinify={handleMinify}
        onClear={handleClear}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onUpload={handleUpload}
        onSample={handleSample}
        isValidJson={isValidJson}
        disabled={isProcessing}
      />

      {/* Status Messages */}
      <ErrorDisplay error={error} success={success} />

      {/* Ad Slot 1: Below Toolbar (Leaderboard) */}
      <div style={{ margin: 'var(--spacing-lg) 0' }}>
        <AdBanner format="horizontal" adSlot="1234567890" />
      </div>

      {/* View Toggle */}
      <div style={{
        display: 'flex',
        gap: 'var(--spacing-sm)',
        marginBottom: 'var(--spacing-md)',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => setShowTreeView(false)}
          className={`btn btn-sm ${!showTreeView ? 'btn-primary' : 'btn-secondary'}`}
        >
          <FiCode size={16} />
          Editor View
        </button>
        <button
          onClick={() => setShowTreeView(true)}
          className={`btn btn-sm ${showTreeView ? 'btn-primary' : 'btn-secondary'}`}
          disabled={!isValidJson}
        >
          <FiGitBranch size={16} />
          Tree View
        </button>
      </div>

      {/* Editor Container */}
      <div className="editor-container">
        {!showTreeView ? (
          <>
            <JsonEditor
              value={inputJson}
              onChange={setInputJson}
              label="Input JSON"
              placeholder="Paste your JSON here..."
            />
            <JsonEditor
              value={outputJson}
              onChange={() => { }}
              label="Formatted Output"
              placeholder="Formatted JSON will appear here..."
              readOnly
            />
          </>
        ) : (
          <>
            <JsonEditor
              value={inputJson}
              onChange={setInputJson}
              label="Input JSON"
              placeholder="Paste your JSON here..."
            />
            <TreeView json={outputJson || inputJson} />
          </>
        )}
      </div>

      {/* Features Section */}
      <section style={{ marginTop: 'var(--spacing-2xl)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          Powerful JSON Tools
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--spacing-lg)'
        }}>
          <div className="card">
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--spacing-sm)' }}>
              ✨ Format & Beautify
            </h3>
            <p style={{ fontSize: 'var(--text-sm)' }}>
              Instantly format and beautify your JSON with proper indentation and structure.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--spacing-sm)' }}>
              🔍 Validate & Debug
            </h3>
            <p style={{ fontSize: 'var(--text-sm)' }}>
              Detect errors with precise line and column numbers for quick debugging.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--spacing-sm)' }}>
              🌳 Tree View
            </h3>
            <p style={{ fontSize: 'var(--text-sm)' }}>
              Visualize JSON structure with an interactive expandable tree view.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--spacing-sm)' }}>
              ⚡ Minify
            </h3>
            <p style={{ fontSize: 'var(--text-sm)' }}>
              Compress JSON by removing unnecessary whitespace for production use.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--spacing-sm)' }}>
              🌙 Dark Mode
            </h3>
            <p style={{ fontSize: 'var(--text-sm)' }}>
              Eye-friendly dark mode with syntax highlighting for comfortable coding.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--spacing-sm)' }}>
              💾 History
            </h3>
            <p style={{ fontSize: 'var(--text-sm)' }}>
              Automatic history saving to quickly access your recent JSON data.
            </p>
          </div>
        </div>
      </section>

      {/* Ad Slot 2: Between Sections (Medium Rectangle) */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: 'var(--spacing-2xl) 0' }}>
        <AdBanner format="rectangle" adSlot="0987654321" />
      </div>

      {/* SEO Content */}
      <article style={{ marginTop: 'var(--spacing-2xl)', maxWidth: '800px', margin: 'var(--spacing-2xl) auto 0' }}>
        <h2>What is JSON?</h2>
        <p>
          JSON (JavaScript Object Notation) is a lightweight data format used for data interchange.
          It's easy for humans to read and write, and easy for machines to parse and generate.
          JSON is language-independent and widely used in modern web applications, APIs, and configuration files.
        </p>

        <h2>Why Use a JSON Formatter?</h2>
        <p>
          A JSON formatter helps you organize and beautify JSON data, making it easier to read and debug.
          Our tool validates your JSON in real-time, highlights errors with exact line numbers, and provides
          multiple views including a tree structure for complex JSON objects. Whether you're a developer
          working with APIs or just need to validate JSON data, our formatter makes the process quick and easy.
        </p>

        <h2>Key Features</h2>
        <ul style={{ color: 'var(--text-secondary)', marginLeft: 'var(--spacing-xl)' }}>
          <li>Instant JSON formatting and beautification</li>
          <li>Real-time validation with error detection</li>
          <li>Interactive tree view for nested structures</li>
          <li>One-click minification for production</li>
          <li>Download formatted JSON files</li>
          <li>Copy to clipboard functionality</li>
          <li>Dark and light mode support</li>
          <li>No registration required - completely free</li>
          <li>Privacy-focused - all processing happens in your browser</li>
        </ul>
      </article>

      {/* Ad Slot 3: Before Footer (Horizontal Banner) */}
      <div style={{ margin: 'var(--spacing-2xl) 0' }}>
        <AdBanner format="auto" adSlot="1122334455" />
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: 'var(--spacing-2xl)',
        paddingTop: 'var(--spacing-xl)',
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center',
        color: 'var(--text-tertiary)',
        fontSize: 'var(--text-sm)'
      }}>
        <p>
          © 2024 JSON Formatter. All rights reserved. |
          <a href="#" style={{ color: 'var(--accent-primary)', marginLeft: '0.5rem' }}>Privacy Policy</a> |
          <a href="#" style={{ color: 'var(--accent-primary)', marginLeft: '0.5rem' }}>Terms of Service</a>
        </p>
        <p style={{ marginTop: 'var(--spacing-sm)' }}>
          Built with ❤️ using Next.js. All processing happens in your browser for maximum privacy.
        </p>
      </footer>
    </div>
  );
}
