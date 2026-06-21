import { useStore } from '../hooks/useStore';
import { getPresets } from '../data/presets';
import { getTranslation } from '../locales/i18n';

export default function PresetBar() {
    const { config, setModules } = useStore();
    const t = getTranslation(config.lang);
    const presets = getPresets(config.lang);

    return (
        <section className="card delay-3">
            <div className="card-title"><span className="dot"></span> {t.presetsTitle}</div>
            <div className="presets-row">
                <button className="preset-btn" onClick={() => setModules(presets.hizli)}>{t.presets.hizli}</button>
                <button className="preset-btn" onClick={() => setModules(presets.derin)}>{t.presets.derin}</button>
                <button className="preset-btn" onClick={() => setModules(presets.sinav)}>{t.presets.sinav}</button>
                <button className="preset-btn" onClick={() => setModules(presets.muhendis)}>{t.presets.muhendis}</button>
                <button className="preset-btn" onClick={() => setModules(presets.tam)}>{t.presets.tam}</button>
                {/* Expand presets */}
                <button className="preset-btn" onClick={() => setModules(presets.arastirmaci)}>{t.presets.arastirmaci}</button>
                <button className="preset-btn" onClick={() => setModules(presets.temeller)}>{t.presets.temeller}</button>
                <button className="preset-btn" onClick={() => setModules(presets.pratik)}>{t.presets.pratik}</button>
                <button className="preset-btn" onClick={() => setModules(presets.hataAyiplama)}>{t.presets.hata}</button>
            </div>
        </section>
    );
}
