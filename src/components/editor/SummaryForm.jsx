import React from 'react';
import { useCV } from '../../context/CVContext';
import FormNav from './FormNav';

export default function SummaryForm({ onNext, onBack }) {
    const { cvData, updateSummary } = useCV();

    return (
        <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>Professional Summary</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.6 }}>
                Write 2–4 sentences summarizing your experience, key strengths, and career goals. This is the first thing recruiters read.
            </p>
            <textarea
                value={cvData.summary}
                onChange={(e) => updateSummary(e.target.value)}
                rows={6}
                placeholder="Passionate software engineer with 7+ years of experience building scalable web applications. Proven track record of leading cross-functional teams and delivering high-impact features..."
                style={{ resize: 'vertical', lineHeight: 1.7 }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{cvData.summary.length} characters</span>
            </div>

            {/* Tips */}
            <div style={{ marginTop: 20, padding: 14, background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary-light)', marginBottom: 8 }}>💡 Tips for a Great Summary</div>
                <ul style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16 }}>
                    <li>Start with your years of experience and main specialization</li>
                    <li>Mention 2–3 key achievements or skills</li>
                    <li>Tailor it to the specific role you're applying for</li>
                    <li>Keep it to 3–5 sentences max</li>
                </ul>
            </div>

            <FormNav onNext={onNext} onBack={onBack} nextLabel="Next: Work Experience" />
        </div>
    );
}
