import { useState, useEffect } from 'react';
import Header from './ui/Header';
import ConfigPanel from './ui/ConfigPanel';
import PresetBar from './ui/PresetBar';
import ModuleGrid from './ui/ModuleGrid';
import TopicInput from './ui/TopicInput';
import ActionBar from './ui/ActionBar';
import PreviewPanel from './ui/PreviewPanel';
import Toast from './ui/Toast';
import OnboardingTour from './ui/OnboardingTour';
import { useEngineState } from './state/engineState';
import { getTranslation } from './locales/i18n';
import './index.css';

export default function App() {
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [toasts, setToasts] = useState([]);
    const state = useEngineState();
    const { config, startTour } = state;
    const t = getTranslation(config.lang);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const tourCompleted = localStorage.getItem('prompter-tour-completed') === 'true';
        if (!tourCompleted && !isMobile) {
            startTour();
        }
    }, [startTour]);

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
            <main className="container">
                <div className="layout-grid-3">
                    <div className="sidebar">
                        <ConfigPanel />
                    </div>
                    <div className="main-content">
                        <PresetBar />
                        <ModuleGrid />
                    </div>
                    <div className="right-sidebar">
                        <TopicInput />
                        <ActionBar setGeneratedPrompt={setGeneratedPrompt} showToast={showToast} />
                        <PreviewPanel generatedPrompt={generatedPrompt} />
                    </div>
                </div>
            </main>
            
            <div className="toast-container">
                {toasts.map(toast => (
                    <Toast key={toast.id} msg={toast.msg} type={toast.type} />
                ))}
            </div>
            <OnboardingTour />
        </div>
    );
}
