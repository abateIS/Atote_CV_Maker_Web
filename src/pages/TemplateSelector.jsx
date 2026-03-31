import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/ui/Navbar';
import { useCV } from '../context/CVContext';
import { ModernTemplate, ClassicTemplate, CreativeTemplate, ExecutiveTemplate, TechTemplate } from '../templates/Templates';

const TEMPLATES = [
    {
        id: 'modern',
        name: 'Modern Minimalist',
        description: 'Clean two-column layout with a bold accent sidebar. Perfect for tech & design roles.',
        tags: ['Most Popular', 'ATS Friendly'],
        accentColor: '#6366f1',
    },
    {
        id: 'classic',
        name: 'Classic Professional',
        description: 'Timeless single-column format with elegant typography. Trusted by corporate professionals.',
        tags: ['Professional', 'Traditional'],
        accentColor: '#0ea5e9',
    },
    {
        id: 'creative',
        name: 'Creative Bold',
        description: 'Vibrant header with icon-driven sections. Make a powerful first impression.',
        tags: ['Creative', 'Stand Out'],
        accentColor: '#f59e0b',
    },
    {
        id: 'executive',
        name: 'Executive Corporate',
        description: 'Dark navy header with gold accents. The power layout for senior leaders.',
        tags: ['Executive', 'C-Suite'],
        accentColor: '#1e40af',
    },
    {
        id: 'tech',
        name: 'Tech Developer',
        description: 'Terminal-inspired with monospace accents and skill badges. Ideal for engineers.',
        tags: ['Developer', 'Tech Roles'],
        accentColor: '#10b981',
    },
];

const SAMPLE_DATA = {
    personalInfo: {
        firstName: 'Abebe',
        lastName: 'Abebe',
        title: 'Senior Software Engineer',
        email: 'abebe.abebe@example.et',
        phone: '+251 911 00 11 22',
        location: 'Addis Ababa, Ethiopia',
        linkedin: 'linkedin.com/in/abebeabebe',
        github: 'github.com/abebeabebe',
        website: 'abebeabebe.et',
        photo: null,
    },
    summary: 'Experienced Software Engineer based in Addis Ababa, passionate about building scalable solutions for Ethiopia’s digital economy. Specialized in React, Node.js, and cloud architecture.',
    experience: [
        {
            id: '1',
            position: 'Lead Developer',
            company: 'Ethio Telecom',
            location: 'Addis Ababa',
            startDate: '2020-01',
            endDate: '',
            current: true,
            description: 'Leading digital transformation projects and developing modern payment systems.'
        }
    ],
    education: [
        {
            id: '1',
            institution: 'Addis Ababa University',
            degree: 'B.Sc. in Computer Science',
            location: 'Addis Ababa',
            startDate: '2015-09',
            endDate: '2019-07',
            description: 'Graduated with Distinction. Focused on Software Engineering.'
        }
    ],
    skills: [
        { id: 1, name: 'React.js', level: 95 },
        { id: 2, name: 'Node.js', level: 90 },
        { id: 3, name: 'Cloud Computing', level: 85 }
    ],
    languages: [
        { id: '1', language: 'Amharic', proficiency: 'Native' },
        { id: '2', language: 'English', proficiency: 'Professional' }
    ],
    certifications: [
        { id: 1, name: 'AWS Certified Solutions Architect', issuer: 'Amazon', date: '2022-05' }
    ],
    projects: [
        { id: 1, name: 'Atote CV Maker', description: 'A professional CV builder for Ethiopian job seekers.', technologies: 'React, Vite, Framer Motion' }
    ]
};

