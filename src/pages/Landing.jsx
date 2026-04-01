import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Layout, Download, Star, ArrowRight, Check, Sparkles, Users, Clock, FileText } from 'lucide-react';
import Navbar from '../components/ui/Navbar';
import { ModernTemplate, ClassicTemplate, ExecutiveTemplate } from '../templates/Templates';

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

const TEMPLATES_PREVIEW = [
    { id: 'modern', name: 'Modern', color: '#6366f1', tag: 'Most Popular' },
    { id: 'classic', name: 'Classic', color: '#0ea5e9', tag: 'Professional' },
    { id: 'creative', name: 'Creative', color: '#f59e0b', tag: 'Stand Out' },
    { id: 'executive', name: 'Executive', color: '#1e40af', tag: 'Corporate' },
    { id: 'tech', name: 'Tech Dev', color: '#10b981', tag: 'Developer' },
];

const FEATURES = [
    { icon: <Layout size={22} />, title: '5 Premium Templates', desc: 'Modern, Classic, Creative, Executive — professionally crafted designs.' },
    { icon: <Zap size={22} />, title: 'Live Preview', desc: 'See your CV update in real-time as you type — no surprises.' },
    { icon: <Download size={22} />, title: 'PDF Export', desc: 'Download a pixel-perfect PDF ready to send to recruiters.' },
    { icon: <Star size={22} />, title: 'ATS Friendly', desc: 'All templates are optimized to pass Applicant Tracking Systems.' },
    { icon: <Sparkles size={22} />, title: 'Sample Data', desc: 'Load professional sample data with one click to get inspired.' },
    { icon: <Clock size={22} />, title: 'Build in Minutes', desc: 'Intuitive editor lets you create a polished CV in under 10 minutes.' },
];

const STATS = [
    { value: '50K+', label: 'CVs Created' },
    { value: '5', label: 'Pro Templates' },
    { value: '98%', label: 'User Satisfaction' },
    { value: 'Free', label: 'Always' },
];

