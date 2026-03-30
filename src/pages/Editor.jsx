import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, Edit3, ChevronLeft, Sparkles, Palette, User, Briefcase, GraduationCap, Award, Globe, Code, FileText, LayoutTemplate, X, Loader, Sun, Moon } from 'lucide-react';
import Navbar from '../components/ui/Navbar';
import { useCV } from '../context/CVContext';
import PersonalInfoForm from '../components/editor/PersonalInfoForm';
import SummaryForm from '../components/editor/SummaryForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import SkillsForm from '../components/editor/SkillsForm';
import LanguagesForm from '../components/editor/LanguagesForm';
import CertificationsForm from '../components/editor/CertificationsForm';
import ProjectsForm from '../components/editor/ProjectsForm';
import { ModernTemplate, ClassicTemplate, CreativeTemplate, ExecutiveTemplate, TechTemplate } from '../templates/Templates';

const SECTIONS = [
    { id: 'personal', label: 'Personal Info', icon: <User size={15} /> },
    { id: 'summary', label: 'Summary', icon: <FileText size={15} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={15} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={15} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={15} /> },
    { id: 'languages', label: 'Languages', icon: <Globe size={15} /> },
    { id: 'certifications', label: 'Certifications', icon: <Award size={15} /> },
    { id: 'projects', label: 'Projects', icon: <LayoutTemplate size={15} /> },
];

function TemplatePreview({ cvData, template, accentColor, techBgColor }) {
    const props = { data: cvData, accentColor, techBgColor };
    switch (template) {
        case 'modern': return <ModernTemplate {...props} />;
        case 'classic': return <ClassicTemplate {...props} />;
        case 'creative': return <CreativeTemplate {...props} />;
        case 'executive': return <ExecutiveTemplate {...props} />;
        case 'tech': return <TechTemplate {...props} />;
        default: return <ModernTemplate {...props} />;
    }
}

export default function Editor() {
    const navigate = useNavigate();
    const { cvData, selectedTemplate, accentColor, setAccentColor, techBgColor, setTechBgColor, loadSampleData, theme, toggleTheme } = useCV();
    const [activeSection, setActiveSection] = useState('personal');
    const [mobileView, setMobileView] = useState('editor'); // 'editor' | 'preview'
    const [isExporting, setIsExporting] = useState(false);
    const previewRef = useRef(null);

    const handleExportPDF = async () => {
        setIsExporting(true);
        try {
            const { default: html2canvas } = await import('html2canvas');
            const { default: jsPDF } = await import('jspdf');
            const element = document.getElementById('cv-preview');
            if (!element) { setIsExporting(false); return; }
            const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const pdfW = pdf.internal.pageSize.getWidth();
            const pdfH = (canvas.height * pdfW) / canvas.width;
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH);
            const name = `${cvData.personalInfo.firstName || 'CV'}_${cvData.personalInfo.lastName || ''}_CV.pdf`.replace(/\s+/g, '_');
            pdf.save(name);
        } catch (e) {
            console.error(e);
        }
        setIsExporting(false);
    };

    const renderForm = () => {
        switch (activeSection) {
            case 'personal': return <PersonalInfoForm />;
            case 'summary': return <SummaryForm />;
            case 'experience': return <ExperienceForm />;
            case 'education': return <EducationForm />;
            case 'skills': return <SkillsForm />;
            case 'languages': return <LanguagesForm />;
            case 'certifications': return <CertificationsForm />;
            case 'projects': return <ProjectsForm />;
            default: return null;
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
            <Navbar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 64 }}>
                {/* Top toolbar */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 24px',
                    background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)',
                    gap: 12, flexWrap: 'wrap',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button onClick={() => navigate('/templates')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', padding: '7px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-sans)' }}>
                            <ChevronLeft size={14} /> Templates
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            style={{
                                background: 'none', border: '1px solid var(--border-default)',
                                color: 'var(--text-secondary)', padding: '6px 10px', borderRadius: 6,
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600,
                            }}
                        >
                            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                            {theme === 'dark' ? 'Light' : 'Dark'}
                        </button>

                        {/* Accent color picker */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Accent</span>
                            <div style={{ display: 'flex', gap: 6 }}>
                                {['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setAccentColor(color)}
                                        style={{
                                            width: 20, height: 20, borderRadius: '50%', border: accentColor === color ? '2px solid #fff' : 'none',
                                            backgroundColor: color, cursor: 'pointer', outline: accentColor === color ? `2px solid ${color}` : 'none',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Tech BG picker */}
                        {selectedTemplate === 'tech' && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 15, borderLeft: '1px solid var(--border-subtle)' }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Tech BG</span>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {['#0d1117', '#000000', '#1a1b26', '#2d3436', '#1e1e1e'].map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setTechBgColor(color)}
                                            style={{
                                                width: 20, height: 20, borderRadius: 4, border: techBgColor === color ? '2px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                                                backgroundColor: color, cursor: 'pointer',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <button onClick={loadSampleData} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: 'var(--color-primary-light)', padding: '7px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                            <Sparkles size={13} /> Sample Data
                        </button>

                        <button onClick={handleExportPDF} disabled={isExporting} style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            background: 'linear-gradient(135deg, var(--color-success), #059669)',
                            color: '#fff', border: 'none', padding: '8px 18px',
                            borderRadius: 'var(--radius-sm)', cursor: isExporting ? 'not-allowed' : 'pointer',
                            fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-sans)',
                            boxShadow: '0 4px 12px rgba(16,185,129,0.35)',
                            opacity: isExporting ? 0.7 : 1,
                        }}>
                            {isExporting ? <Loader size={13} className="spin" /> : <Download size={13} />}
                            {isExporting ? 'Exporting...' : 'Download PDF'}
                        </button>
                    </div>
                </div>

                {/* Main layout */}
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    {/* Left: Section nav + form */}
                    <div style={{
                        width: 380, flexShrink: 0, display: 'flex', flexDirection: 'column',
                        borderRight: '1px solid var(--border-subtle)',
                        background: 'var(--bg-surface)',
                    }}>
                        {/* Section tabs */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, padding: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                            {SECTIONS.map(s => (
                                <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '8px 12px', borderRadius: 8, cursor: 'pointer', border: '1px solid transparent',
                                    background: activeSection === s.id ? 'var(--color-primary-glow)' : 'transparent',
                                    borderColor: activeSection === s.id ? 'var(--border-accent)' : 'transparent',
                                    color: activeSection === s.id ? 'var(--color-primary-light)' : 'var(--text-secondary)',
                                    fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)',
                                    textAlign: 'left', transition: 'all 0.2s',
                                }}>
                                    <span style={{ opacity: activeSection === s.id ? 1 : 0.6 }}>{s.icon}</span>
                                    {s.label}
                                </button>
                            ))}
                        </div>

                        {/* Form area */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSection}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {renderForm()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Preview */}
                    <div style={{
                        flex: 1, overflowY: 'auto',
                        background: 'var(--bg-base)',
                        padding: 40,
                        display: 'flex', justifyContent: 'center',
                        backgroundImage: 'radial-gradient(var(--border-subtle) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}>
                        <div style={{ width: '100%', maxWidth: 794, height: 'fit-content', boxShadow: '0 30px 60px rgba(0,0,0,0.25)', borderRadius: 4, overflow: 'hidden' }}>
                            <TemplatePreview cvData={cvData} template={selectedTemplate} accentColor={accentColor} techBgColor={techBgColor} />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}
