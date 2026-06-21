import { checkPromptLength } from '../engine/promptCompiler';
import { useStore } from '../hooks/useStore';
import { getTranslation } from '../locales/i18n';

export default function PreviewPanel({ generatedPrompt }) {
    const { config, selectedModules } = useStore();
    const t = getTranslation(config.lang);

    const { chars, tokens, isTooLongForUrl } = checkPromptLength(generatedPrompt);

    return (
        <section className="card" id="preview-card" style={{ marginTop: '2rem' }}>
            <div className="preview-header">
                <div className="card-title" style={{ marginBottom: 0 }}>
                    <span className="dot" style={{ background: 'var(--accent-2)' }}></span> {t.previewTitle}
                </div>
                {generatedPrompt && (
                    <div className="preview-stats">
                        <span className="stat-chip">{chars} {t.previewChars}</span>
                        <span className="stat-chip">~{tokens} {t.previewTokens}</span>
                        <span className="stat-chip">{selectedModules.length} {t.previewModules}</span>
                    </div>
                )}
            </div>

            {isTooLongForUrl && generatedPrompt && (
                <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem', color: '#fca5a5' }}>
                    {t.previewWarning}
                </div>
            )}

            {generatedPrompt ? (
                <div className="preview-box">
                    {generatedPrompt}
                </div>
            ) : (
                <div className="preview-empty">
                    {t.previewEmpty}
                </div>
            )}
        </section>
    );
}
