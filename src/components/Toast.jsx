import { useEffect, useState } from 'react';

export default function Toast({ toasts }) {
    return (
        <div className="toast-container">
            {toasts.map(t => (
                <div key={t.id} className={`toast ${t.out ? 'out' : ''}`} style={t.type === 'warn' ? { borderColor: 'rgba(245,158,11,0.5)' } : {}}>
                    {t.msg}
                </div>
            ))}
        </div>
    );
}
