'use client';

import { useState } from 'react';
import {
    FiCode,
    FiCopy,
    FiDownload,
    FiMinimize2,
    FiTrash2,
    FiUpload,
    FiFileText
} from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

interface ToolbarProps {
    onFormat: () => void;
    onMinify: () => void;
    onClear: () => void;
    onCopy: () => void;
    onDownload: () => void;
    onUpload: (file: File) => void;
    onSample: () => void;
    isValidJson: boolean;
    disabled?: boolean;
}

type ActiveAction = 'format' | 'minify' | 'upload' | 'download' | 'copy' | null;

export default function Toolbar({
    onFormat,
    onMinify,
    onClear,
    onCopy,
    onDownload,
    onUpload,
    onSample,
    isValidJson,
    disabled = false
}: ToolbarProps) {
    const [activeAction, setActiveAction] = useState<ActiveAction>('format');

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setActiveAction('upload');
            onUpload(file);
        }
        // Reset input so same file can be uploaded again
        e.target.value = '';
    };

    const handleFormat = () => {
        setActiveAction('format');
        onFormat();
    };

    const handleMinify = () => {
        setActiveAction('minify');
        onMinify();
    };

    const handleDownload = () => {
        setActiveAction('download');
        onDownload();
    };

    const handleCopy = () => {
        setActiveAction('copy');
        onCopy();
    };

    return (
        <div className="toolbar">
            {/* Primary Actions */}
            <button
                onClick={handleFormat}
                className={`btn ${activeAction === 'format' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                disabled={disabled || !isValidJson}
                title="Format JSON (Ctrl+Shift+F)"
            >
                <FiCode size={16} />
                Format
            </button>

            <button
                onClick={handleMinify}
                className={`btn ${activeAction === 'minify' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                disabled={disabled || !isValidJson}
                title="Minify JSON"
            >
                <FiMinimize2 size={16} />
                Minify
            </button>

            <div className="toolbar-divider" />

            {/* File Operations */}
            <label
                className={`btn ${activeAction === 'upload' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                title="Upload JSON file"
            >
                <FiUpload size={16} />
                Upload
                <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    disabled={disabled}
                />
            </label>

            <button
                onClick={handleDownload}
                className={`btn ${activeAction === 'download' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                disabled={disabled || !isValidJson}
                title="Download as JSON file"
            >
                <FiDownload size={16} />
                Download
            </button>

            <button
                onClick={handleCopy}
                className={`btn ${activeAction === 'copy' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                disabled={disabled || !isValidJson}
                title="Copy to clipboard"
            >
                <FiCopy size={16} />
                Copy
            </button>

            <div className="toolbar-divider" />

            {/* Utility Actions */}
            <button
                onClick={onSample}
                className="btn btn-ghost btn-sm"
                disabled={disabled}
                title="Load sample JSON"
            >
                <FiFileText size={16} />
                Sample
            </button>

            <button
                onClick={onClear}
                className="btn btn-ghost btn-sm"
                disabled={disabled}
                title="Clear editor"
            >
                <FiTrash2 size={16} />
                Clear
            </button>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Theme Toggle */}
            <ThemeToggle />
        </div>
    );
}
