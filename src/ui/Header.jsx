import { useEngineState } from '../state/engineState';
import { getTranslation } from '../locales/i18n';
import { Sun, Moon, HelpCircle } from 'lucide-react';

export default function Header() {
    const { config, setTheme, setConfig, startTour } = useEngineState();
    const t = getTranslation(config.lang);

    const toggleTheme = () => {
        setTheme(config.theme === 'light' ? 'dark' : 'light');
    };

    const toggleLang = () => {
        setConfig('lang', config.lang === 'en' ? 'tr' : 'en');
    };

    const ThemeIcon = () => {
        if (config.theme === 'light') return <Moon size={18} strokeWidth={1.5} />;
        return <Sun size={18} strokeWidth={1.5} />;
    };

    return (
        <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <div>
                <h1>{t.title}</h1>
                <p>{t.subtitle}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                <button 
                    onClick={startTour}
                    className="header-tour-btn"
                    style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', width: '28px', height: '28px' }}
                    title={t.tour?.btnReplay || 'Quick Tour'}
                    onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >
                    <HelpCircle size={18} strokeWidth={1.5} />
                </button>
                <button 
                    onClick={toggleLang}
                    style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', padding: '2px 8px', color: 'var(--text-secondary)', fontWeight: 600, transition: 'all 0.2s', height: '28px', display: 'flex', alignItems: 'center' }}
                    title={config.lang === 'en' ? 'Türkçe' : 'English'}
                    onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >
                    {config.lang === 'en' ? 'TR' : 'EN'}
                </button>
                <button 
                    onClick={toggleTheme}
                    style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', width: '28px', height: '28px' }}
                    title={`Theme: ${config.theme}`}
                    onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >
                    <ThemeIcon />
                </button>
            </div>
        </header>
    );
}
