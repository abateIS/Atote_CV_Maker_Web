import React from 'react';
import { useCV } from '../../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';

function FormLabel({ children }) {
    return <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>{children}</label>;
}

const PROFICIENCY_LEVELS = ['Native', 'Fluent', 'Professional', 'Conversational', 'Basic'];

export default function LanguagesForm() {
    const { cvData, addItem, updateItem, removeItem } = useCV();

    const handleAdd = () => addItem('languages', { language: '', proficiency: 'Conversational' });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Languages</h3>
                <button onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: 'var(--color-primary-light)', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
                    <Plus size={13} /> Add Language
                </button>
            </div>

            {cvData.languages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '32px 20px', color: 'var(--text-muted)', fontSize: 13, border: '2px dashed var(--border-subtle)', borderRadius: 10 }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>🌍</div>
                    Click "Add Language" to add your language skills
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cvData.languages.map(lang => (
                    <div key={lang.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10, alignItems: 'end', padding: '12px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 8 }}>
                        <div>
                            <FormLabel>Language</FormLabel>
                            <input placeholder="English" value={lang.language} onChange={e => updateItem('languages', lang.id, { language: e.target.value })} />
                        </div>
                        <div>
                            <FormLabel>Proficiency</FormLabel>
                            <select value={lang.proficiency} onChange={e => updateItem('languages', lang.id, { proficiency: e.target.value })}>
                                {PROFICIENCY_LEVELS.map(lv => <option key={lv} value={lv}>{lv}</option>)}
                            </select>
                        </div>
                        <button onClick={() => removeItem('languages', lang.id)} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '8px 10px', borderRadius: 6, marginBottom: 0, height: 38 }}>
                            <Trash2 size={13} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
