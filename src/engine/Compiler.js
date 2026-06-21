import { DependencyGraph } from './DAG';

export class PromptCompiler {
    constructor(modulesJson, textsJson) {
        this.graph = new DependencyGraph(modulesJson);
        this.texts = textsJson;
    }

    // Pipeline Execution
    compile(state) {
        // Phase 1: Input State Validation
        const { config, selectedIds } = state;
        if (!config.konu || selectedIds.length === 0) return "";

        // Phase 2: Transform (DAG Resolution & Topological Sort)
        const finalIds = config.autoResolveDeps ? this.graph.resolveDependencies(selectedIds) : selectedIds;
        const sortedModules = this.graph.topologicalSort(finalIds);

        // Phase 3: Render (Emission to target string format)
        return this.render(config, sortedModules);
    }

    render(config, sortedModules) {
        const { lang, mod, derinlik, format, alan, seviye, monolog, konu } = config;
        let parts = [];

        // System role
        parts.push(`SİSTEM ROLÜ:\n${this.texts.mod[mod] || this.texts.mod.karma}`);

        // Monologue Mode
        if (monolog) {
            parts.push(lang === 'en' 
                ? `INTERNAL MONOLOGUE MODE:\nBefore answering each module, evaluate the boundary conditions of the topic using your internal monologue (<thinking> tags) from at least 3 different perspectives. Do not show this internal monologue in the final output to the user, just use it to produce a higher quality final response.`
                : `İÇ SES (REASONING) MODU:\nHer modülü yanıtlamadan önce, konunun sınır koşullarını kendi iç sesinle (internal monologue / <thinking> tagleri içerisinde) en az 3 farklı açıdan değerlendir. Ancak nihai kullanıcı çıktısına bu iç sesi yansıtma, sadece daha kaliteli bir nihai yanıt üretmek için kullan.`);
        }

        // Context / Objective
        parts.push(lang === 'en' 
            ? `OBJECTIVE:\nTo understand the topic "${konu}" not superficially, but at a mechanical and causal level.`
            : `AMAÇ:\n"${konu}" konusunu yüzeysel değil, mekanik ve nedensel seviyede anlamamı sağlamak.`);

        // User Profile
        const seviyeLabel = seviye === 'otomatik' 
            ? (lang === 'en' ? 'AI will determine' : 'AI tarafından belirlenecek') 
            : seviye.charAt(0).toUpperCase() + seviye.slice(1);
        parts.push(lang === 'en'
            ? `USER PROFILE:\nDomain Knowledge: ${alan || 'Not specified'}\nLevel: ${seviyeLabel}`
            : `KULLANICI PROFİLİ:\nHakim Alan: ${alan || 'Belirtilmedi'}\nSeviye: ${seviyeLabel}`);

        // Depth
        parts.push((lang === 'en' ? `ANALYSIS DEPTH:\n` : `ANALİZ DERİNLİĞİ:\n`) + (this.texts.derinlik[derinlik] || this.texts.derinlik.orta));

        // Transformed Modules Execution
        const alanText = alan || (lang === 'en' ? 'not specified' : 'belirtilmedi');
        const taskPrompts = sortedModules.map(m => {
            return `[LAYER: ${m.layer.toUpperCase()}]\n${m.prompt.replace('{{ALAN}}', alanText)}`;
        });
        
        parts.push((lang === 'en' ? `TASKS (EXECUTED IN TOPOLOGICAL ORDER):\n\n` : `GÖREVLER (TOPOLOJİK SIRADA İŞLENECEK):\n\n`) + taskPrompts.join('\n\n'));

        // Output Formatting
        parts.push((lang === 'en' ? `FORMAT:\n` : `FORMAT:\n`) + (this.texts.format[format] || this.texts.format.markdown) + 
            (lang === 'en' 
                ? `\n- Get straight to the point, no unnecessary introductions.\n- Explain technical jargon simply.\n- Explicitly state any uncertainties.` 
                : `\n- Doğrudan konuya gir, gereksiz giriş cümlesi yazma.\n- Teknik terim kullanırsan hemen sade dille açıkla.\n- Belirsiz yer varsa bunu açıkça belirt.`));

        return parts.join('\n\n─────────────────────────────────\n\n');
    }
}
