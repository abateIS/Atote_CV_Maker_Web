import React from 'react';
import { useCV } from '../../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';

export default function EducationForm() {
    const { cvData, addItem, updateItem, removeItem } = useCV();

    const handleAdd = () => {
        addItem('education', { school: '', degree: '', location: '', startDate: '', endDate: '', description: '' });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Education</h2>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Add your academic qualifications starting with your most recent.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {cvData.education.map((edu) => (
                    <div key={edu.id} style={{
                        padding: 20, background: 'var(--bg-base)', borderRadius: 12, border: '1px solid var(--border-subtle)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => removeItem('education', edu.id)}
                            style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        >
                            <Trash2 size={16} />
                        </button>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: 'span 2' }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>School / University</label>
                                <input
                                    type="text"
                                    value={edu.school || ''}
                                    onChange={(e) => updateItem('education', edu.id, { school: e.target.value })}
                                    placeholder="e.g. Addis Ababa University"
                                    style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Degree</label>
                                <input
                                    type="text"
                                    value={edu.degree || ''}
                                    onChange={(e) => updateItem('education', edu.id, { degree: e.target.value })}
                                    placeholder="e.g. B.Sc. in Computer Science"
                                    style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Location</label>
                                <input
                                    type="text"
                                    value={edu.location || ''}
                                    onChange={(e) => updateItem('education', edu.id, { location: e.target.value })}
                                    placeholder="Addis Ababa"
                                    style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Start Date</label>
                                <input
                                    type="month"
                                    value={edu.startDate || ''}
                                    onChange={(e) => updateItem('education', edu.id, { startDate: e.target.value })}
                                    style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>End Date</label>
                                <input
                                    type="month"
                                    value={edu.endDate || ''}
                                    onChange={(e) => updateItem('education', edu.id, { endDate: e.target.value })}
                                    style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 16 }}>
                            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Additional Info (Optional)</label>
                            <textarea
                                value={edu.description || ''}
                                onChange={(e) => updateItem('education', edu.id, { description: e.target.value })}
                                placeholder="GPA, Honors, relevant courses..."
                                style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none', minHeight: 80, resize: 'vertical' }}
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
                    <Plus size={18} /> Add Education
                </button>
            </div>
        </div>
    );
}