// Mini CV card preview
function MiniCV({ template }) {
    const colors = {
        modern: ['#6366f1', '#818cf8'],
        classic: ['#0ea5e9', '#38bdf8'],
        creative: ['#f59e0b', '#fbbf24'],
        executive: ['#1e40af', '#3b82f6'],
        tech: ['#10b981', '#34d399'],
    };
    const [c1, c2] = colors[template.id];

    return (
        <div style={{
            width: 130, height: 180,
            background: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
            flexShrink: 0,
        }}>
            {/* Header bar */}
            <div style={{ height: 44, background: `linear-gradient(135deg, ${c1}, ${c2})`, padding: '8px 10px' }}>
                <div style={{ width: 40, height: 5, background: 'rgba(255,255,255,0.8)', borderRadius: 4, marginBottom: 4 }} />
                <div style={{ width: 60, height: 3, background: 'rgba(255,255,255,0.5)', borderRadius: 4 }} />
            </div>
            {/* Body lines */}
            <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[100, 80, 90, 60, 85, 70, 50, 75, 55, 80, 65, 40].map((w, i) => (
                    <div key={i} style={{
                        height: 3, width: `${w}%`,
                        background: i % 4 === 0 ? c1 : '#e2e8f0',
                        borderRadius: 4, opacity: i % 4 === 0 ? 0.9 : 1,
                    }} />
                ))}
            </div>
        </div>
    );
}

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh' }}>
            <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
                <Navbar />

                {/* Hero Section */}
                <section style={{ padding: '120px 0 60px', overflow: 'hidden' }}>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{ textAlign: 'center', marginBottom: 40 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    background: 'rgba(99,102,241,0.1)',
                                    color: 'var(--color-primary-light)',
                                    padding: '6px 16px', borderRadius: 'var(--radius-full)',
                                    fontSize: 13, fontWeight: 700, marginBottom: 20,
                                    border: '1px solid rgba(99,102,241,0.2)'
                                }}
                            >
                                <Sparkles size={14} /> The #1 CV Builder for Ethiopia
                            </motion.div>
                            <h1 style={{
                                fontSize: 'clamp(40px, 8vw, 72px)',
                                fontWeight: 900,
                                lineHeight: 1,
                                letterSpacing: '-2px',
                                marginBottom: 24,
                                color: 'var(--text-primary)'
                            }}>
                                Get Hired Fast with <br />
                                <span className="gradient-text">Atote CV Maker</span>
                            </h1>
                            <p style={{
                                fontSize: 'clamp(18px, 2vw, 20px)',
                                color: 'var(--text-secondary)',
                                maxWidth: 600,
                                margin: '0 auto 40px',
                                lineHeight: 1.6
                            }}>
                                Professional, ATS-friendly resumes designed for the Ethiopian market.
                                Build your professional profile in minutes.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
                        >
                            <button onClick={() => navigate('/templates')} style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                                color: '#fff', border: 'none', cursor: 'pointer',
                                padding: '16px 36px', borderRadius: 'var(--radius-full)',
                                fontSize: 17, fontWeight: 700,
                                boxShadow: '0 8px 32px rgba(99,102,241,0.45)',
                                transition: 'all 0.25s ease',
                                fontFamily: 'var(--font-sans)',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.6)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.45)'; }}
                            >
                                Start Building Free <ArrowRight size={18} />
                            </button>

                            <button onClick={() => navigate('/templates')} style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                background: 'transparent',
                                color: 'var(--text-primary)', border: '1px solid var(--border-default)',
                                cursor: 'pointer',
                                padding: '16px 32px', borderRadius: 'var(--radius-full)',
                                fontSize: 16, fontWeight: 600,
                                transition: 'all 0.25s ease',
                                fontFamily: 'var(--font-sans)',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary-light)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                            >
                                <Layout size={16} /> View Templates
                            </button>
                        </motion.div>

                        {/* Template cards strip */}
                        <div style={{
                            overflowX: 'auto',
                            width: '100vw',
                            marginLeft: 'calc(-50vw + 50%)',
                            padding: '48px 16px',
                            display: 'flex',
                            gap: 24,
                            justifyContent: 'center',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                        }}>
                            {TEMPLATES_PREVIEW.map((t, i) => (
                                <motion.div
                                    key={t.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + i * 0.05 }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, flexShrink: 0 }}
                                    onClick={() => navigate('/templates')}
                                >
                                    <MiniCV template={t} />
                                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.5px' }}>{t.name.toUpperCase()}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section style={{ padding: '40px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(24px, 8vw, 100px)', flexWrap: 'wrap' }}>
                        {STATS.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{ textAlign: 'center' }}
                            >
                                <div style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-secondary))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    {s.value}
                                </div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Features */}
                <section style={{ padding: '100px 0' }}>
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ textAlign: 'center', marginBottom: 64 }}
                        >
                            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-1px' }}>
                                Everything You Need to <span className="gradient-text">Impress</span>
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
                                {[
                                    { id: 'modern', name: 'Modern Minimalist', color: '#6366f1' },
                                    { id: 'classic', name: 'Classic Professional', color: '#0ea5e9' },
                                    { id: 'executive', name: 'Executive Corporate', color: '#1e40af' },
                                ].map((template, i) => (
                                    <motion.div
                                        key={template.id}
                                        initial={{ opacity: 0, y: 32 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ y: -10 }}
                                        onClick={() => navigate('/templates')}
                                        style={{
                                            background: 'var(--bg-card)',
                                            borderRadius: 'var(--radius-xl)',
                                            padding: 24,
                                            cursor: 'pointer',
                                            border: '1px solid var(--border-subtle)',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <div style={{
                                            width: '100%',
                                            height: 280,
                                            background: template.id === 'tech' ? '#0d1117' : '#f8fafc',
                                            borderRadius: 12,
                                            overflow: 'hidden',
                                            position: 'relative',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            padding: '16px 0'
                                        }}>
                                            <div style={{
                                                transform: 'scale(0.32)',
                                                transformOrigin: 'top center',
                                                width: 794,
                                                flexShrink: 0,
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                                background: '#fff'
                                            }}>
                                                {template.id === 'modern' && <ModernTemplate data={SAMPLE_DATA} accentColor={template.color} />}
                                                {template.id === 'classic' && <ClassicTemplate data={SAMPLE_DATA} accentColor={template.color} />}
                                                {template.id === 'executive' && <ExecutiveTemplate data={SAMPLE_DATA} accentColor={template.color} />}
                                            </div>
                                            <div style={{
                                                position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
                                                background: 'linear-gradient(to top, var(--bg-card) 20%, transparent)',
                                                pointerEvents: 'none'
                                            }} />
                                        </div>

                                        <div style={{ marginTop: 20, textAlign: 'center' }}>
                                            <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{template.name}</h3>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Click to preview full design</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* How it works */}
                <section style={{ padding: '80px 0', background: 'var(--bg-surface)' }}>
                    <div className="container">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 60 }}>
                            <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, marginBottom: 12, letterSpacing: '-1px', color: 'var(--text-primary)' }}>
                                3 Steps to Your Dream CV
                            </h2>
                        </motion.div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
                            {[
                                { step: '01', title: 'Pick a Template', desc: 'Browse 5 stunning professional designs and pick the one that fits you.' },
                                { step: '02', title: 'Fill Your Details', desc: 'Use our intuitive editor — experience, skills, education, and more.' },
                                { step: '03', title: 'Download PDF', desc: 'Export a polished PDF ready for job applications in one click.' },
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    style={{ textAlign: 'center', padding: '32px 24px' }}
                                >
                                    <div style={{
                                        fontSize: 52, fontWeight: 900,
                                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                        WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                        opacity: 0.4, lineHeight: 1, marginBottom: 16,
                                        fontFamily: 'var(--font-mono)',
                                    }}>{s.step}</div>
                                    <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 10 }}>{s.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Banner */}
                <section style={{ padding: '100px 0' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.1))',
                                border: '1px solid rgba(99,102,241,0.3)',
                                borderRadius: 'var(--radius-xl)',
                                padding: 'clamp(40px, 6vw, 80px)',
                            }}
                        >
                            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, marginBottom: 20, letterSpacing: '-1px', color: 'var(--text-primary)' }}>
                                Ready to Land Your Next Job?
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 18, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
                                Join thousands of professionals who built their CV with Atote.
                            </p>
                            <button
                                onClick={() => navigate('/templates')}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 10,
                                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                                    color: '#fff', border: 'none', cursor: 'pointer',
                                    padding: '18px 42px', borderRadius: 'var(--radius-full)',
                                    fontSize: 18, fontWeight: 700,
                                    boxShadow: '0 8px 32px rgba(99,102,241,0.45)',
                                    transition: 'all 0.25s ease',
                                    fontFamily: 'var(--font-sans)',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(99,102,241,0.6)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.45)'; }}
                            >
                                Create My CV Now <ArrowRight size={20} />
                            </button>
                            {/* Trust badges */}
                            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
                                {['No sign-up required', 'Free forever', 'Export to PDF'].map((t, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 13 }}>
                                        <Check size={14} color="var(--color-success)" /> {t}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '48px 0', textAlign: 'center', background: 'var(--bg-surface)' }}>
                    <div className="container">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                            <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 12 }}>
                                CV
                            </div>
                            <span style={{ fontWeight: 800, fontSize: 20, color: 'var(--text-primary)' }}>Atote<span className="gradient-text">CV Maker</span></span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
                            Developed by Atote Tech Solution
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>
                            <div>Abate Alemu</div>
                            <div>Email: abatealemu52@gmail.com</div>
                            <div>Phone: 0901552962</div>
                            <div>
                                <a href="https://www.linkedin.com/in/abate-alemu-90b549309" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-light)', textDecoration: 'none' }}>
                                    LinkedIn: Abate Alemu
                                </a>
                            </div>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                            © {new Date().getFullYear()} Atote Tech Solution. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}