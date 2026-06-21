import { getCompiler } from '../data/modules';

export function resolveDependencies(selectedIds, lang = 'tr') {
    const compiler = getCompiler(lang);
    return compiler.graph.resolveDependencies(selectedIds);
}

export function checkPromptLength(prompt) {
    const chars = prompt.length || 0;
    const tokens = Math.round(chars / 3.5);
    const isTooLongForUrl = chars > 4000; 
    return { chars, tokens, isTooLongForUrl };
}

export function generatePrompt(config, selectedIds) {
    const compiler = getCompiler(config.lang || 'tr');
    return compiler.compile({ config, selectedIds });
}
