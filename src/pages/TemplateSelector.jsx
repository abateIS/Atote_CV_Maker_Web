import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/ui/Navbar';
import { useCV } from '../context/CVContext';

const TEMPLATES = [
    {
        id: 'modern',
        name: 'Modern Minimalist',
        description: 'Clean two-column layout with a bold accent sidebar. Perfect for tech & design roles.',
        tags: ['Most Popular', 'ATS Friendly'],
        colors: ['#6366f1', '#818cf8'],
        accentColor: '#6366f1',
    },
    {
        id: 'classic',
        name: 'Classic Professional',
        description: 'Timeless single-column format with elegant typography. Trusted by corporate professionals.',
        tags: ['Professional', 'Traditional'],
        colors: ['#0ea5e9', '#38bdf8'],
        accentColor: '#0ea5e9',
    },
    {
        id: 'creative',
        name: 'Creative Bold',
        description: 'Vibrant header with icon-driven sections. Make a powerful first impression.',
        tags: ['Creative', 'Stand Out'],
        colors: ['#f59e0b', '#fbbf24'],
        accentColor: '#f59e0b',
    },
    {
        id: 'executive',
        name: 'Executive Corporate',
        description: 'Dark navy header with gold accents. The power layout for senior leaders.',
        tags: ['Executive', 'C-Suite'],
        colors: ['#1e40af', '#3b82f6'],
        accentColor: '#1e40af',
    },
    {
        id: 'tech',
        name: 'Tech Developer',
        description: 'Terminal-inspired with monospace accents and skill badges. Ideal for engineers.',
        tags: ['Developer', 'Tech Roles'],
        colors: ['#10b981', '#34d399'],
        accentColor: '#10b981',
    },
];

