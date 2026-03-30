import React, { useState, useRef, useEffect } from 'react';
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
    { id: 'personal', label: 'Personal', icon: <User size={15} /> },
    { id: 'summary', label: 'Summary', icon: <FileText size={15} /> },
    { id: 'experience', label: 'Work', icon: <Briefcase size={15} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={15} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={15} /> },
    { id: 'languages', label: 'Langs', icon: <Globe size={15} /> },
    { id: 'certifications', label: 'Awards', icon: <Award size={15} /> },
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
        } catch (e) { console.error(e); }
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
                    padding: '12px 16px',
                    background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)',
                    gap: 12, flexWrap: 'wrap',
                    position: 'sticky', top: 64, zIndex: 100,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button onClick={() => navigate('/templates')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 12 }}>
                            <ChevronLeft size={14} /> <span className="hide-mobile">Templates</span>
                        </button>
                        <div className="show-mobile" style={{ gap: 8, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 20, padding: 2 }}>
                            <button onClick={() => setMobileView('editor')} style={{ padding: '4px 12px', borderRadius: 18, border: 'none', fontSize: 11, fontWeight: 700, background: mobileView === 'editor' ? 'var(--color-primary)' : 'transparent', color: mobileView === 'editor' ? '#fff' : 'var(--text-secondary)' }}>Edit</button>
                            <button onClick={() => setMobileView('preview')} style={{ padding: '4px 12px', borderRadius: 18, border: 'none', fontSize: 11, fontWeight: 700, background: mobileView === 'preview' ? 'var(--color-primary)' : 'transparent', color: mobileView === 'preview' ? '#fff' : 'var(--text-secondary)' }}>View</button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            {['#6366f1', '#10b981', '#f59e0b', '#ef4444'].map(color => (
                                <button key={color} onClick={() => setAccentColor(color)} style={{ width: 18, height: 18, borderRadius: '50%', background: color, border: accentColor === color ? '2px solid #fff' : 'none', cursor: 'pointer' }} />
                            ))}
                        </div>
                        <button onClick={handleExportPDF} disabled={isExporting} style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            background: 'var(--color-success)', color: '#fff', border: 'none', padding: '7px 14px',
                            borderRadius: 'var(--radius-sm)', cursor: isExporting ? 'not-allowed' : 'pointer',
                            fontSize: 12, fontWeight: 700,
                        }}>
                            {isExporting ? <Loader size={12} className="spin" /> : <Download size={12} />}
                            <span className="hide-mobile">{isExporting ? 'Exporting...' : 'Download PDF'}</span>
                            <span className="show-mobile">PDF</span>
                        </button>
                    </div>
                </div>

                {/* Main layout */}
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    {/* Left: Section nav + form */}
                    <div style={{
                        width: window.innerWidth < 768 ? '100%' : 360,
                        flexShrink: 0, display: mobileView === 'editor' ? 'flex' : 'none',
                        flexDirection: 'column', borderRight: '1px solid var(--border-subtle)',
                        background: 'var(--bg-surface)',
                    }}>
                        {/* Section tabs - Scrollable on mobile */}
                        <div style={{
                            display: 'flex', overflowX: 'auto', gap: 8, padding: '12px',
                            borderBottom: '1px solid var(--border-subtle)',
                            scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch'
                        }}>
                            {SECTIONS.map(s => (
                                <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
                                    display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
                                    padding: '6px 12px', borderRadius: 20, cursor: 'pointer', border: '1px solid transparent',
                                    background: activeSection === s.id ? 'var(--color-primary-glow)' : 'transparent',
                                    color: activeSection === s.id ? 'var(--color-primary-light)' : 'var(--text-secondary)',
                                    fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap'
                                }}>
                                    {s.icon} {s.label}
                                </button>
                            ))}
                        </div>

                        {/* Form area */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px' }}>
                            <AnimatePresence mode="wait">
                                <motion.div key={activeSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                                    {renderForm()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Preview */}
                    <div style={{
                        flex: 1, overflowY: 'auto', background: 'var(--bg-base)', padding: window.innerWidth < 768 ? 16 : 40,
                        display: mobileView === 'preview' || window.innerWidth >= 768 ? 'flex' : 'none',
                        justifyContent: 'center',
                    }}>
                        <div style={{
                            width: '100%', maxWidth: 794, height: 'fit-content',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.2)', transformOrigin: 'top center',
                            transform: window.innerWidth < 768 ? `scale(${(window.innerWidth - 32) / 794})` : 'none'
                        }}>
                            <div id="cv-preview">
                                <TemplatePreview cvData={cvData} template={selectedTemplate} accentColor={accentColor} techBgColor={techBgColor} />
                            </div>
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
