import React from 'react';
import { useCV } from '../../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';

function FormLabel({ children }) {
    return <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>{children}</label>;
}

export default function SkillsForm() {
    const { cvData, addItem, updateItem, removeItem } = useCV();

    const handleAdd = () => addItem('skills', { name: '', level: 80 });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Skills</h3>
                <button onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: 'var(--color-primary-light)', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
                    <Plus size={13} /> Add Skill
                </button>
            </div>

            {cvData.skills.length === 0 && (
                <div style={{ textAlign: 'center', padding: '32px 20px', color: 'var(--text-muted)', fontSize: 13, border: '2px dashed var(--border-subtle)', borderRadius: 10 }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
                    Click "Add Skill" to add your skills
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cvData.skills.map(skill => (
                    <div key={skill.id} style={{ padding: '12px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 8 }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                            <input
                                placeholder="e.g. React / Next.js"
                                value={skill.name}
                                onChange={e => updateItem('skills', skill.id, { name: e.target.value })}
                                style={{ flex: 1 }}
                            />
                            <button onClick={() => removeItem('skills', skill.id)} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '6px 8px', borderRadius: 5, flexShrink: 0 }}>
                                <Trash2 size={13} />
                            </button>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <FormLabel>Proficiency Level</FormLabel>
                                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary-light)' }}>{skill.level}%</span>
                            </div>
                            <input
                                type="range" min={10} max={100} step={5}
                                value={skill.level}
                                onChange={e => updateItem('skills', skill.id, { level: parseInt(e.target.value) })}
                                style={{
                                    width: '100%', cursor: 'pointer',
                                    accentColor: 'var(--color-primary)', height: 4, background: 'transparent',
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                                <span>Beginner</span><span>Intermediate</span><span>Expert</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 16, padding: 12, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: 'var(--color-success)', lineHeight: 1.7 }}>
                    💡 <strong>Tip:</strong> List 6–10 most relevant skills. Order them from strongest to weakest.
                </div>
            </div>
        </div>
    );
}
