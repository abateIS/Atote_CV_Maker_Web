import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const defaultEdu = { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', honors: '' };

function FormLabel({ children }) {
    return <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>{children}</label>;
}

export default function EducationForm() {
    const { cvData, addItem, updateItem, removeItem } = useCV();
    const [expanded, setExpanded] = useState(null);

    const handleAdd = () => {
        addItem('education', defaultEdu);
        setExpanded(Date.now());
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Education</h3>
                <button onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: 'var(--color-primary-light)', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
                    <Plus size={13} /> Add Education
                </button>
            </div>

            {cvData.education.length === 0 && (
                <div style={{ textAlign: 'center', padding: '32px 20px', color: 'var(--text-muted)', fontSize: 13, border: '2px dashed var(--border-subtle)', borderRadius: 10 }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>🎓</div>
                    Click "Add Education" to add your academic background
                </div>
            )}

            {cvData.education.map((edu, idx) => {
                const isOpen = expanded === edu.id || (expanded === null && idx === 0);
                return (
                    <div key={edu.id} style={{ border: '1px solid var(--border-default)', borderRadius: 10, marginBottom: 10, overflow: 'hidden' }}>
                        <div onClick={() => setExpanded(isOpen ? null : edu.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', cursor: 'pointer', background: 'var(--bg-surface)' }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 13 }}>{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{edu.institution || 'Institution'}</div>
                            </div>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <button onClick={e => { e.stopPropagation(); removeItem('education', edu.id); }} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '4px 8px', borderRadius: 5 }}>
                                    <Trash2 size={13} />
                                </button>
                                {isOpen ? <ChevronUp size={15} color="var(--text-muted)" /> : <ChevronDown size={15} color="var(--text-muted)" />}
                            </div>
                        </div>
                        {isOpen && (
                            <div style={{ padding: '14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div><FormLabel>Institution *</FormLabel><input placeholder="University of California, Berkeley" value={edu.institution} onChange={e => updateItem('education', edu.id, { institution: e.target.value })} /></div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div><FormLabel>Degree *</FormLabel><input placeholder="Bachelor of Science" value={edu.degree} onChange={e => updateItem('education', edu.id, { degree: e.target.value })} /></div>
                                    <div><FormLabel>Field of Study</FormLabel><input placeholder="Computer Science" value={edu.field} onChange={e => updateItem('education', edu.id, { field: e.target.value })} /></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div><FormLabel>Start Date</FormLabel><input type="month" value={edu.startDate} onChange={e => updateItem('education', edu.id, { startDate: e.target.value })} /></div>
                                    <div><FormLabel>End Date</FormLabel><input type="month" value={edu.endDate} onChange={e => updateItem('education', edu.id, { endDate: e.target.value })} /></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div><FormLabel>GPA (optional)</FormLabel><input placeholder="3.8" value={edu.gpa} onChange={e => updateItem('education', edu.id, { gpa: e.target.value })} /></div>
                                    <div><FormLabel>Honors (optional)</FormLabel><input placeholder="Magna Cum Laude" value={edu.honors} onChange={e => updateItem('education', edu.id, { honors: e.target.value })} /></div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
