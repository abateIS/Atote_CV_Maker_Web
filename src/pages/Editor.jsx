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

const PRESET_BG_COLORS = [
    '#ffffff', '#f8fafc', '#f1f5f9', '#fff7ed', '#fefce8',
    '#f0fdf4', '#f0f9ff', '#f5f3ff', '#fff1f2', '#fafaf9'
];

const TECH_BG_OPTIONS = ['#0d1117', '#000000', '#1a1b26', '#2d3436', '#1e1e1e'];

function TemplatePreview({ cvData, template, accentColor, techBgColor, cvBgColor }) {
    const props = { data: cvData, accentColor, techBgColor, cvBgColor };
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
    const { cvData, selectedTemplate, accentColor, setAccentColor, techBgColor, setTechBgColor, cvBgColor, setCvBgColor, loadSampleData, theme, toggleTheme } = useCV();
    const [activeSection, setActiveSection] = useState('personal');
    const [mobileView, setMobileView] = useState('editor'); // 'editor' | 'preview'
    const [isExporting, setIsExporting] = useState(false);
    const [exportStatus, setExportStatus] = useState('');
    const previewRef = useRef(null);

    const handleExportPDF = async () => {
        if (isExporting) return;

        setIsExporting(true);
        setExportStatus('Preparing...');

        try {
            const [html2canvas, jsPDF] = await Promise.all([
                import('html2canvas').then(m => m.default),
                import('jspdf').then(m => m.default)
            ]);

            const element = document.getElementById('cv-preview');
            if (!element) throw new Error('Preview not found');

            setExportStatus('Capturing...');
            const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;

            const capturePromise = html2canvas(element, {
                scale: isMobile ? 1.0 : 1.5,
                useCORS: true,
                backgroundColor: selectedTemplate === 'tech' ? techBgColor : cvBgColor,
                logging: false,
                width: 794,
                windowWidth: 794,
                onclone: (doc) => {
                    const clonedElement = doc.getElementById('cv-preview');
                    if (clonedElement) {
                        clonedElement.style.transform = 'none';
                        clonedElement.style.margin = '0';
                        // Strip heavy styles for mobile capture
                        const all = doc.querySelectorAll('*');
                        all.forEach(el => {
                            el.style.boxShadow = 'none';
                            el.style.backdropFilter = 'none';
                            el.style.transition = 'none';
                            el.style.animation = 'none';
                        });
                    }
                }
            });

            // Timeout after 12 seconds for mobile safety
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Capture timed out. Please try a simpler template or desktop.')), 12000)
            );

            const canvas = await Promise.race([capturePromise, timeoutPromise]);

            setExportStatus('Formatting...');
            const imgData = canvas.toDataURL('image/jpeg', 0.8);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true
            });

            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
            const name = `${cvData.personalInfo.firstName || 'CV'}_CV.pdf`.replace(/\s+/g, '_');

            setExportStatus('Downloading...');

            if (isMobile) {
                const blob = pdf.output('blob');
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = name;
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }, 2000);
            } else {
                pdf.save(name);
            }

            setExportStatus('Done!');
            setTimeout(() => setExportStatus(''), 3000);
        } catch (e) {
            console.error('Export error:', e);
            alert(e.message || 'Export failed. Try a desktop browser.');
            setExportStatus('Error');
        } finally {
            setIsExporting(false);
            setTimeout(() => setExportStatus(''), 3000);
        }
    };

    const handleNext = () => {
        const currentIndex = SECTIONS.findIndex(s => s.id === activeSection);
        if (currentIndex < SECTIONS.length - 1) {
            setActiveSection(SECTIONS[currentIndex + 1].id);
            // Scroll to top of form
            const formArea = document.querySelector('.form-area');
            if (formArea) formArea.scrollTop = 0;
        }
    };

    const handleBack = () => {
        const currentIndex = SECTIONS.findIndex(s => s.id === activeSection);
        if (currentIndex > 0) {
            setActiveSection(SECTIONS[currentIndex - 1].id);
            const formArea = document.querySelector('.form-area');
            if (formArea) formArea.scrollTop = 0;
        }
    };

    const renderForm = () => {
        const props = { onNext: handleNext, onBack: handleBack, isLast: activeSection === SECTIONS[SECTIONS.length - 1].id, onExport: handleExportPDF };
        switch (activeSection) {
            case 'personal': return <PersonalInfoForm {...props} />;
            case 'summary': return <SummaryForm {...props} />;
            case 'experience': return <ExperienceForm {...props} />;
            case 'education': return <EducationForm {...props} />;
            case 'skills': return <SkillsForm {...props} />;
            case 'languages': return <LanguagesForm {...props} />;
            case 'certifications': return <CertificationsForm {...props} />;
            case 'projects': return <ProjectsForm {...props} />;
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        {/* Background Color Picker */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 15, borderLeft: '1px solid var(--border-subtle)' }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)' }}>CV Background</span>
                            <div style={{ position: 'relative', width: 24, height: 24, borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-default)', cursor: 'pointer' }}>
                                <input
                                    type="color"
                                    value={selectedTemplate === 'tech' ? techBgColor : cvBgColor}
                                    onChange={(e) => selectedTemplate === 'tech' ? setTechBgColor(e.target.value) : setCvBgColor(e.target.value)}
                                    style={{
                                        position: 'absolute', top: -5, left: -5, width: 40, height: 40,
                                        padding: 0, border: 'none', background: 'none', cursor: 'pointer'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: selectedTemplate === 'tech' ? techBgColor : cvBgColor,
                                    pointerEvents: 'none'
                                }} />
                            </div>
                        </div>

                        <button onClick={handleExportPDF} disabled={isExporting} style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            background: exportStatus === 'Error' ? 'var(--color-danger)' : exportStatus === 'Done!' ? 'var(--color-success)' : 'var(--color-success)',
                            color: '#fff', border: 'none', padding: '7px 14px',
                            borderRadius: 'var(--radius-sm)', cursor: isExporting ? 'not-allowed' : 'pointer',
                            fontSize: 12, fontWeight: 700,
                            transition: 'all 0.2s'
                        }}>
                            {isExporting ? <Loader size={12} className="spin" /> : <Download size={12} />}
                            <span className="hide-mobile">{exportStatus || 'Download PDF'}</span>
                            <span className="show-mobile">{exportStatus || 'PDF'}</span>
                        </button>
                    </div>
                </div>

                {/* Main layout */}
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    {/* Left: Section nav + form */}
                    <div style={{
                        width: window.innerWidth < 768 ? '100%' : 380,
                        flexShrink: 0, display: mobileView === 'editor' ? 'flex' : 'none',
                        flexDirection: 'column', borderRight: '1px solid var(--border-subtle)',
                        background: 'var(--bg-surface)',
                    }}>
                        {/* Section tabs */}
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
                        <div className="form-area" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
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
                            boxShadow: '0 20px 60px rgba(0,0,0,0.25)', transformOrigin: 'top center',
                            transform: window.innerWidth < 768 ? `scale(${(window.innerWidth - 32) / 794})` : 'none'
                        }}>
                            <div id="cv-preview">
                                <TemplatePreview cvData={cvData} template={selectedTemplate} accentColor={accentColor} techBgColor={techBgColor} cvBgColor={cvBgColor} />
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
