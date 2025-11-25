'use client';

import { useRef, useEffect } from 'react';

interface JsonEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    readOnly?: boolean;
    label: string;
}

export default function JsonEditor({
    value,
    onChange,
    placeholder = 'Enter JSON here...',
    readOnly = false,
    label
}: JsonEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current && !readOnly) {
            // Auto-resize textarea
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [value, readOnly]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Tab key for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            const newValue = value.substring(0, start) + '  ' + value.substring(end);
            onChange(newValue);

            // Set cursor position after the inserted tab
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
                }
            }, 0);
        }

        // Ctrl+Shift+F for format (handled by parent, but we can prevent default)
        if (e.ctrlKey && e.shiftKey && e.key === 'F') {
            e.preventDefault();
        }
    };

    return (
        <div className="editor-panel">
            <div className="editor-header">
                <span>{label}</span>
                {value && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        {value.split('\n').length} lines
                    </span>
                )}
            </div>
            <div className="editor-content">
                <textarea
                    ref={textareaRef}
                    className="code-editor"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                />
            </div>
        </div>
    );
}
