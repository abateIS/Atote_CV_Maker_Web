import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

// Shared helpers
export function formatDate(dateStr, current = false) {
    if (current) return 'Present';
    if (!dateStr) return '';
    const [y, m] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(m) - 1] || ''} ${y}`;
}

export function SkillBar({ name, level, color }) {
    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600 }}>{name}</span>
                <span style={{ fontSize: 10, opacity: 0.7 }}>{level}%</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 4 }}>
                <div style={{ height: '100%', width: `${level}%`, background: '#fff', borderRadius: 4, opacity: 0.85 }} />
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// 1. MODERN MINIMALIST
// ─────────────────────────────────────────────
export function ModernTemplate({ data, accentColor = '#6366f1' }) {
    const { personalInfo: p, summary, experience, education, skills, languages, certifications, projects } = data;
    const fullName = `${p.firstName} ${p.lastName}`.trim() || 'Your Name';

    return (
        <div id="cv-preview" style={{ display: 'flex', fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#1e293b', background: '#fff', minHeight: 842, maxWidth: 595 }}>
            {/* Sidebar */}
            <div style={{ width: 185, background: accentColor, color: '#fff', padding: '28px 16px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Photo */}
                {p.photo ? (
                    <img src={p.photo} alt="profile" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)', margin: '0 auto' }} />
                ) : (
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: 'rgba(255,255,255,0.6)' }}>
                        {(p.firstName?.[0] || '') + (p.lastName?.[0] || '') || '?'}
                    </div>
                )}

                {/* Contact */}
                <div>
                    <SidebarSection title="CONTACT" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {p.email && <ContactItem icon={<Mail size={10} />} text={p.email} />}
                        {p.phone && <ContactItem icon={<Phone size={10} />} text={p.phone} />}
                        {p.location && <ContactItem icon={<MapPin size={10} />} text={p.location} />}
                        {p.linkedin && <ContactItem icon="LinkedIn:" text={p.linkedin} />}
                        {p.github && <ContactItem icon="GitHub:" text={p.github} />}
                        {p.website && <ContactItem icon={<Globe size={10} />} text={p.website} />}
                    </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div>
                        <SidebarSection title="SKILLS" />
                        {skills.map(s => <SkillBar key={s.id} name={s.name} level={s.level} color={accentColor} />)}
                    </div>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                    <div>
                        <SidebarSection title="LANGUAGES" />
                        {languages.map(l => (
                            <div key={l.id} style={{ marginBottom: 6 }}>
                                <div style={{ fontWeight: 600, fontSize: 11 }}>{l.language}</div>
                                <div style={{ fontSize: 9, opacity: 0.7 }}>{l.proficiency}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '28px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Header */}
                <div style={{ borderBottom: `2px solid ${accentColor}`, paddingBottom: 12 }}>
                    <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 2 }}>{fullName}</h1>
                    <div style={{ fontSize: 12, color: accentColor, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                        {p.title || 'Professional Title'}
                    </div>
                </div>

                {/* Summary */}
                {summary && (
                    <CVSection title="PROFILE" color={accentColor}>
                        <p style={{ fontSize: 10, lineHeight: 1.7, color: '#475569' }}>{summary}</p>
                    </CVSection>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <CVSection title="EXPERIENCE" color={accentColor}>
                        {experience.map(exp => (
                            <div key={exp.id} style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 11, color: '#0f172a' }}>{exp.position}</div>
                                        <div style={{ fontSize: 10, color: accentColor, fontWeight: 600 }}>{exp.company}</div>
                                    </div>
                                    <div style={{ fontSize: 9, color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: 8 }}>
                                        {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                                    </div>
                                </div>
                                {exp.location && <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 2 }}>📍 {exp.location}</div>}
                                {exp.description && (
                                    <div style={{ marginTop: 4 }}>
                                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                                            <div key={i} style={{ fontSize: 9.5, color: '#475569', lineHeight: 1.6, marginBottom: 2 }}>{line}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </CVSection>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <CVSection title="EDUCATION" color={accentColor}>
                        {education.map(edu => (
                            <div key={edu.id} style={{ marginBottom: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 11, color: '#0f172a' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                                        <div style={{ fontSize: 10, color: accentColor, fontWeight: 600 }}>{edu.institution}</div>
                                    </div>
                                    <div style={{ fontSize: 9, color: '#94a3b8' }}>
                                        {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                                    </div>
                                </div>
                                {(edu.gpa || edu.honors) && (
                                    <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>
                                        {edu.gpa && `GPA: ${edu.gpa}`}{edu.gpa && edu.honors && ' · '}{edu.honors}
                                    </div>
                                )}
                            </div>
                        ))}
                    </CVSection>
                )}

                {/* Certifications */}
                {certifications.length > 0 && (
                    <CVSection title="CERTIFICATIONS" color={accentColor}>
                        {certifications.map(c => (
                            <div key={c.id} style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 10 }}>{c.name}</div>
                                    <div style={{ fontSize: 9, color: '#64748b' }}>{c.issuer}</div>
                                </div>
                                <div style={{ fontSize: 9, color: '#94a3b8' }}>{formatDate(c.date)}</div>
                            </div>
                        ))}
                    </CVSection>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <CVSection title="PROJECTS" color={accentColor}>
                        {projects.map(proj => (
                            <div key={proj.id} style={{ marginBottom: 8 }}>
                                <div style={{ fontWeight: 700, fontSize: 10, color: '#0f172a' }}>{proj.name}</div>
                                {proj.technologies && <div style={{ fontSize: 9, color: accentColor, marginBottom: 2 }}>{proj.technologies}</div>}
                                <div style={{ fontSize: 9.5, color: '#475569', lineHeight: 1.6 }}>{proj.description}</div>
                            </div>
                        ))}
                    </CVSection>
                )}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// 2. CLASSIC PROFESSIONAL
// ─────────────────────────────────────────────
export function ClassicTemplate({ data, accentColor = '#0ea5e9' }) {
    const { personalInfo: p, summary, experience, education, skills, languages, certifications, projects } = data;
    const fullName = `${p.firstName} ${p.lastName}`.trim() || 'Your Name';

    return (
        <div id="cv-preview" style={{ fontFamily: "'Georgia', serif", fontSize: 10, color: '#1a1a2e', background: '#fff', padding: '36px 40px', minHeight: 842 }}>
            {/* Header */}
            <div style={{ textAlign: 'center', borderBottom: `3px double ${accentColor}`, paddingBottom: 16, marginBottom: 18 }}>
                <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '1px', color: '#0f172a', marginBottom: 4, fontFamily: 'Georgia, serif' }}>{fullName}</h1>
                {p.title && <div style={{ fontSize: 12, color: accentColor, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 10 }}>{p.title}</div>}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16, fontSize: 9, color: '#64748b' }}>
                    {p.email && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={9} /> {p.email}</span>}
                    {p.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={9} /> {p.phone}</span>}
                    {p.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={9} /> {p.location}</span>}
                    {p.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>LinkedIn: {p.linkedin}</span>}
                    {p.github && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>GitHub: {p.github}</span>}
                    {p.website && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Globe size={9} /> {p.website}</span>}
                </div>
            </div>

            {/* Summary */}
            {summary && (
                <ClassicSection title="Professional Summary" color={accentColor}>
                    <p style={{ fontSize: 10, lineHeight: 1.8, color: '#374151', textAlign: 'justify' }}>{summary}</p>
                </ClassicSection>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <ClassicSection title="Professional Experience" color={accentColor}>
                    {experience.map(exp => (
                        <div key={exp.id} style={{ marginBottom: 14 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <div>
                                    <span style={{ fontWeight: 700, fontSize: 11, color: '#0f172a' }}>{exp.position}</span>
                                    <span style={{ color: '#64748b', fontSize: 10 }}> · {exp.company}</span>
                                </div>
                                <span style={{ fontSize: 9.5, color: '#94a3b8', fontStyle: 'italic' }}>
                                    {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                                </span>
                            </div>
                            {exp.location && <div style={{ fontSize: 9, color: '#94a3b8', marginBottom: 4 }}>{exp.location}</div>}
                            {exp.description && exp.description.split('\n').filter(Boolean).map((line, i) => (
                                <div key={i} style={{ fontSize: 9.5, lineHeight: 1.7, color: '#374151', paddingLeft: 12, marginBottom: 2 }}>{line}</div>
                            ))}
                        </div>
                    ))}
                </ClassicSection>
            )}

            {/* Education */}
            {education.length > 0 && (
                <ClassicSection title="Education" color={accentColor}>
                    {education.map(edu => (
                        <div key={edu.id} style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 10.5, color: '#0f172a' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                                <div style={{ fontSize: 10, color: '#64748b' }}>{edu.institution}</div>
                                {(edu.gpa || edu.honors) && <div style={{ fontSize: 9, color: '#94a3b8' }}>{edu.gpa && `GPA: ${edu.gpa}`}{edu.honors && ` · ${edu.honors}`}</div>}
                            </div>
                            <div style={{ fontSize: 9, color: '#94a3b8', fontStyle: 'italic', textAlign: 'right' }}>
                                {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                            </div>
                        </div>
                    ))}
                </ClassicSection>
            )}

            {/* Skills + Languages row */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 14 }}>
                {skills.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <ClassicSection title="Core Skills" color={accentColor}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
                                {skills.map(s => (
                                    <span key={s.id} style={{ fontSize: 9.5, color: '#374151' }}>• {s.name}</span>
                                ))}
                            </div>
                        </ClassicSection>
                    </div>
                )}
                {languages.length > 0 && (
                    <div style={{ minWidth: 120 }}>
                        <ClassicSection title="Languages" color={accentColor}>
                            {languages.map(l => (
                                <div key={l.id} style={{ fontSize: 9.5, color: '#374151', marginBottom: 2 }}>{l.language} — {l.proficiency}</div>
                            ))}
                        </ClassicSection>
                    </div>
                )}
            </div>

            {/* Certifications */}
            {certifications.length > 0 && (
                <ClassicSection title="Certifications" color={accentColor}>
                    {certifications.map(c => (
                        <div key={c.id} style={{ fontSize: 9.5, color: '#374151', marginBottom: 3 }}>
                            <strong>{c.name}</strong> — {c.issuer} ({formatDate(c.date)})
                        </div>
                    ))}
                </ClassicSection>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <ClassicSection title="Selected Projects" color={accentColor}>
                    {projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: 8 }}>
                            <strong style={{ fontSize: 10 }}>{proj.name}</strong>
                            {proj.technologies && <span style={{ fontSize: 9, color: '#64748b' }}> · {proj.technologies}</span>}
                            <div style={{ fontSize: 9.5, color: '#374151', marginTop: 2 }}>{proj.description}</div>
                        </div>
                    ))}
                </ClassicSection>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────
// 3. CREATIVE BOLD
// ─────────────────────────────────────────────
export function CreativeTemplate({ data, accentColor = '#f59e0b' }) {
    const { personalInfo: p, summary, experience, education, skills, languages, certifications, projects } = data;
    const fullName = `${p.firstName} ${p.lastName}`.trim() || 'Your Name';
    const dark = '#1a0628';

    return (
        <div id="cv-preview" style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, background: '#fff', minHeight: 842 }}>
            {/* Header */}
            <div style={{
                background: `linear-gradient(135deg, ${dark} 0%, #2d1b4e 50%, ${dark} 100%)`,
                padding: '28px 32px', color: '#fff',
                borderBottom: `4px solid ${accentColor}`,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    {p.photo ? (
                        <img src={p.photo} alt="profile" style={{ width: 70, height: 70, borderRadius: 12, objectFit: 'cover', border: `3px solid ${accentColor}` }} />
                    ) : (
                        <div style={{ width: 70, height: 70, borderRadius: 12, background: accentColor + '33', border: `3px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: accentColor, fontWeight: 700 }}>
                            {(p.firstName?.[0] || '') + (p.lastName?.[0] || '') || '?'}
                        </div>
                    )}
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 4, fontFamily: "'Inter', sans-serif" }}>{fullName}</h1>
                        <div style={{ fontSize: 12, color: accentColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>{p.title || 'Professional Title'}</div>
                    </div>
                </div>
                {/* Contact row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', marginTop: 14 }}>
                    {p.email && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>Email: {p.email}</span>}
                    {p.phone && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>Phone: {p.phone}</span>}
                    {p.location && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>Location: {p.location}</span>}
                    {p.linkedin && <span style={{ fontSize: 9, color: accentColor }}>LinkedIn: {p.linkedin}</span>}
                    {p.github && <span style={{ fontSize: 9, color: accentColor }}>GitHub: {p.github}</span>}
                </div>
            </div>

            {/* Body */}
            <div style={{ display: 'flex', gap: 0 }}>
                {/* Left column */}
                <div style={{ width: 200, background: '#fafafa', padding: '20px 16px', borderRight: '1px solid #f1f5f9' }}>
                    {summary && (
                        <div style={{ marginBottom: 18 }}>
                            <CreativeSectionTitle title="About Me" color={accentColor} />
                            <p style={{ fontSize: 9.5, color: '#475569', lineHeight: 1.7 }}>{summary}</p>
                        </div>
                    )}
                    {skills.length > 0 && (
                        <div style={{ marginBottom: 18 }}>
                            <CreativeSectionTitle title="Skills" color={accentColor} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                {skills.map(s => (
                                    <span key={s.id} style={{
                                        fontSize: 9, fontWeight: 600, padding: '3px 7px', borderRadius: 4,
                                        background: accentColor + '18', color: '#92400e', border: `1px solid ${accentColor}44`,
                                    }}>{s.name}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {languages.length > 0 && (
                        <div style={{ marginBottom: 18 }}>
                            <CreativeSectionTitle title="Languages" color={accentColor} />
                            {languages.map(l => (
                                <div key={l.id} style={{ marginBottom: 6 }}>
                                    <div style={{ fontWeight: 600, fontSize: 10 }}>{l.language}</div>
                                    <div style={{ fontSize: 9, color: '#94a3b8' }}>{l.proficiency}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    {certifications.length > 0 && (
                        <div>
                            <CreativeSectionTitle title="Certifications" color={accentColor} />
                            {certifications.map(c => (
                                <div key={c.id} style={{ marginBottom: 6 }}>
                                    <div style={{ fontWeight: 600, fontSize: 9.5 }}>{c.name}</div>
                                    <div style={{ fontSize: 9, color: '#94a3b8' }}>{c.issuer} · {formatDate(c.date)}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right column */}
                <div style={{ flex: 1, padding: '20px 20px' }}>
                    {experience.length > 0 && (
                        <div style={{ marginBottom: 16 }}>
                            <CreativeSectionTitle title="Experience" color={accentColor} />
                            {experience.map(exp => (
                                <div key={exp.id} style={{ marginBottom: 12, paddingLeft: 12, borderLeft: `2px solid ${accentColor}44` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ fontWeight: 700, fontSize: 10.5, color: '#0f172a' }}>{exp.position}</div>
                                        <div style={{ fontSize: 9, color: '#94a3b8' }}>{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</div>
                                    </div>
                                    <div style={{ fontSize: 10, color: accentColor, fontWeight: 600 }}>{exp.company}</div>
                                    {exp.description && exp.description.split('\n').filter(Boolean).map((line, i) => (
                                        <div key={i} style={{ fontSize: 9.5, color: '#475569', lineHeight: 1.6, marginTop: 2 }}>{line}</div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                    {education.length > 0 && (
                        <div style={{ marginBottom: 16 }}>
                            <CreativeSectionTitle title="Education" color={accentColor} />
                            {education.map(edu => (
                                <div key={edu.id} style={{ marginBottom: 8 }}>
                                    <div style={{ fontWeight: 700, fontSize: 10.5 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                                    <div style={{ fontSize: 10, color: accentColor, fontWeight: 600 }}>{edu.institution}</div>
                                    <div style={{ fontSize: 9, color: '#94a3b8' }}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    {projects.length > 0 && (
                        <div>
                            <CreativeSectionTitle title="Projects" color={accentColor} />
                            {projects.map(proj => (
                                <div key={proj.id} style={{ marginBottom: 8, padding: '8px 10px', background: accentColor + '08', borderRadius: 6, border: `1px solid ${accentColor}20` }}>
                                    <div style={{ fontWeight: 700, fontSize: 10 }}>{proj.name}</div>
                                    {proj.technologies && <div style={{ fontSize: 9, color: accentColor, marginBottom: 2 }}>{proj.technologies}</div>}
                                    <div style={{ fontSize: 9.5, color: '#475569' }}>{proj.description}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// 4. EXECUTIVE CORPORATE
// ─────────────────────────────────────────────
export function ExecutiveTemplate({ data, accentColor = '#1e40af' }) {
    const { personalInfo: p, summary, experience, education, skills, languages, certifications, projects } = data;
    const fullName = `${p.firstName} ${p.lastName}`.trim() || 'Your Name';
    const gold = '#c9a84c';

    return (
        <div id="cv-preview" style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, background: '#fff', minHeight: 842 }}>
            {/* Dark header */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', padding: '32px 36px', color: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 6, color: '#fff' }}>{fullName}</h1>
                        <div style={{ fontSize: 11, color: gold, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>{p.title || 'Executive Title'}</div>
                    </div>
                    {p.photo ? (
                        <img src={p.photo} alt="profile" style={{ width: 72, height: 72, borderRadius: 6, objectFit: 'cover', border: `2px solid ${gold}` }} />
                    ) : null}
                </div>
                <div style={{ height: 1, background: gold + '44', margin: '16px 0' }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px' }}>
                    {p.email && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>✉ {p.email}</span>}
                    {p.phone && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>📞 {p.phone}</span>}
                    {p.location && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>📍 {p.location}</span>}
                    {p.linkedin && <span style={{ fontSize: 9, color: gold }}>LinkedIn: {p.linkedin}</span>}
                </div>
            </div>

            {/* Gold rule */}
            <div style={{ height: 3, background: `linear-gradient(90deg, ${gold}, ${gold}88, transparent)` }} />

            {/* Body */}
            <div style={{ display: 'flex', gap: 0 }}>
                <div style={{ flex: 1, padding: '24px 28px' }}>
                    {summary && (
                        <ExecSection title="Executive Summary" gold={gold}>
                            <p style={{ fontSize: 10, lineHeight: 1.8, color: '#374151' }}>{summary}</p>
                        </ExecSection>
                    )}
                    {experience.length > 0 && (
                        <ExecSection title="Career History" gold={gold}>
                            {experience.map(exp => (
                                <div key={exp.id} style={{ marginBottom: 14 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: 11, color: '#0f172a' }}>{exp.position}</div>
                                            <div style={{ fontSize: 10, color: gold, fontWeight: 700 }}>{exp.company}</div>
                                        </div>
                                        <div style={{ fontSize: 9, color: '#94a3b8', fontStyle: 'italic' }}>
                                            {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                                        </div>
                                    </div>
                                    {exp.description && exp.description.split('\n').filter(Boolean).map((line, i) => (
                                        <div key={i} style={{ fontSize: 9.5, color: '#374151', lineHeight: 1.7, marginTop: 3 }}>{line}</div>
                                    ))}
                                </div>
                            ))}
                        </ExecSection>
                    )}
                    {education.length > 0 && (
                        <ExecSection title="Education" gold={gold}>
                            {education.map(edu => (
                                <div key={edu.id} style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 10.5 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                                        <div style={{ fontSize: 10, color: '#64748b' }}>{edu.institution}{edu.honors ? ` · ${edu.honors}` : ''}</div>
                                    </div>
                                    <div style={{ fontSize: 9, color: '#94a3b8' }}>{formatDate(edu.endDate)}</div>
                                </div>
                            ))}
                        </ExecSection>
                    )}
                </div>

                {/* Right sidebar */}
                <div style={{ width: 170, background: '#f8fafc', borderLeft: `3px solid ${gold}44`, padding: '24px 14px' }}>
                    {skills.length > 0 && (
                        <div style={{ marginBottom: 18 }}>
                            <ExecSideTitle title="Core Competencies" gold={gold} />
                            {skills.map(s => (
                                <div key={s.id} style={{ fontSize: 9.5, color: '#374151', padding: '4px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ color: gold, fontSize: 8 }}>◆</span> {s.name}
                                </div>
                            ))}
                        </div>
                    )}
                    {languages.length > 0 && (
                        <div style={{ marginBottom: 18 }}>
                            <ExecSideTitle title="Languages" gold={gold} />
                            {languages.map(l => (
                                <div key={l.id} style={{ fontSize: 9.5, marginBottom: 4 }}>
                                    <div style={{ fontWeight: 600 }}>{l.language}</div>
                                    <div style={{ fontSize: 9, color: '#94a3b8' }}>{l.proficiency}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    {certifications.length > 0 && (
                        <div>
                            <ExecSideTitle title="Certifications" gold={gold} />
                            {certifications.map(c => (
                                <div key={c.id} style={{ fontSize: 9, marginBottom: 6, color: '#374151' }}>
                                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                                    <div style={{ color: '#94a3b8' }}>{c.issuer}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// 5. TECH DEVELOPER
// ─────────────────────────────────────────────
export function TechTemplate({ data, accentColor = '#10b981', techBgColor = '#0d1117' }) {
    const { personalInfo: p, summary, experience, education, skills, languages, certifications, projects } = data;
    const fullName = `${p.firstName} ${p.lastName}`.trim() || 'Your Name';

    return (
        <div id="cv-preview" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, background: techBgColor, color: '#e2e8f0', minHeight: 842 }}>
            {/* Terminal header */}
            <div style={{ padding: '20px 28px', borderBottom: `1px solid ${accentColor}33` }}>
                <div style={{ fontSize: 9, color: accentColor + '80', fontFamily: 'monospace', marginBottom: 8 }}>whoami</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', marginBottom: 4, fontFamily: '"JetBrains Mono", monospace' }}>
                            <span style={{ color: accentColor }}>{fullName.replace(/\s+/g, '_').toLowerCase()}</span>
                        </h1>
                        <div style={{ fontSize: 11, color: accentColor, fontWeight: 600 }}>{p.title || '// Professional Title'}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginTop: 10 }}>
                    {p.email && <span style={{ fontSize: 9, color: '#64748b' }}>Email: {p.email}</span>}
                    {p.phone && <span style={{ fontSize: 9, color: '#64748b' }}>Phone: {p.phone}</span>}
                    {p.location && <span style={{ fontSize: 9, color: '#64748b' }}>Loc: {p.location}</span>}
                    {p.github && <span style={{ fontSize: 9, color: accentColor }}>github: {p.github}</span>}
                    {p.linkedin && <span style={{ fontSize: 9, color: accentColor }}>linkedin: {p.linkedin}</span>}
                </div>
            </div>

            <div style={{ display: 'flex' }}>
                {/* Main */}
                <div style={{ flex: 1, padding: '18px 22px', borderRight: `1px solid ${accentColor}22` }}>
                    {summary && (
                        <TechSection title="README.md" color={accentColor}>
                            <p style={{ fontSize: 9.5, lineHeight: 1.75, color: '#94a3b8' }}>{summary}</p>
                        </TechSection>
                    )}
                    {experience.length > 0 && (
                        <TechSection title="work_experience/" color={accentColor}>
                            {experience.map((exp, idx) => (
                                <div key={exp.id} style={{ marginBottom: 14, paddingBottom: idx < experience.length - 1 ? 12 : 0, borderBottom: idx < experience.length - 1 ? `1px dashed ${accentColor}22` : 'none' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: accentColor, fontWeight: 700, fontSize: 10 }}>{exp.position}</span>
                                        <span style={{ fontSize: 8.5, color: '#475569' }}>{formatDate(exp.startDate)} → {exp.current ? 'now' : formatDate(exp.endDate)}</span>
                                    </div>
                                    <div style={{ fontSize: 9.5, color: '#64748b', marginBottom: 4 }}>@ {exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                                    {exp.description && exp.description.split('\n').filter(Boolean).map((line, i) => (
                                        <div key={i} style={{ fontSize: 9, color: '#94a3b8', lineHeight: 1.65, paddingLeft: 8 }}>{line}</div>
                                    ))}
                                </div>
                            ))}
                        </TechSection>
                    )}
                    {education.length > 0 && (
                        <TechSection title="education/" color={accentColor}>
                            {education.map(edu => (
                                <div key={edu.id} style={{ marginBottom: 8 }}>
                                    <span style={{ color: accentColor, fontWeight: 700 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</span>
                                    <div style={{ color: '#64748b', fontSize: 9 }}>{edu.institution} · {formatDate(edu.endDate)}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}</div>
                                </div>
                            ))}
                        </TechSection>
                    )}
                    {projects.length > 0 && (
                        <TechSection title="projects/" color={accentColor}>
                            {projects.map(proj => (
                                <div key={proj.id} style={{ marginBottom: 8 }}>
                                    <span style={{ color: accentColor, fontWeight: 700 }}>$ {proj.name}</span>
                                    {proj.url && <span style={{ color: '#475569', fontSize: 8.5 }}> — {proj.url}</span>}
                                    <div style={{ color: '#64748b', fontSize: 9, marginBottom: 2, fontFamily: 'monospace' }}>/* {proj.technologies} */</div>
                                    <div style={{ color: '#94a3b8', fontSize: 9.5, lineHeight: 1.6 }}>{proj.description}</div>
                                </div>
                            ))}
                        </TechSection>
                    )}
                </div>

                {/* Sidebar */}
                <div style={{ width: 175, padding: '18px 14px' }}>
                    {skills.length > 0 && (
                        <TechSection title="skills.json" color={accentColor}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                {skills.map(s => (
                                    <span key={s.id} style={{
                                        fontSize: 8.5, padding: '2px 7px', borderRadius: 3,
                                        background: accentColor + '18', color: accentColor,
                                        border: `1px solid ${accentColor}33`, fontWeight: 600,
                                    }}>{s.name}</span>
                                ))}
                            </div>
                        </TechSection>
                    )}
                    {languages.length > 0 && (
                        <TechSection title="languages/" color={accentColor}>
                            {languages.map(l => (
                                <div key={l.id} style={{ fontSize: 9, marginBottom: 4, color: '#94a3b8' }}>
                                    <span style={{ color: accentColor }}>✓</span> {l.language} <span style={{ color: '#475569' }}>({l.proficiency})</span>
                                </div>
                            ))}
                        </TechSection>
                    )}
                    {certifications.length > 0 && (
                        <TechSection title="certs/" color={accentColor}>
                            {certifications.map(c => (
                                <div key={c.id} style={{ marginBottom: 6 }}>
                                    <div style={{ fontSize: 9, color: '#e2e8f0', fontWeight: 600 }}>{c.name}</div>
                                    <div style={{ fontSize: 8.5, color: '#475569' }}>{c.issuer} · {formatDate(c.date)}</div>
                                </div>
                            ))}
                        </TechSection>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Sub-components ───────────────────────────

function SidebarSection({ title }) {
    return <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.6)', marginBottom: 8, textTransform: 'uppercase' }}>{title}</div>;
}

function ContactItem({ icon, text }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, color: 'rgba(255,255,255,0.85)', wordBreak: 'break-all' }}>
            <span style={{ flexShrink: 0, opacity: 0.7, display: 'flex', alignItems: 'center' }}>{icon}</span>
            <span>{text}</span>
        </div>
    );
}

function CVSection({ title, color, children }) {
    return (
        <div style={{ marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <div style={{ height: 2, width: 16, background: color, borderRadius: 4, flexShrink: 0 }} />
                <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '1.5px', color, textTransform: 'uppercase' }}>{title}</div>
            </div>
            {children}
        </div>
    );
}

function ClassicSection({ title, color, children }) {
    return (
        <div style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${color}44`, paddingBottom: 3, marginBottom: 8 }}>{title}</div>
            {children}
        </div>
    );
}

function CreativeSectionTitle({ title, color }) {
    return (
        <div style={{ fontWeight: 800, fontSize: 10, color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ background: color, width: 3, height: 10, borderRadius: 2, display: 'inline-block' }} />
            {title}
        </div>
    );
}

function ExecSection({ title, gold, children }) {
    return (
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: `2px solid ${gold}`, paddingBottom: 3, marginBottom: 10 }}>{title}</div>
            {children}
        </div>
    );
}

function ExecSideTitle({ title, gold }) {
    return <div style={{ fontSize: 9, fontWeight: 800, color: gold, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>{title}</div>;
}

function TechSection({ title, color, children }) {
    return (
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, color: color + 'cc', fontFamily: 'monospace', marginBottom: 8 }}>
                <span style={{ color: '#475569' }}>## </span>{title}
            </div>
            {children}
        </div>
    );
}
