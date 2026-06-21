import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { resolveDependencies } from '../engine/promptCompiler';

export const useStore = create(
    persist(
        (set, get) => ({
            config: {
                konu: '',
                alan: '',
                seviye: 'otomatik',
                mod: 'karma',
                derinlik: 'orta',
                format: 'markdown',
                monolog: false,
                autoResolveDeps: true,
                theme: 'system', // 'system', 'light', 'dark'
                lang: 'tr' // 'tr' or 'en'
            },
            selectedModules: [],
            
            setConfig: (key, value) => set((state) => ({
                config: { ...state.config, [key]: value }
            })),
            
            setTheme: (themeVal) => set((state) => ({
                config: { ...state.config, theme: themeVal }
            })),
            
            toggleModule: (id) => set((state) => {
                const isSelected = state.selectedModules.includes(id);
                let newModules;
                if (isSelected) {
                    newModules = state.selectedModules.filter(m => m !== id);
                } else {
                    newModules = [...state.selectedModules, id];
                }
                
                // If autoResolveDeps is true, we resolve deps on selection
                if (state.config.autoResolveDeps && !isSelected) {
                    newModules = resolveDependencies(newModules, state.config.lang);
                }
                
                return { selectedModules: newModules };
            }),

            setModules: (moduleIds) => set((state) => {
                let newModules = moduleIds;
                if (state.config.autoResolveDeps) {
                    newModules = resolveDependencies(newModules, state.config.lang);
                }
                return { selectedModules: newModules };
            }),
            
            clearModules: () => set({ selectedModules: [] }),
            
            resetAll: () => set((state) => ({
                config: {
                    konu: '',
                    alan: '',
                    seviye: 'otomatik',
                    mod: 'karma',
                    derinlik: 'orta',
                    format: 'markdown',
                    monolog: false,
                    autoResolveDeps: true,
                    theme: state.config.theme,
                    lang: state.config.lang
                },
                selectedModules: []
            }))
        }),
        {
            name: 'learning-os-storage-v2', // unique name for localStorage
        }
    )
);
