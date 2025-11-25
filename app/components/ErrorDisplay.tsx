'use client';

import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { JsonError } from '../lib/jsonUtils';

interface ErrorDisplayProps {
    error?: JsonError;
    success?: string;
}

export default function ErrorDisplay({ error, success }: ErrorDisplayProps) {
    if (success) {
        return (
            <div className="success-banner animate-slide-up">
                <FiCheckCircle size={20} />
                <div>
                    <strong>Success!</strong>
                    <p style={{ margin: 0, fontSize: '0.875rem' }}>{success}</p>
                </div>
            </div>
        );
    }

    if (!error) return null;

    return (
        <div className="error-banner animate-slide-up">
            <FiAlertCircle size={20} />
            <div>
                <strong>JSON Error</strong>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                    {error.message}
                    {error.line && (
                        <> at line {error.line}, column {error.column}</>
                    )}
                </p>
            </div>
        </div>
    );
}