function FullTemplatePreview({ templateId, accentColor }) {
    const props = { data: SAMPLE_DATA, accentColor, cvBgColor: '#ffffff' };

    const renderTemplate = () => {
        switch (templateId) {
            case 'modern': return <ModernTemplate {...props} />;
            case 'classic': return <ClassicTemplate {...props} />;
            case 'creative': return <CreativeTemplate {...props} />;
            case 'executive': return <ExecutiveTemplate {...props} />;
            case 'tech': return <TechTemplate {...props} techBgColor="#0d1117" />;
            default: return <ModernTemplate {...props} />;
        }
    };

    return (
        <div style={{
            width: '100%',
            height: 340,
            background: templateId === 'tech' ? '#0d1117' : '#f8fafc',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
            position: 'relative',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'center',
            padding: '20px 0'
        }}>
            <div style={{
                transform: 'scale(0.38)',
                transformOrigin: 'top center',
                width: 794, // Standard A4 width in pixels at 96 DPI
                flexShrink: 0,
                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                background: '#fff'
            }}>
                {renderTemplate()}
            </div>
            {/* Soft fade-out at bottom */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
                background: 'linear-gradient(to top, var(--bg-card) 20%, transparent)',
                zIndex: 2,
                pointerEvents: 'none'
            }} />
        </div>
    );
}

export default function TemplateSelector() {
    const navigate = useNavigate();
    const { selectedTemplate, setSelectedTemplate, setAccentColor } = useCV();

    const handleSelect = (templateId, accentColor) => {
        setSelectedTemplate(templateId);
        setAccentColor(accentColor);
    };

    const handleContinue = (templateId, accentColor) => {
        handleSelect(templateId, accentColor);
        navigate('/editor');
    };

    return (
        <div style={{ minHeight: '100vh', paddingTop: 80, background: 'var(--bg-base)' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: 48, paddingBottom: 100 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: 64 }}
                >
                    <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-1px', color: 'var(--text-primary)' }}>
                        Choose Your <span className="gradient-text">Template</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
                        Transform your career with our professionally designed layouts, tailored for the Ethiopian market.
                    </p>
                </motion.div>

                {/* Template grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 32,
                    alignItems: 'start'
                }}>
                    {TEMPLATES.map((template, i) => {
                        const isSelected = selectedTemplate === template.id;
                        return (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 32 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    background: 'var(--bg-card)',
                                    border: `2px solid ${isSelected ? template.accentColor : 'var(--border-subtle)'}`,
                                    borderRadius: 'var(--radius-xl)',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 20,
                                    position: 'relative',
                                    boxShadow: isSelected ? `0 20px 40px ${template.accentColor}20` : 'none',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {isSelected && (
                                    <div style={{
                                        position: 'absolute', top: -12, right: 24,
                                        background: template.accentColor, color: '#fff',
                                        padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 800,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 10
                                    }}>
                                        SELECTED
                                    </div>
                                )}

                                <FullTemplatePreview templateId={template.id} accentColor={template.accentColor} />

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div>
                                        <h3 style={{ fontWeight: 800, fontSize: 18, color: 'var(--text-primary)', marginBottom: 4 }}>{template.name}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>
                                            {template.description}
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {template.tags.map((tag) => (
                                            <span key={tag} style={{
                                                fontSize: 10, fontWeight: 700,
                                                background: 'var(--bg-surface)',
                                                color: 'var(--text-secondary)',
                                                border: '1px solid var(--border-subtle)',
                                                padding: '3px 10px', borderRadius: 20,
                                            }}>{tag}</span>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handleContinue(template.id, template.accentColor)}
                                        style={{
                                            marginTop: 8,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                            background: isSelected ? template.accentColor : 'var(--bg-surface)',
                                            color: isSelected ? '#fff' : 'var(--text-primary)',
                                            border: isSelected ? 'none' : '1px solid var(--border-default)',
                                            padding: '12px', borderRadius: 12,
                                            fontSize: 14, fontWeight: 700, cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onMouseEnter={e => {
                                            if (!isSelected) {
                                                e.currentTarget.style.background = 'var(--bg-hover)';
                                                e.currentTarget.style.borderColor = template.accentColor;
                                            }
                                        }}
                                        onMouseLeave={e => {
                                            if (!isSelected) {
                                                e.currentTarget.style.background = 'var(--bg-surface)';
                                                e.currentTarget.style.borderColor = 'var(--border-default)';
                                            }
                                        }}
                                    >
                                        {isSelected ? 'Continue with this' : 'Use This Template'}
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
