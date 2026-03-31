import React from 'react';
import { useCV } from '../../context/CVContext';
import { Plus, Trash2, Calendar } from 'lucide-react';

export default function ExperienceForm() {
    const { cvData, setCVData } = useCV();

    const handleAdd = () => {
        setCVData({
            ...cvData,
            experience: [
                ...cvData.experience,
                { id: Date.now().toString(), company: '', role: '', location: '', startDate: '', endDate: '', current: false, description: '' }
            ]
        });
    };

    const handleRemove = (id) => {
        setCVData({
            ...cvData,
            experience: cvData.experience.filter(exp => exp.id !== id)
        });
    };

    const handleChange = (id, field, value) => {
        setCVData({
            ...cvData,
            experience: cvData.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Work Experience</h2>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Add your professional background starting with your most recent role.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {cvData.experience.map((exp, index) => (
                    <div key={exp.id} style={{
                        padding: 20, background: 'var(--bg-base)', borderRadius: 12, border: '1px solid var(--border-subtle)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => handleRemove(exp.id)}
                            style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        >
                            <Trash2 size={16} />
                        </button>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Job Title</label>
                                <input
                                    type="text"
                                    value={exp.role || ''}
                                    onChange={(e) => handleChange(exp.id, 'role', e.target.value)}
                                    placeholder="e.g. Senior Developer"
                                    style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Company</label>
                                <input
                                    type="text"
                                    value={exp.company || ''}
                                    onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                                    placeholder="e.g. Ethio Telecom"
                                    style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Location</label>
                                <input
                                    type="text"
                                    value={exp.location || ''}
                                    onChange={(e) => handleChange(exp.id, 'location', e.target.value)}
                                    placeholder="Addis Ababa"
                                    style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 28 }}>
                                <input
                                    type="checkbox"
                                    checked={exp.current}
                                    onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
                                    id={`current-${exp.id}`}
                                />
                                <label htmlFor={`current-${exp.id}`} style={{ fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>I work here currently</label>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Start Date</label>
                                <input
                                    type="month"
                                    value={exp.startDate || ''}
                                    onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                                    style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                                />
                            </div>
                            {!exp.current && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>End Date</label>
                                    <input
                                        type="month"
                                        value={exp.endDate || ''}
                                        onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                                        style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                                    />
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 16 }}>
                            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Description</label>
                            <textarea
                                value={exp.description || ''}
                                onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
                                placeholder="Briefly describe your responsibilities and achievements..."
                                style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none', minHeight: 100, resize: 'vertical' }}
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
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-default)'}
                >
                    <Plus size={18} /> Add Experience
                </button>
            </div>
        </div>
    );
}
