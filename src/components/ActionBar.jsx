import { useStore } from '../hooks/useStore';
import { generatePrompt, checkPromptLength } from '../engine/promptCompiler';
import { copyToClipboard, openInAI } from '../utils/aiRouter';
import { SiGooglegemini, SiAnthropic, SiPerplexity, SiOpenaigym } from '@icons-pack/react-simple-icons';
import { getTranslation } from '../locales/i18n';

export default function ActionBar({ setGeneratedPrompt, showToast }) {
    const { config, selectedModules, resetAll } = useStore();
    const t = getTranslation(config.lang);

    const handleGenerate = () => {
        if (!config.konu.trim()) {
            showToast(t.toastNeedTopic, 'warn');
            return;
        }
        if (selectedModules.length === 0) {
            showToast(t.toastNeedModule, 'warn');
            return;
        }
        const prompt = generatePrompt(config, selectedModules);
        setGeneratedPrompt(prompt);
        showToast(t.toastSuccess);
        setTimeout(() => {
            const previewCard = document.getElementById('preview-card');
            if (previewCard) previewCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleCopy = () => {
        const prompt = generatePrompt(config, selectedModules);
        if (!prompt) {
            showToast(t.toastNeedPrompt, 'warn');
            return;
        }
        copyToClipboard(prompt, 
            () => showToast(t.toastCopied),
            () => showToast(t.toastCopyFail, 'warn')
        );
    };

    const handleOpenAI = (aiName) => {
        const prompt = generatePrompt(config, selectedModules);
        if (!prompt) {
            showToast(t.toastNeedPrompt, 'warn');
            return;
        }
        
        openInAI(aiName, prompt, 
            () => showToast(t.toastUrlLimit, 'warn'),
            () => showToast(t.toastOpening)
        );
    };

    return (
        <div className="actions-bar">
            <button className="btn btn-primary" onClick={handleGenerate}>
                <span>🚀</span> {t.btnGenerate}
            </button>
            <button className="btn btn-secondary" onClick={handleCopy}>
                <span>📋</span> {t.btnCopy}
            </button>
            <button className="btn btn-gemini" onClick={() => handleOpenAI('gemini')}>
                <SiGooglegemini size={18} /> Gemini
            </button>
            <button className="btn btn-secondary" style={{ background: '#10a37f', color: '#fff', borderColor: '#10a37f' }} onClick={() => handleOpenAI('chatgpt')}>
                <SiOpenaigym size={18} /> ChatGPT
            </button>
            <button className="btn btn-secondary" style={{ background: '#d97757', color: '#fff', borderColor: '#d97757' }} onClick={() => handleOpenAI('claude')}>
                <SiAnthropic size={18} /> Claude
            </button>
            <button className="btn btn-secondary" style={{ background: '#22b8cd', color: '#fff', borderColor: '#22b8cd' }} onClick={() => handleOpenAI('perplexity')}>
                <SiPerplexity size={18} /> Perplexity
            </button>
            <button className="btn btn-secondary" onClick={() => { resetAll(); setGeneratedPrompt(''); showToast(t.toastReset); }}>
                <span>↺</span> {t.btnReset}
            </button>
        </div>
    );
}
