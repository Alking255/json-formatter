// JSON utility functions for formatting, validation, and processing

export interface JsonError {
    message: string;
    line?: number;
    column?: number;
}

export interface ValidationResult {
    isValid: boolean;
    error?: JsonError;
    formatted?: string;
}

/**
 * Safely parse JSON and return detailed error information
 */
export function parseJsonSafe(jsonString: string): ValidationResult {
    try {
        const parsed = JSON.parse(jsonString);
        return {
            isValid: true,
            formatted: JSON.stringify(parsed, null, 2)
        };
    } catch (error) {
        if (error instanceof SyntaxError) {
            // Extract line and column from error message
            const match = error.message.match(/position (\d+)/);
            const position = match ? parseInt(match[1]) : 0;
            const lines = jsonString.substring(0, position).split('\n');
            const line = lines.length;
            const column = lines[lines.length - 1].length + 1;

            return {
                isValid: false,
                error: {
                    message: error.message,
                    line,
                    column
                }
            };
        }
        return {
            isValid: false,
            error: {
                message: 'Unknown parsing error'
            }
        };
    }
}

/**
 * Format JSON with custom indentation
 */
export function formatJson(jsonString: string, spaces: number = 2): string {
    try {
        const parsed = JSON.parse(jsonString);
        return JSON.stringify(parsed, null, spaces);
    } catch (error) {
        throw new Error('Invalid JSON: Cannot format');
    }
}

/**
 * Minify JSON by removing all whitespace
 */
export function minifyJson(jsonString: string): string {
    try {
        const parsed = JSON.parse(jsonString);
        return JSON.stringify(parsed);
    } catch (error) {
        throw new Error('Invalid JSON: Cannot minify');
    }
}

/**
 * Validate JSON and return comprehensive result
 */
export function validateJson(jsonString: string): ValidationResult {
    if (!jsonString || jsonString.trim() === '') {
        return {
            isValid: false,
            error: {
                message: 'JSON string is empty'
            }
        };
    }

    return parseJsonSafe(jsonString);
}

/**
 * Download JSON as a file
 */
export function downloadJson(jsonString: string, filename: string = 'data.json'): void {
    try {
        // Ensure filename has .json extension
        if (!filename.toLowerCase().endsWith('.json')) {
            filename += '.json';
        }

        // Create data URI for download
        const jsonData = encodeURIComponent(jsonString);
        const dataUri = `data:application/json;charset=utf-8,${jsonData}`;

        const link = document.createElement('a');
        link.setAttribute('href', dataUri);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();

        // Cleanup after short delay
        setTimeout(() => {
            document.body.removeChild(link);
        }, 100);

    } catch (error) {
        throw new Error('Failed to download JSON file');
    }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (error) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    } catch (error) {
        return false;
    }
}

/**
 * Get JSON file size in human-readable format
 */
export function getJsonSize(jsonString: string): string {
    const bytes = new Blob([jsonString]).size;
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * Count JSON lines
 */
export function countJsonLines(jsonString: string): number {
    return jsonString.split('\n').length;
}

/**
 * Escape special characters in JSON
 */
export function escapeJson(jsonString: string): string {
    return jsonString
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
}

/**
 * Generate sample JSON for testing
 */
export function getSampleJson(): string {
    return JSON.stringify({
        "name": "JSON Formatter",
        "version": "1.0.0",
        "description": "A powerful tool for formatting, validating, and beautifying JSON data",
        "features": [
            "Format & Beautify",
            "Validate & Debug",
            "Minify",
            "Tree View",
            "Dark Mode"
        ],
        "settings": {
            "theme": "dark",
            "fontSize": 14,
            "autoFormat": true
        },
        "stats": {
            "users": 10000,
            "requests": 1500000,
            "uptime": 99.9
        },
        "active": true,
        "metadata": null
    }, null, 2);
}

/**
 * Convert JSON to TypeScript interface
 */
export function jsonToTypeScript(jsonString: string, interfaceName: string = 'Root'): string {
    try {
        const obj = JSON.parse(jsonString);
        return generateInterface(obj, interfaceName);
    } catch (error) {
        throw new Error('Invalid JSON: Cannot generate TypeScript interface');
    }
}

function generateInterface(obj: any, name: string, indent: number = 0): string {
    const indentStr = '  '.repeat(indent);
    let result = `${indentStr}interface ${name} {\n`;

    for (const [key, value] of Object.entries(obj)) {
        const type = getTypeScriptType(value);
        result += `${indentStr}  ${key}: ${type};\n`;
    }

    result += `${indentStr}}`;
    return result;
}

function getTypeScriptType(value: any): string {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
        if (value.length === 0) return 'any[]';
        return `${getTypeScriptType(value[0])}[]`;
    }
    if (typeof value === 'object') {
        return '{\n' + Object.entries(value)
            .map(([k, v]) => `    ${k}: ${getTypeScriptType(v)};`)
            .join('\n') + '\n  }';
    }
    return typeof value;
}