function TemplateMiniPreview({ template, selected }) {
    const [c1, c2] = template.colors;

    const layouts = {
        modern: (
            <div style={{ display: 'flex', height: '100%', gap: 0 }}>
                <div style={{ width: '32%', background: `linear-gradient(180deg, ${c1}, ${c2})`, padding: 6, flexShrink: 0 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', margin: '4px auto 6px' }} />
                    {[70, 85, 60, 75, 90, 65].map((w, i) => (
                        <div key={i} style={{ height: 2, width: `${w}%`, background: 'rgba(255,255,255,0.4)', borderRadius: 4, marginBottom: 4 }} />
                    ))}
                </div>
                <div style={{ flex: 1, padding: 6 }}>
                    <div style={{ height: 3, background: c1, width: '70%', borderRadius: 4, marginBottom: 4 }} />
                    <div style={{ height: 2, background: '#e2e8f0', width: '50%', borderRadius: 4, marginBottom: 8 }} />
                    {[100, 80, 95, 70, 85, 60, 75, 65, 80].map((w, i) => (
                        <div key={i} style={{ height: 2, width: `${w}%`, background: i % 3 === 0 ? c1 + '66' : '#e2e8f0', borderRadius: 4, marginBottom: 3 }} />
                    ))}
                </div>
            </div>
        ),
        classic: (
            <div style={{ padding: 8 }}>
                <div style={{ textAlign: 'center', borderBottom: `2px solid ${c1}`, paddingBottom: 6, marginBottom: 6 }}>
                    <div style={{ height: 4, background: c1, width: '60%', margin: '0 auto 3px', borderRadius: 4 }} />
                    <div style={{ height: 2, background: '#e2e8f0', width: '45%', margin: '0 auto', borderRadius: 4 }} />
                </div>
                {[100, 75, 85, 60, 90, 70, 80, 65, 75, 85, 60].map((w, i) => (
                    <div key={i} style={{ height: 2, width: `${w}%`, background: i % 4 === 0 ? c1 + '88' : '#e2e8f0', borderRadius: 4, marginBottom: 3 }} />
                ))}
            </div>
        ),
        creative: (
            <div style={{ height: '100%' }}>
                <div style={{ height: 36, background: `linear-gradient(135deg, ${c1}, ${c2})`, padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                    <div>
                        <div style={{ height: 3, width: 40, background: '#fff', borderRadius: 4, marginBottom: 3 }} />
                        <div style={{ height: 2, width: 30, background: 'rgba(255,255,255,0.6)', borderRadius: 4 }} />
                    </div>
                </div>
                <div style={{ padding: '6px 8px' }}>
                    {[100, 80, 90, 65, 85, 70, 60, 80, 75].map((w, i) => (
                        <div key={i} style={{ height: 2, width: `${w}%`, background: i % 3 === 0 ? c1 + '66' : '#e2e8f0', borderRadius: 4, marginBottom: 3 }} />
                    ))}
                </div>
            </div>
        ),
        executive: (
            <div style={{ height: '100%' }}>
                <div style={{ height: 44, background: `linear-gradient(135deg, #0f172a, ${c1})`, padding: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ height: 4, width: '55%', background: '#fbbf24', borderRadius: 4, marginBottom: 4 }} />
                    <div style={{ height: 2, width: '40%', background: 'rgba(255,255,255,0.4)', borderRadius: 4 }} />
                </div>
                <div style={{ padding: '6px 8px' }}>
                    {[100, 75, 85, 65, 90, 70, 60, 80, 75, 85].map((w, i) => (
                        <div key={i} style={{ height: 2, width: `${w}%`, background: i % 4 === 0 ? '#fbbf24' + '88' : '#e2e8f0', borderRadius: 4, marginBottom: 3 }} />
                    ))}
                </div>
            </div>
        ),
        tech: (
            <div style={{ height: '100%', background: '#0a0a14' }}>
                <div style={{ padding: 6, borderBottom: `1px solid ${c1}33` }}>
                    <div style={{ height: 3, width: '65%', background: c1, borderRadius: 4, marginBottom: 3 }} />
                    <div style={{ height: 2, width: '45%', background: c2 + '80', borderRadius: 4 }} />
                </div>
                <div style={{ padding: 6 }}>
                    {[100, 80, 70, 90, 60, 85, 75, 65, 80].map((w, i) => (
                        <div key={i} style={{ height: 2, width: `${w}%`, background: i % 3 === 0 ? c1 + '99' : '#334155', borderRadius: 4, marginBottom: 3 }} />
                    ))}
                </div>
            </div>
        ),
    };

    return (
        <div style={{
            width: '100%', height: 180,
            background: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: selected ? `0 0 0 3px ${template.accentColor}, 0 12px 40px rgba(0,0,0,0.4)` : '0 4px 20px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
        }}>
            {layouts[template.id]}
        </div>
    );
}

export default function TemplateSelector() {
    const navigate = useNavigate();
    const { selectedTemplate, setSelectedTemplate, setAccentColor } = useCV();

    const handleSelect = (template) => {
        setSelectedTemplate(template.id);
        setAccentColor(template.accentColor);
    };

    const handleContinue = () => {
        const t = TEMPLATES.find(t => t.id === selectedTemplate);
        if (t) setAccentColor(t.accentColor);
        navigate('/editor');
    };

    return (
        <div style={{ minHeight: '100vh', paddingTop: 80 }}>
            <Navbar />

            <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: 48 }}
                >
                    <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-1px', color: 'var(--text-primary)' }}>
                        Choose Your <span className="gradient-text">Template</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 18 }}>
                        Pick a layout that best represents your professional journey.
                    </p>
                </motion.div>

                {/* Template grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 48 }}>
                    {TEMPLATES.map((template, i) => {
                        const isSelected = selectedTemplate === template.id;
                        return (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -6 }}
                                onClick={() => handleSelect(template)}
                                style={{
                                    cursor: 'pointer',
                                    background: isSelected ? `linear-gradient(135deg, ${template.accentColor}15, ${template.accentColor}08)` : 'var(--bg-card)',
                                    border: `2px solid ${isSelected ? template.accentColor : 'var(--border-subtle)'}`,
                                    borderRadius: 'var(--radius-lg)',
                                    padding: 20,
                                    transition: 'all 0.25s ease',
                                }}
                            >
                                <TemplateMiniPreview template={template} selected={isSelected} />

                                <div style={{ marginTop: 16 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <h3 style={{ fontWeight: 700, fontSize: 16 }}>{template.name}</h3>
                                        {isSelected && (
                                            <div style={{
                                                width: 24, height: 24, borderRadius: '50%',
                                                background: template.accentColor,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <Check size={14} color="#fff" />
                                            </div>
                                        )}
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                                        {template.description}
                                    </p>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {template.tags.map((tag) => (
                                            <span key={tag} style={{
                                                fontSize: 11, fontWeight: 600,
                                                background: `${template.accentColor}18`,
                                                color: template.accentColor,
                                                border: `1px solid ${template.accentColor}30`,
                                                padding: '2px 8px', borderRadius: 'var(--radius-full)',
                                                letterSpacing: '0.3px',
                                            }}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Continue button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ textAlign: 'center' }}
                >
                    <button
                        onClick={handleContinue}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 10,
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                            color: '#fff', border: 'none', cursor: 'pointer',
                            padding: '16px 40px', borderRadius: 'var(--radius-full)',
                            fontSize: 17, fontWeight: 700,
                            boxShadow: '0 8px 28px rgba(99,102,241,0.4)',
                            transition: 'all 0.25s ease',
                            fontFamily: 'var(--font-sans)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.55)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(99,102,241,0.4)'; }}
                    >
                        Use This Template <ArrowRight size={18} />
                    </button>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 16 }}>
                        Selected: <strong style={{ color: 'var(--text-secondary)' }}>{TEMPLATES.find(t => t.id === selectedTemplate)?.name}</strong>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
