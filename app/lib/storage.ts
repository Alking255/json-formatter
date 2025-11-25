// Local storage management for history, favorites, and settings

export interface HistoryEntry {
    id: string;
    content: string;
    timestamp: number;
    size: string;
}

export interface Favorite {
    id: string;
    name: string;
    content: string;
    timestamp: number;
}

export interface UserSettings {
    theme: 'light' | 'dark';
    fontSize: number;
    autoFormat: boolean;
    indentSize: number;
}

const STORAGE_KEYS = {
    HISTORY: 'json_formatter_history',
    FAVORITES: 'json_formatter_favorites',
    SETTINGS: 'json_formatter_settings'
} as const;

const MAX_HISTORY_ITEMS = 50;
const MAX_FAVORITES = 100;

/**
 * Check if localStorage is available
 */
function isStorageAvailable(): boolean {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch {
        return false;
    }
}

/**
 * Save to localStorage safely
 */
function saveToStorage<T>(key: string, data: T): boolean {
    if (!isStorageAvailable()) return false;
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
        return false;
    }
}

/**
 * Load from localStorage safely
 */
function loadFromStorage<T>(key: string, defaultValue: T): T {
    if (!isStorageAvailable()) return defaultValue;
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
        return defaultValue;
    }
}

// ========================================
// HISTORY MANAGEMENT
// ========================================

/**
 * Add entry to history
 */
export function addToHistory(content: string, size: string): boolean {
    const history = getHistory();
    const newEntry: HistoryEntry = {
        id: Date.now().toString(),
        content,
        timestamp: Date.now(),
        size
    };

    // Add to beginning and limit size
    history.unshift(newEntry);
    if (history.length > MAX_HISTORY_ITEMS) {
        history.pop();
    }

    return saveToStorage(STORAGE_KEYS.HISTORY, history);
}

/**
 * Get all history entries
 */
export function getHistory(): HistoryEntry[] {
    return loadFromStorage<HistoryEntry[]>(STORAGE_KEYS.HISTORY, []);
}

/**
 * Get single history entry by ID
 */
export function getHistoryEntry(id: string): HistoryEntry | null {
    const history = getHistory();
    return history.find(entry => entry.id === id) || null;
}

/**
 * Delete history entry
 */
export function deleteHistoryEntry(id: string): boolean {
    const history = getHistory().filter(entry => entry.id !== id);
    return saveToStorage(STORAGE_KEYS.HISTORY, history);
}

/**
 * Clear all history
 */
export function clearHistory(): boolean {
    return saveToStorage(STORAGE_KEYS.HISTORY, []);
}

// ========================================
// FAVORITES MANAGEMENT
// ========================================

/**
 * Add to favorites
 */
export function addToFavorites(name: string, content: string): boolean {
    const favorites = getFavorites();

    if (favorites.length >= MAX_FAVORITES) {
        console.warn('Maximum favorites limit reached');
        return false;
    }

    const newFavorite: Favorite = {
        id: Date.now().toString(),
        name,
        content,
        timestamp: Date.now()
    };

    favorites.unshift(newFavorite);
    return saveToStorage(STORAGE_KEYS.FAVORITES, favorites);
}

/**
 * Get all favorites
 */
export function getFavorites(): Favorite[] {
    return loadFromStorage<Favorite[]>(STORAGE_KEYS.FAVORITES, []);
}

/**
 * Get single favorite by ID
 */
export function getFavorite(id: string): Favorite | null {
    const favorites = getFavorites();
    return favorites.find(fav => fav.id === id) || null;
}

/**
 * Update favorite
 */
export function updateFavorite(id: string, name: string, content: string): boolean {
    const favorites = getFavorites().map(fav =>
        fav.id === id ? { ...fav, name, content, timestamp: Date.now() } : fav
    );
    return saveToStorage(STORAGE_KEYS.FAVORITES, favorites);
}

/**
 * Delete favorite
 */
export function deleteFavorite(id: string): boolean {
    const favorites = getFavorites().filter(fav => fav.id !== id);
    return saveToStorage(STORAGE_KEYS.FAVORITES, favorites);
}

/**
 * Clear all favorites
 */
export function clearFavorites(): boolean {
    return saveToStorage(STORAGE_KEYS.FAVORITES, []);
}

// ========================================
// SETTINGS MANAGEMENT
// ========================================

const DEFAULT_SETTINGS: UserSettings = {
    theme: 'dark',
    fontSize: 14,
    autoFormat: false,
    indentSize: 2
};

/**
 * Get user settings
 */
export function getSettings(): UserSettings {
    return loadFromStorage<UserSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

/**
 * Update user settings
 */
export function updateSettings(settings: Partial<UserSettings>): boolean {
    const currentSettings = getSettings();
    const newSettings = { ...currentSettings, ...settings };
    return saveToStorage(STORAGE_KEYS.SETTINGS, newSettings);
}

/**
 * Reset settings to default
 */
export function resetSettings(): boolean {
    return saveToStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

/**
 * Get storage usage info
 */
export function getStorageInfo(): {
    historyCount: number;
    favoritesCount: number;
    isAvailable: boolean;
} {
    return {
        historyCount: getHistory().length,
        favoritesCount: getFavorites().length,
        isAvailable: isStorageAvailable()
    };
}
