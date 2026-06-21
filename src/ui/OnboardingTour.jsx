import { useState, useEffect, useRef } from 'react';
import { useEngineState } from '../state/engineState';
import { getTranslation } from '../locales/i18n';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function OnboardingTour() {
    const { config, showTour, completeTour } = useEngineState();
    const [currentStep, setCurrentStep] = useState(0);
    const [coords, setCoords] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const cardRef = useRef(null);

    const t = getTranslation(config.lang);
    const steps = t.tour?.steps || [];

    // Listen to resize to determine mobile state
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Reset step when tour is launched
    useEffect(() => {
        if (showTour) {
            setCurrentStep(0);
        }
    }, [showTour]);

    // Handle spotlight classes and coordinates calculation
    useEffect(() => {
        if (!showTour || steps.length === 0) return;

        const step = steps[currentStep];
        const selector = step.selector;
        const element = document.querySelector(selector);

        // Clean up previous highlights
        document.querySelectorAll('.tour-highlighted').forEach(el => {
            el.classList.remove('tour-highlighted');
        });

        if (element && selector !== 'body') {
            element.classList.add('tour-highlighted');
            
            // Gently scroll target into center view
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            const updatePosition = () => {
                const rect = element.getBoundingClientRect();
                const isMobile = window.innerWidth < 768;

                if (isMobile) {
                    setCoords({
                        position: 'fixed',
                        bottom: '24px',
                        left: '16px',
                        right: '16px',
                        width: 'auto',
                        maxWidth: 'none',
                        zIndex: 10005
                    });
                } else {
                    // Position floating card relative to highlighted block using viewport-relative 'fixed' layout
                    if (selector === '.sidebar') {
                        setCoords({
                            position: 'fixed',
                            top: `${rect.top}px`,
                            left: `${rect.right + 20}px`,
                            width: '320px',
                            zIndex: 10005
                        });
                    } else if (selector === '.main-content') {
                        setCoords({
                            position: 'fixed',
                            top: `${rect.top + 20}px`,
                            left: `${rect.left + rect.width / 2}px`,
                            transform: 'translateX(-50%)',
                            width: '320px',
                            zIndex: 10005
                        });
                    } else if (selector === '.right-sidebar') {
                        setCoords({
                            position: 'fixed',
                            top: `${rect.top}px`,
                            left: `${rect.left - 340}px`,
                            width: '320px',
                            zIndex: 10005
                        });
                    } else {
                        setCoords({
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '360px',
                            zIndex: 10005
                        });
                    }
                }
            };

            // Calculate initially and attach listeners
            updatePosition();
            window.addEventListener('resize', updatePosition);
            window.addEventListener('scroll', updatePosition);
            return () => {
                window.removeEventListener('resize', updatePosition);
                window.removeEventListener('scroll', updatePosition);
                element.classList.remove('tour-highlighted');
            };
        } else {
            // Screen-centered fallback for welcome step
            setCoords({
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '380px',
                maxWidth: 'calc(100% - 32px)',
                zIndex: 10005
            });
        }
    }, [currentStep, showTour, steps]);

    if (!showTour || isMobile || steps.length === 0) return null;

    const step = steps[currentStep];
    const isFirst = currentStep === 0;
    const isLast = currentStep === steps.length - 1;

    const handleNext = () => {
        if (isLast) {
            localStorage.setItem('prompter-tour-completed', 'true');
            completeTour();
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (!isFirst) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSkip = () => {
        localStorage.setItem('prompter-tour-completed', 'true');
        completeTour();
    };

    return (
        <>
            <div className="tour-overlay" onClick={handleSkip} />
            <div 
                className="tour-card"
                ref={cardRef}
                style={coords || { display: 'none' }}
            >
                <div className="tour-card-header">
                    <h3>{step.title}</h3>
                    <button className="tour-close-btn" onClick={handleSkip} aria-label={t.tour.btnSkip}>
                        <X size={16} />
                    </button>
                </div>
                <div className="tour-card-body">
                    <p>{step.content}</p>
                </div>
                <div className="tour-card-footer">
                    <div className="tour-dots">
                        {steps.map((_, idx) => (
                            <span 
                                key={idx} 
                                className={`tour-dot ${idx === currentStep ? 'active' : ''}`}
                                onClick={() => setCurrentStep(idx)}
                            />
                        ))}
                    </div>
                    <div className="tour-actions">
                        {!isLast && (
                            <button className="tour-btn-text" onClick={handleSkip}>
                                {t.tour.btnSkip}
                            </button>
                        )}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {!isFirst && (
                                <button className="tour-btn-outline" onClick={handleBack}>
                                    <ChevronLeft size={14} style={{ marginRight: '4px' }} />
                                    {t.tour.btnBack}
                                </button>
                            )}
                            <button className="tour-btn-primary" onClick={handleNext}>
                                {isLast ? t.tour.btnFinish : t.tour.btnNext}
                                {!isLast && <ChevronRight size={14} style={{ marginLeft: '4px' }} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
