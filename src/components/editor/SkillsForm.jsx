import React from 'react';
import { useCV } from '../../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';
import FormNav from './FormNav';

function FormLabel({ children }) {
    return <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>{children}</label>;
}

export default function SkillsForm({ onNext, onBack }) {
    const { cvData, addItem, updateItem, removeItem } = useCV();

    const handleAdd = () => {
        addItem('skills', { name: '', level: 80 });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Skills</h2>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Showcase your technical and soft skills.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {cvData.skills.map((skill) => (
                    <div key={skill.id} style={{
                        padding: 16, background: 'var(--bg-base)', borderRadius: 12, border: '1px solid var(--border-subtle)',
                        display: 'flex', flexDirection: 'column', gap: 12, position: 'relative'
                    }}>
                        <button
                            onClick={() => removeItem('skills', skill.id)}
                            style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        >
                            <Trash2 size={14} />
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Skill Name</label>
                            <input
                                type="text"
                                value={skill.name || ''}
                                onChange={(e) => updateItem('skills', skill.id, { name: e.target.value })}
                                placeholder="e.g. React.js, Project Management"
                                style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Proficiency</label>
                                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-primary-light)' }}>{skill.level}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100" step="5"
                                value={skill.level || 0}
                                onChange={(e) => updateItem('skills', skill.id, { level: parseInt(e.target.value) })}
                                style={{ cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                            />
                        </div>
                    </div>
                ))}

                <button
                    onClick={handleAdd}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: '12px', border: '2px dashed var(--border-default)', borderRadius: 12,
                        background: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600,
                    }}
                >
                    <Plus size={18} /> Add Skill
                </button>
            </div>

            <FormNav onNext={onNext} onBack={onBack} nextLabel="Next: Languages" />
        </div>
    );
}
