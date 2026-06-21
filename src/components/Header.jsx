import { useStore } from '../hooks/useStore';
import { getTranslation } from '../locales/i18n';

export default function Header() {
    const { config, setTheme, setConfig } = useStore();
    const t = getTranslation(config.lang);

    const toggleTheme = () => {
        if (config.theme === 'system') setTheme('light');
        else if (config.theme === 'light') setTheme('dark');
        else setTheme('system');
    };

    const toggleLang = () => {
        setConfig('lang', config.lang === 'en' ? 'tr' : 'en');
    };

    const getThemeIcon = () => {
        if (config.theme === 'light') return '☀️';
        if (config.theme === 'dark') return '🌙';
        return '💻';
    };

    return (
        <header className="header" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', right: 0, top: 0, display: 'flex', gap: '8px' }}>
                <button 
                    onClick={toggleLang}
                    style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', padding: '2px 6px', color: 'var(--text-secondary)', fontWeight: 600, transition: 'all 0.2s' }}
                    title={config.lang === 'en' ? 'Türkçe' : 'English'}
                    onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >
                    {config.lang === 'en' ? 'TR' : 'EN'}
                </button>
                <button 
                    onClick={toggleTheme}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', opacity: 0.8, transition: 'opacity 0.2s' }}
                    title={`Theme: ${config.theme}`}
                    onMouseEnter={e => e.target.style.opacity = 1}
                    onMouseLeave={e => e.target.style.opacity = 0.8}
                >
                    {getThemeIcon()}
                </button>
            </div>
            <div className="header-badge">{t.badge}</div>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
        </header>
    );
}
