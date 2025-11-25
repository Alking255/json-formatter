'use client';

import { useEffect } from 'react';

interface AdBannerProps {
    /** Ad slot ID from Google AdSense */
    adSlot?: string;
    /** Ad format: 'horizontal', 'vertical', 'rectangle', 'auto' */
    format?: 'horizontal' | 'vertical' | 'rectangle' | 'auto';
    /** Custom width for the ad container */
    width?: string;
    /** Custom height for the ad container */
    height?: string;
}

/**
 * Google AdSense Ad Banner Component
 * 
 * Usage:
 * <AdBanner format="horizontal" adSlot="YOUR_AD_SLOT_ID" />
 */
export default function AdBanner({
    adSlot = '0000000000', // Replace with your actual ad slot
    format = 'auto',
    width,
    height
}: AdBannerProps) {

    useEffect(() => {
        // Load AdSense script only once
        if (typeof window !== 'undefined' && !(window as any).adsbygoogle?.loaded) {
            try {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            } catch (error) {
                console.error('AdSense error:', error);
            }
        }
    }, []);

    // Don't show ads in development
    if (process.env.NODE_ENV === 'development') {
        return (
            <div
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    ...getAdDimensions(format, width, height)
                }}
            >
                📢 Ad Space ({format}) - Will show in production
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'var(--spacing-md) 0',
                ...getAdDimensions(format, width, height)
            }}
        >
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                    ...getAdDimensions(format, width, height)
                }}
                data-ad-client="ca-pub-XXXXXXXXXX" // Replace with your AdSense publisher ID
                data-ad-slot={adSlot}
                data-ad-format={format === 'auto' ? 'auto' : undefined}
                data-full-width-responsive="true"
            />
        </div>
    );
}

/**
 * Get ad dimensions based on format
 */
function getAdDimensions(
    format: string,
    customWidth?: string,
    customHeight?: string
): React.CSSProperties {
    if (customWidth || customHeight) {
        return {
            width: customWidth || 'auto',
            height: customHeight || 'auto'
        };
    }

    switch (format) {
        case 'horizontal':
            return { width: '728px', height: '90px', maxWidth: '100%' };
        case 'vertical':
            return { width: '160px', height: '600px' };
        case 'rectangle':
            return { width: '300px', height: '250px' };
        case 'auto':
        default:
            return { width: '100%', minHeight: '90px' };
    }
}
