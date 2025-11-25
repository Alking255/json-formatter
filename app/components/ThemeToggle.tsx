'use client';

import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { getSettings, updateSettings } from '../lib/storage';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const settings = getSettings();
        setTheme(settings.theme);
        document.documentElement.setAttribute('data-theme', settings.theme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        updateSettings({ theme: newTheme });
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-icon"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <FiMoon size={18} />
            ) : (
                <FiSun size={18} />
            )}
        </button>
    );
}
