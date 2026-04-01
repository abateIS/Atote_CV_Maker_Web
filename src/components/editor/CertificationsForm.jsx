import React from 'react';
import { useCV } from '../../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';
import MonthYearPicker from './MonthYearPicker';

import FormNav from './FormNav';

export default function CertificationsForm({ onNext, onBack }) {
    const { cvData, addItem, updateItem, removeItem } = useCV();

    const handleAdd = () => {
        addItem('certifications', { name: '', issuer: '', date: '' });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Certifications</h2>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Showcase your specialized training and recognized achievements.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {cvData.certifications.map((cert) => (
                    <div key={cert.id} style={{
                        padding: 20, background: 'var(--bg-base)', borderRadius: 12, border: '1px solid var(--border-subtle)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => removeItem('certifications', cert.id)}
                            style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        >
                            <Trash2 size={16} />
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Certification Name</label>
                                <input
                                    type="text"
                                    value={cert.name || ''}
                                    onChange={(e) => updateItem('certifications', cert.id, { name: e.target.value })}
                                    placeholder="e.g. AWS Solutions Architect"
                                    style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Issuer</label>
                                    <input
                                        type="text"
                                        value={cert.issuer || ''}
                                        onChange={(e) => updateItem('certifications', cert.id, { issuer: e.target.value })}
                                        placeholder="e.g. Amazon"
                                        style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                                    />
                                </div>
                                <MonthYearPicker
                                    label="Issue Date"
                                    value={cert.date || ''}
                                    onChange={(val) => updateItem('certifications', cert.id, { date: val })}
                                />
                            </div>
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
                    <Plus size={18} /> Add Certification
                </button>
            </div>

            <FormNav onNext={onNext} onBack={onBack} nextLabel="Next: Projects" />
        </div>
    );
}
