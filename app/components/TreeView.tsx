'use client';

import { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronDown, FiCopy } from 'react-icons/fi';
import { copyToClipboard } from '../lib/jsonUtils';

interface TreeNodeProps {
    data: any;
    name: string;
    path: string;
    isLast?: boolean;
}

function TreeNode({ data, name, path, isLast = false }: TreeNodeProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [copied, setCopied] = useState(false);

    const isObject = typeof data === 'object' && data !== null && !Array.isArray(data);
    const isArray = Array.isArray(data);
    const isExpandable = isObject || isArray;

    const getValueType = (value: any): string => {
        if (value === null) return 'null';
        if (Array.isArray(value)) return 'array';
        return typeof value;
    };

    const getValueColor = (value: any): string => {
        const type = getValueType(value);
        switch (type) {
            case 'string': return 'var(--success)';
            case 'number': return 'var(--warning)';
            case 'boolean': return 'var(--accent-primary)';
            case 'null': return 'var(--text-tertiary)';
            default: return 'var(--text-primary)';
        }
    };

    const renderValue = (value: any): string => {
        if (typeof value === 'string') return `"${value}"`;
        if (value === null) return 'null';
        if (typeof value === 'boolean') return value.toString();
        if (typeof value === 'number') return value.toString();
        return '';
    };

    const handleCopyPath = async () => {
        await copyToClipboard(path);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const entries = isObject
        ? Object.entries(data)
        : isArray
            ? data.map((item: any, index: number) => [index.toString(), item])
            : [];

    return (
        <div style={{ marginLeft: '1rem' }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.25rem 0',
                    cursor: isExpandable ? 'pointer' : 'default',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'background var(--transition-fast)'
                }}
                onClick={() => isExpandable && setIsExpanded(!isExpanded)}
                onMouseEnter={(e) => {
                    if (isExpandable) {
                        e.currentTarget.style.background = 'var(--bg-tertiary)';
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                }}
            >
                {isExpandable && (
                    <span style={{ color: 'var(--text-tertiary)', width: '1rem' }}>
                        {isExpanded ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                    </span>
                )}
                {!isExpandable && <span style={{ width: '1rem' }} />}

                <span style={{ color: 'var(--info)', fontWeight: 600 }}>
                    {name}:
                </span>

                {!isExpandable && (
                    <span style={{ color: getValueColor(data) }}>
                        {renderValue(data)}
                    </span>
                )}

                {isExpandable && (
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                        {isArray ? `Array(${data.length})` : `Object(${entries.length})`}
                    </span>
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleCopyPath();
                    }}
                    style={{
                        opacity: 0.5,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        color: copied ? 'var(--success)' : 'var(--text-tertiary)',
                        transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.5';
                    }}
                    title={copied ? 'Copied!' : 'Copy path'}
                >
                    <FiCopy size={12} />
                </button>
            </div>

            {isExpandable && isExpanded && (
                <div>
                    {entries.map(([key, value], index) => (
                        <TreeNode
                            key={key}
                            data={value}
                            name={key}
                            path={`${path}.${key}`}
                            isLast={index === entries.length - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

interface TreeViewProps {
    json: string;
}

export default function TreeView({ json }: TreeViewProps) {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        try {
            if (json.trim()) {
                const parsed = JSON.parse(json);
                setData(parsed);
                setError('');
            } else {
                setData(null);
            }
        } catch (err) {
            setError('Invalid JSON');
            setData(null);
        }
    }, [json]);

    if (error) {
        return (
            <div className="editor-panel">
                <div className="editor-header">Tree View</div>
                <div className="editor-content" style={{ padding: 'var(--spacing-md)' }}>
                    <p style={{ color: 'var(--error)' }}>{error}</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="editor-panel">
                <div className="editor-header">Tree View</div>
                <div className="editor-content" style={{ padding: 'var(--spacing-md)' }}>
                    <p style={{ color: 'var(--text-tertiary)' }}>
                        Enter valid JSON to see tree view
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="editor-panel">
            <div className="editor-header">Tree View</div>
            <div className="editor-content" style={{ padding: 'var(--spacing-md)' }}>
                <TreeNode data={data} name="root" path="root" />
            </div>
        </div>
    );
}
