import React from 'react';
import { useCV } from '../../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';

function FormLabel({ children }) {
    return <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>{children}</label>;
}

export default function CertificationsForm() {
    const { cvData, addItem, updateItem, removeItem } = useCV();

    const handleAdd = () => addItem('certifications', { name: '', issuer: '', date: '', url: '' });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Certifications</h3>
                <button onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: 'var(--color-primary-light)', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
                    <Plus size={13} /> Add Certification
                </button>
            </div>

            {cvData.certifications.length === 0 && (
                <div style={{ textAlign: 'center', padding: '32px 20px', color: 'var(--text-muted)', fontSize: 13, border: '2px dashed var(--border-subtle)', borderRadius: 10 }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>🏆</div>
                    Click "Add Certification" to add your certifications
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {cvData.certifications.map(cert => (
                    <div key={cert.id} style={{ padding: '14px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <div style={{ flex: 1 }}><FormLabel>Certification Name *</FormLabel><input placeholder="AWS Solutions Architect" value={cert.name} onChange={e => updateItem('certifications', cert.id, { name: e.target.value })} /></div>
                            <button onClick={() => removeItem('certifications', cert.id)} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '6px 10px', borderRadius: 6, alignSelf: 'flex-end', height: 38 }}>
                                <Trash2 size={13} />
                            </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            <div><FormLabel>Issuing Organization</FormLabel><input placeholder="Amazon Web Services" value={cert.issuer} onChange={e => updateItem('certifications', cert.id, { issuer: e.target.value })} /></div>
                            <div><FormLabel>Date Obtained</FormLabel><input type="month" value={cert.date} onChange={e => updateItem('certifications', cert.id, { date: e.target.value })} /></div>
                        </div>
                        <div><FormLabel>Certificate URL (optional)</FormLabel><input placeholder="https://..." value={cert.url} onChange={e => updateItem('certifications', cert.id, { url: e.target.value })} /></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
