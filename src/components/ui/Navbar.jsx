import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Zap, Sun, Moon, Menu, X } from 'lucide-react';
import { useCV } from '../../context/CVContext';

export default function Navbar() {
    const { theme, toggleTheme } = useCV();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isLanding = location.pathname === '/';

    const NavLinks = () => (
        <>
            {!isLanding && (
                <Link to="/" onClick={() => setIsOpen(false)} style={{
                    color: 'var(--text-secondary)', textDecoration: 'none',
                    padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                    fontSize: 14, fontWeight: 500,
                    transition: 'color 0.2s',
                }}>Home</Link>
            )}
            <Link to="/templates" onClick={() => setIsOpen(false)} style={{
                color: 'var(--text-secondary)', textDecoration: 'none',
                padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                fontSize: 14, fontWeight: 500,
                transition: 'color 0.2s',
            }}>Templates</Link>
            <Link to="/editor" onClick={() => setIsOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                color: '#fff', textDecoration: 'none',
                padding: '8px 20px', borderRadius: 'var(--radius-full)',
                fontSize: 14, fontWeight: 600,
                boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
                <Zap size={14} /> Build CV
            </Link>
        </>
    );

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            backdropFilter: 'blur(20px)',
            opacity: 0.98,
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                    <div style={{
                        width: 34, height: 34,
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <FileText size={16} color="#fff" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 'clamp(16px, 4vw, 20px)', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
                        Atote<span className="gradient-text hide-mobile">CV Maker</span><span className="gradient-text show-mobile">CV</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hide-mobile" style={{ alignItems: 'center', gap: 8 }}>
                    <button
                        onClick={toggleTheme}
                        style={{
                            background: 'none', border: '1px solid var(--border-default)',
                            color: 'var(--text-secondary)', padding: '8px', borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginRight: 8,
                        }}
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <NavLinks />
                </div>

                {/* Mobile Controls */}
                <div className="show-mobile" style={{ alignItems: 'center', gap: 12 }}>
                    <button
                        onClick={toggleTheme}
                        style={{
                            background: 'none', border: 'none', color: 'var(--text-secondary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            background: 'none', border: 'none', color: 'var(--text-primary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div style={{
                    position: 'absolute', top: 64, left: 0, right: 0,
                    background: 'var(--bg-surface)',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex', flexDirection: 'column', padding: '24px 16px', gap: 16,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}>
                    <NavLinks />
                </div>
            )}
        </nav>
    );
}
