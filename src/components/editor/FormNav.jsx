import React from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function FormNav({ onNext, onBack, isLast, onExport, nextLabel }) {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: onBack ? 'space-between' : 'flex-end', 
            marginTop: 40,
            paddingTop: 24,
            borderTop: '1px solid var(--border-subtle)',
            gap: 12
        }}>
            {onBack && (
                <button
                    onClick={onBack}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: 'transparent', color: 'var(--text-secondary)',
                        border: '1px solid var(--border-default)', padding: '10px 20px',
                        borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600,
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                    <ArrowLeft size={16} /> Previous
                </button>
            )}

            {isLast ? (
                <button
                    onClick={onExport}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: 'var(--color-success)', color: '#fff',
                        border: 'none', padding: '10px 24px',
                        borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(16,185,129,0.2)'
                    }}
                >
                    Finish & Export <CheckCircle2 size={16} />
                </button>
            ) : (
                <button
                    onClick={onNext}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: 'var(--color-primary)', color: '#fff',
                        border: 'none', padding: '10px 24px',
                        borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(99,102,241,0.2)'
                    }}
                >
                    {nextLabel || 'Continue'} <ArrowRight size={16} />
                </button>
            )}
        </div>
    );
}
