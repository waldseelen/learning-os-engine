import { getModules } from './modules';

export function getPresets(lang) {
    const modules = getModules(lang);
    return {
        hizli:    ['ontoloji', 'mekanizma', 'mental', 'pareto'],
        derin:    ['ontoloji', 'nedensellik', 'mekanizma', 'evrim', 'esleme', 'kontrast', 'mental', 'diagram', 'yanilgilar', 'basarisizlik', 'ornekler', 'pareto'],
        sinav:    ['ontoloji', 'yanilgilar', 'ornekler', 'pareto', 'quiz', 'transfer'],
        muhendis: ['ontoloji', 'nedensellik', 'mekanizma', 'esleme', 'kontrast', 'diagram', 'basarisizlik', 'kirilma', 'olcek', 'tersine'],
        tam:      modules.map(m => m.id),
        
        // New Presets:
        arastirmaci: ['evrim', 'rakip', 'kontrast', 'varsayimlar', 'celiski', 'kaynak', 'gelecek'], // Researcher Mode
        temeller:    ['kalibrasyon', 'onkosul', 'sirasi', 'ontoloji', 'mekanizma'], // Foundations Only
        pratik:      ['ornekler', 'mental', 'pareto', 'quiz', 'transfer'], // Practical Application
        hataAyiplama:['basarisizlik', 'kirilma', 'varsayimlar', 'tersine', 'olcek'] // Debugging / Breakpoint analysis
    };
}
