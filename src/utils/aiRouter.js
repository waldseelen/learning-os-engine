import { checkPromptLength } from '../engine/promptCompiler';

const AI_URLS = {
    chatgpt: 'https://chatgpt.com/?q=',
    claude: 'https://claude.ai/new?q=',
    perplexity: 'https://www.perplexity.ai/search?q=',
    gemini: 'https://gemini.google.com/app?prompt='
};

export function copyToClipboard(text, onSuccess, onError) {
    if (!navigator.clipboard) {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            if(onSuccess) onSuccess();
        } catch (err) {
            if(onError) onError(err);
        }
        document.body.removeChild(ta);
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        if(onSuccess) onSuccess();
    }).catch(err => {
        if(onError) onError(err);
    });
}

export function openInAI(aiName, prompt, onLengthWarning, onSuccessCopy) {
    if (!prompt) return;

    const { isTooLongForUrl } = checkPromptLength(prompt);
    
    if (isTooLongForUrl) {
        // Prompt is too long to safely put in a URL. 
        // Best practice is to copy to clipboard and open the base URL.
        if (onLengthWarning) onLengthWarning();
        
        copyToClipboard(prompt, () => {
            if(onSuccessCopy) onSuccessCopy();
            // Fallback to base URL
            const baseUrl = AI_URLS[aiName].split('?')[0];
            window.open(baseUrl, '_blank');
        });
        return;
    }

    const url = AI_URLS[aiName] + encodeURIComponent(prompt);
    window.open(url, '_blank');
}
