import { useStore } from '../hooks/useStore';
import { getModules } from '../data/modules';
import { getTranslation } from '../locales/i18n';

export default function ModuleGrid() {
    const { config, selectedModules, setModules } = useStore();
    const modules = getModules(config.lang);
    const t = getTranslation(config.lang);

    const toggleModule = (id) => {
        if (selectedModules.includes(id)) {
            setModules(selectedModules.filter(m => m !== id));
        } else {
            setModules([...selectedModules, id]);
        }
    };

    return (
        <section className="card delay-4">
            <div className="modules-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div className="title-side">
                    <div className="card-title" style={{ marginBottom: 0 }}>
                        <span className="dot"></span> {t.modulesTitle}
                    </div>
                    <span className="module-counter" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '10px' }}>
                        {selectedModules.length} / {modules.length}
                    </span>
                </div>
                <div className="modules-actions" style={{ display: 'flex', gap: '8px' }}>
                    <button 
                        className="btn btn-secondary" 
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }} 
                        onClick={() => setModules(modules.map(m => m.id))}
                    >
                        {t.selectAll}
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }} 
                        onClick={() => setModules([])}
                    >
                        {t.clearAll}
                    </button>
                </div>
            </div>
            
            <div className="modules-grid">
                {modules.map(mod => (
                    <div 
                        key={mod.id} 
                        className={`module-card ${selectedModules.includes(mod.id) ? 'active' : ''}`}
                        onClick={() => toggleModule(mod.id)}
                        title={mod.explain + (mod.requires.length ? `\n\n${t.reqsLabel}: ` + mod.requires.join(', ') : '')}
                    >
                        <div className="module-icon">{mod.icon}</div>
                        <div className="module-info">
                            <div className="module-name">{mod.name}</div>
                            <div className="module-desc">{mod.desc}</div>
                        </div>
                        <div className="module-toggle"></div>
                    </div>
                ))}
            </div>
        </section>
    );
}
