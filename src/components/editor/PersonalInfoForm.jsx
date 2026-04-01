import React, { useRef } from 'react';
import { useCV } from '../../context/CVContext';
import { Upload, X } from 'lucide-react';

function FormLabel({ children }) {
    return <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>{children}</label>;
}

function FormGroup({ children, style }) {
    return <div style={{ marginBottom: 14, ...style }}>{children}</div>;
}

function FormRow({ children }) {
    return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>{children}</div>;
}

import FormNav from './FormNav';

export default function PersonalInfoForm({ onNext }) {
    const { cvData, updatePersonalInfo } = useCV();
    const p = cvData.personalInfo;
    const fileRef = useRef();

    const field = (key) => ({
        value: p[key] || '',
        onChange: (e) => updatePersonalInfo({ [key]: e.target.value }),
    });

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => updatePersonalInfo({ photo: ev.target.result });
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18, color: 'var(--text-primary)' }}>Personal Information</h3>

            {/* Photo */}
            <FormGroup>
                <FormLabel>Profile Photo (optional)</FormLabel>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--bg-surface)', border: '2px dashed var(--border-default)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {p.photo ? (
                            <img src={p.photo} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <span style={{ fontSize: 24, color: 'var(--text-muted)' }}>👤</span>
                        )}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => fileRef.current.click()} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: 'var(--color-primary-light)', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
                            <Upload size={12} /> Upload
                        </button>
                        {p.photo && (
                            <button onClick={() => updatePersonalInfo({ photo: '' })} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--color-danger)', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-sans)' }}>
                                <X size={12} /> Remove
                            </button>
                        )}
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
                </div>
            </FormGroup>

            <FormRow>
                <FormGroup><FormLabel>First Name *</FormLabel><input placeholder="Alex" {...field('firstName')} /></FormGroup>
                <FormGroup><FormLabel>Last Name *</FormLabel><input placeholder="Johnson" {...field('lastName')} /></FormGroup>
            </FormRow>

            <FormGroup>
                <FormLabel>Professional Title *</FormLabel>
                <input placeholder="Senior Software Engineer" {...field('title')} />
            </FormGroup>

            <FormRow>
                <FormGroup><FormLabel>Email *</FormLabel><input type="email" placeholder="alex@email.com" {...field('email')} /></FormGroup>
                <FormGroup><FormLabel>Phone</FormLabel><input placeholder="+1 (555) 234-5678" {...field('phone')} /></FormGroup>
            </FormRow>

            <FormGroup>
                <FormLabel>Location</FormLabel>
                <input placeholder="San Francisco, CA" {...field('location')} />
            </FormGroup>

            <FormGroup>
                <FormLabel>LinkedIn URL</FormLabel>
                <input placeholder="linkedin.com/in/alexjohnson" {...field('linkedin')} />
            </FormGroup>

            <FormRow>
                <FormGroup><FormLabel>GitHub</FormLabel><input placeholder="github.com/alexjohnson" {...field('github')} /></FormGroup>
                <FormGroup><FormLabel>Website</FormLabel><input placeholder="alexjohnson.dev" {...field('website')} /></FormGroup>
            </FormRow>

            <FormNav onNext={onNext} nextLabel="Next: Summary" />
        </div>
    );
}
