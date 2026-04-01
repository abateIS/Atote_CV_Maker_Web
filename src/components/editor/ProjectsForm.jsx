import React from 'react';
import { useCV } from '../../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';

function FormLabel({ children }) {
    return <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>{children}</label>;
}

import FormNav from './FormNav';

export default function ProjectsForm({ onNext, onBack, isLast, onExport }) {
    const { cvData, addItem, updateItem, removeItem } = useCV();

    const handleAdd = () => addItem('projects', { name: '', description: '', url: '', technologies: '' });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Projects</h3>
                <button onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: 'var(--color-primary-light)', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
                    <Plus size={13} /> Add Project
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {cvData.projects.map(proj => (
                    <div key={proj.id} style={{ padding: '14px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <div style={{ flex: 1 }}><FormLabel>Project Name *</FormLabel><input placeholder="OpenCommerce" value={proj.name} onChange={e => updateItem('projects', proj.id, { name: e.target.value })} /></div>
                            <button onClick={() => removeItem('projects', proj.id)} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '6px 10px', borderRadius: 6, alignSelf: 'flex-end', height: 38 }}>
                                <Trash2 size={13} />
                            </button>
                        </div>
                        <div><FormLabel>Technologies Used</FormLabel><input placeholder="Next.js, PostgreSQL, Stripe, TypeScript" value={proj.technologies} onChange={e => updateItem('projects', proj.id, { technologies: e.target.value })} /></div>
                        <div><FormLabel>Project URL (optional)</FormLabel><input placeholder="github.com/yourname/project or live link" value={proj.url} onChange={e => updateItem('projects', proj.id, { url: e.target.value })} /></div>
                        <div>
                            <FormLabel>Description *</FormLabel>
                            <textarea rows={3} placeholder="Describe what you built, its impact, and key features..." value={proj.description} onChange={e => updateItem('projects', proj.id, { description: e.target.value })} style={{ resize: 'vertical', lineHeight: 1.6 }} />
                        </div>
                    </div>
                ))}
            </div>

            <FormNav onNext={onNext} onBack={onBack} isLast={isLast} onExport={onExport} />
        </div>
    );
}
