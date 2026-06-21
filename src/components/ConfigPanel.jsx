import { useStore } from '../hooks/useStore';
import { getTranslation } from '../locales/i18n';

export default function ConfigPanel() {
    const { config, setConfig } = useStore();
    const t = getTranslation(config.lang);

    return (
        <>
            <section className="card delay-1">
                <div className="card-title"><span className="dot"></span> {t.topicLabel || 'Hedef Tanımı'}</div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="inp-konu">{t.topicLabel} <span style={{color: 'var(--accent-1)'}}>*</span></label>
                        <input 
                            type="text" 
                            id="inp-konu" 
                            placeholder={t.topicPlaceholder}
                            value={config.konu}
                            onChange={(e) => setConfig('konu', e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="inp-alan">{t.domainLabel}</label>
                        <input 
                            type="text" 
                            id="inp-alan" 
                            placeholder={t.domainPlaceholder}
                            value={config.alan}
                            onChange={(e) => setConfig('alan', e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <section className="card delay-2">
                <div className="card-title"><span className="dot"></span> Parametreler</div>
                <div className="config-grid">
                    <div className="input-group">
                        <label htmlFor="sel-seviye">{t.levelLabel}</label>
                        <select id="sel-seviye" value={config.seviye} onChange={(e) => setConfig('seviye', e.target.value)}>
                            <option value="otomatik">{t.levels.otomatik}</option>
                            <option value="acemi">{t.levels.acemi}</option>
                            <option value="orta">{t.levels.orta}</option>
                            <option value="ileri">{t.levels.ileri}</option>
                            <option value="uzman">{t.levels.uzman}</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="sel-mod">{t.modeLabel}</label>
                        <select id="sel-mod" value={config.mod} onChange={(e) => setConfig('mod', e.target.value)}>
                            <option value="karma">{t.modes.karma}</option>
                            <option value="feynman">{t.modes.feynman}</option>
                            <option value="sistem">{t.modes.sistem}</option>
                            <option value="sokratik">{t.modes.sokratik}</option>
                            <option value="ilkeler">{t.modes.ilkeler}</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="sel-derinlik">{t.depthLabel}</label>
                        <select id="sel-derinlik" value={config.derinlik} onChange={(e) => setConfig('derinlik', e.target.value)}>
                            <option value="orta">{t.depths.orta}</option>
                            <option value="temel">{t.depths.temel}</option>
                            <option value="derin">{t.depths.derin}</option>
                            <option value="kapsamli">{t.depths.kapsamli}</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="sel-format">{t.formatLabel}</label>
                        <select id="sel-format" value={config.format} onChange={(e) => setConfig('format', e.target.value)}>
                            <option value="markdown">{t.formats.markdown}</option>
                            <option value="tablo">{t.formats.tablo}</option>
                            <option value="ders">{t.formats.ders}</option>
                            <option value="quiz">{t.formats.quiz}</option>
                        </select>
                    </div>
                </div>
                
                <div className="config-grid" style={{ marginTop: '1rem' }}>
                    <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        <label className="toggle-switch">
                            <input type="checkbox" checked={config.monolog} onChange={(e) => setConfig('monolog', e.target.checked)} />
                            <span className="slider"></span>
                        </label>
                        <label style={{ margin: 0, cursor: 'pointer' }} onClick={() => setConfig('monolog', !config.monolog)}>
                            {t.monologLabel}
                        </label>
                    </div>
                    <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        <label className="toggle-switch">
                            <input type="checkbox" checked={config.autoResolveDeps} onChange={(e) => setConfig('autoResolveDeps', e.target.checked)} />
                            <span className="slider"></span>
                        </label>
                        <label style={{ margin: 0, cursor: 'pointer' }} onClick={() => setConfig('autoResolveDeps', !config.autoResolveDeps)}>
                            {t.autoResolveLabel}
                        </label>
                    </div>
                </div>
            </section>
        </>
    );
}
