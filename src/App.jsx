import { useState, useEffect } from 'react';
import Header from './components/Header';
import ConfigPanel from './components/ConfigPanel';
import PresetBar from './components/PresetBar';
import ModuleGrid from './components/ModuleGrid';
import ActionBar from './components/ActionBar';
import PreviewPanel from './components/PreviewPanel';
import Toast from './components/Toast';
import { useStore } from './hooks/useStore';
import { getTranslation } from './locales/i18n';
import './index.css';

export default function App() {
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [toasts, setToasts] = useState([]);
    const { config } = useStore();
    const t = getTranslation(config.lang);

    useEffect(() => {
        const root = document.documentElement;
        if (config.theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
            
            const listener = (e) => root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
            return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
        } else {
            root.setAttribute('data-theme', config.theme);
        }
    }, [config.theme]);

    const showToast = (msg, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [{ id, msg, type }, ...prev]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    return (
        <div className="app">
            <Header />
            <ConfigPanel />
            <PresetBar />
            <ModuleGrid />
            <ActionBar setGeneratedPrompt={setGeneratedPrompt} showToast={showToast} />
            <PreviewPanel generatedPrompt={generatedPrompt} />
            
            <div className="toast-container">
                {toasts.map(toast => (
                    <Toast key={toast.id} msg={toast.msg} type={toast.type} />
                ))}
            </div>

            <footer className="footer">
                <p>{t.footer}</p>
            </footer>
        </div>
    );
}
