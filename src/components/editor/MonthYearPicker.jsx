import React from 'react';

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MonthYearPicker({ value, onChange, label }) {
    // value is expected as "YYYY-MM"
    const [year, month] = (value || '').split('-');

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    const handleYearChange = (e) => {
        const newYear = e.target.value;
        const newMonth = month || '01';
        onChange(`${newYear}-${newMonth}`);
    };

    const handleMonthChange = (e) => {
        const newMonth = e.target.value;
        const newYear = year || currentYear.toString();
        onChange(`${newYear}-${newMonth}`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
            {label && <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>{label}</label>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <select
                    value={month || ''}
                    onChange={handleMonthChange}
                    style={{
                        padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)',
                        background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none',
                        fontSize: 13, cursor: 'pointer'
                    }}
                >
                    <option value="" disabled>Month</option>
                    {MONTHS.map((m, i) => (
                        <option key={m} value={(i + 1).toString().padStart(2, '0')}>{m}</option>
                    ))}
                </select>
                <select
                    value={year || ''}
                    onChange={handleYearChange}
                    style={{
                        padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-default)',
                        background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none',
                        fontSize: 13, cursor: 'pointer'
                    }}
                >
                    <option value="" disabled>Year</option>
                    {years.map(y => (
                        <option key={y} value={y.toString()}>{y}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
