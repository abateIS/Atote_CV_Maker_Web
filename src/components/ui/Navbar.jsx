import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Zap, Sun, Moon } from 'lucide-react';
import { useCV } from '../../context/CVContext';

export default function Navbar() {
    const { theme, toggleTheme } = useCV();
    const location = useLocation();
    const isLanding = location.pathname === '/';

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            backdropFilter: 'blur(20px)',
            opacity: 0.95,
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                    <div style={{
                        width: 36, height: 36,
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        borderRadius: 10,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <FileText size={18} color="#fff" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
                        Atote<span className="gradient-text">CV Maker</span>
                    </span>
                </Link>

                {/* Nav Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                        onClick={toggleTheme}
                        style={{
                            background: 'none', border: '1px solid var(--border-default)',
                            color: 'var(--text-secondary)', padding: '8px', borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginRight: 8, transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-default)'}
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {!isLanding && (
                        <Link to="/" style={{
                            color: 'var(--text-secondary)', textDecoration: 'none',
                            padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                            fontSize: 14, fontWeight: 500,
                            transition: 'color var(--transition-fast)',
                        }}
                            onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                        >
                            Home
                        </Link>
                    )}
                    <Link to="/templates" style={{
                        color: 'var(--text-secondary)', textDecoration: 'none',
                        padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                        fontSize: 14, fontWeight: 500,
                        transition: 'color var(--transition-fast)',
                    }}
                        onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                    >
                        Templates
                    </Link>
                    <Link to="/editor" style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                        color: '#fff', textDecoration: 'none',
                        padding: '8px 20px', borderRadius: 'var(--radius-full)',
                        fontSize: 14, fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.5)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(99,102,241,0.4)'; }}
                    >
                        <Zap size={14} />
                        Build CV
                    </Link>
                </div>
            </div>
        </nav>
    );
}
