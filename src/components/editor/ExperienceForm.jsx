import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const defaultExp = { company: '', position: '', startDate: '', endDate: '', current: false, location: '', description: '' };

function FormLabel({ children }) {
    return <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>{children}</label>;
}

export default function ExperienceForm() {
    const { cvData, addItem, updateItem, removeItem } = useCV();
    const [expanded, setExpanded] = useState(null);

    const handleAdd = () => {
        addItem('experience', defaultExp);
        setExpanded(Date.now());
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Work Experience</h3>
                <button onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: 'var(--color-primary-light)', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
                    <Plus size={13} /> Add Job
                </button>
            </div>

            {cvData.experience.length === 0 && (
                <div style={{ textAlign: 'center', padding: '32px 20px', color: 'var(--text-muted)', fontSize: 13, border: '2px dashed var(--border-subtle)', borderRadius: 10 }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>💼</div>
                    Click "Add Job" to add your work experience
                </div>
            )}

            {cvData.experience.map((exp, idx) => {
                const isOpen = expanded === exp.id || (expanded === null && idx === 0);
                return (
                    <div key={exp.id} style={{ border: '1px solid var(--border-default)', borderRadius: 10, marginBottom: 10, overflow: 'hidden' }}>
                        <div
                            onClick={() => setExpanded(isOpen ? null : exp.id)}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', cursor: 'pointer', background: 'var(--bg-surface)' }}
                        >
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 13 }}>{exp.position || 'New Position'}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{exp.company || 'Company'}</div>
                            </div>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <button onClick={(e) => { e.stopPropagation(); removeItem('experience', exp.id); }} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '4px 8px', borderRadius: 5 }}>
                                    <Trash2 size={13} />
                                </button>
                                {isOpen ? <ChevronUp size={15} color="var(--text-muted)" /> : <ChevronDown size={15} color="var(--text-muted)" />}
                            </div>
                        </div>

                        {isOpen && (
                            <div style={{ padding: '14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div><FormLabel>Job Title *</FormLabel><input placeholder="Senior Engineer" value={exp.position} onChange={e => updateItem('experience', exp.id, { position: e.target.value })} /></div>
                                    <div><FormLabel>Company *</FormLabel><input placeholder="TechCorp" value={exp.company} onChange={e => updateItem('experience', exp.id, { company: e.target.value })} /></div>
                                </div>
                                <div><FormLabel>Location</FormLabel><input placeholder="San Francisco, CA" value={exp.location} onChange={e => updateItem('experience', exp.id, { location: e.target.value })} /></div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div><FormLabel>Start Date</FormLabel><input type="month" value={exp.startDate} onChange={e => updateItem('experience', exp.id, { startDate: e.target.value })} /></div>
                                    <div><FormLabel>End Date</FormLabel><input type="month" value={exp.endDate} onChange={e => updateItem('experience', exp.id, { endDate: e.target.value })} disabled={exp.current} /></div>
                                </div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
                                    <input type="checkbox" checked={exp.current} onChange={e => updateItem('experience', exp.id, { current: e.target.checked, endDate: e.target.checked ? '' : exp.endDate })} style={{ width: 'auto', cursor: 'pointer' }} />
                                    <span style={{ color: 'var(--text-secondary)' }}>I currently work here</span>
                                </label>
                                <div>
                                    <FormLabel>Description & Achievements</FormLabel>
                                    <textarea rows={5} placeholder="• Led development of microservices serving 5M+ daily users&#10;• Reduced API latency by 40% through query optimization&#10;• Mentored 6 junior engineers" value={exp.description} onChange={e => updateItem('experience', exp.id, { description: e.target.value })} style={{ resize: 'vertical', lineHeight: 1.7 }} />
                                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Start each bullet with • for best formatting</p>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
