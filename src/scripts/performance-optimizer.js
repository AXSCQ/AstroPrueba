/**
 * Performance Optimizer Script
 * Optimiza la carga de recursos según las recomendaciones de Lighthouse
 */

class PerformanceOptimizer {
  constructor() {
    this.initialized = false;
    this.observers = new Map();
    this.loadedModules = new Set();
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    // Configurar Intersection Observer para lazy loading
    this.setupIntersectionObserver();
    
    // Optimizar scroll listeners
    this.setupOptimizedScrollListener();
    
    // Preload críticos de manera inteligente
    this.preloadCriticalResources();
    
    console.log('🚀 Performance Optimizer iniciado');
  }

  setupIntersectionObserver() {
    // Observer para elementos que aparecen en viewport
    const mainObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          
          // Activar animaciones solo cuando son visibles
          if (target.hasAttribute('data-aos')) {
            target.classList.add('aos-animate');
          }
          
          // Cargar scripts específicos
          if (target.hasAttribute('data-lazy-script')) {
            this.loadLazyScript(target.dataset.lazyScript);
          }
          
          mainObserver.unobserve(target);
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.1
    });

    this.observers.set('main', mainObserver);

    // Observar elementos relevantes
    document.querySelectorAll('[data-aos], [data-lazy-script]').forEach(el => {
      mainObserver.observe(el);
    });
  }

  setupOptimizedScrollListener() {
    let ticking = false;
    
    const optimizedScroll = () => {
      // Throttled scroll handler para mejor performance
      if (!ticking) {
        requestAnimationFrame(() => {
          // Lógica de scroll aquí si es necesaria
          ticking = false;
        });
        ticking = true;
      }
    };

    // Usar passive listeners para mejor performance
    window.addEventListener('scroll', optimizedScroll, { passive: true });
  }

  preloadCriticalResources() {
    // Preload de recursos basado en user intent
    const preloadOnHover = (selector, resource) => {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => {
          this.preloadResource(resource);
        }, { once: true });
      });
    };

    // Preload audio visualizer cuando hover en paneles de audio
    preloadOnHover('[data-track]', '/src/components/MultiTrackAudioVisualizer.astro');
    
    // Preload de AOS cuando se necesite
    preloadOnHover('[data-aos]', 'https://unpkg.com/aos@next/dist/aos.js');
  }

  preloadResource(url) {
    if (this.loadedModules.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = url;
    document.head.appendChild(link);
    
    this.loadedModules.add(url);
    console.log(`📦 Preloaded: ${url}`);
  }

  async loadLazyScript(scriptName) {
    if (this.loadedModules.has(scriptName)) return;

    try {
      switch (scriptName) {
        case 'aos':
          await this.loadAOS();
          break;
        case 'audio-visualizer':
          await this.loadAudioVisualizer();
          break;
        default:
          console.warn(`Unknown lazy script: ${scriptName}`);
      }
    } catch (error) {
      console.error(`Error loading lazy script ${scriptName}:`, error);
    }
  }

  async loadAOS() {
    if (!window.AOS) {
      // Cargar AOS solo cuando se necesita
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/aos@next/dist/aos.js';
      script.onload = () => {
        if (window.AOS) {
          window.AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
          });
          console.log('✨ AOS inicializado lazily');
        }
      };
      document.head.appendChild(script);
    }
    
    this.loadedModules.add('aos');
  }

  async loadAudioVisualizer() {
    // Implementación específica para el audio visualizer
    // Se ejecutará cuando sea realmente necesario
    console.log('🎵 Preparando Audio Visualizer...');
    this.loadedModules.add('audio-visualizer');
  }

  // Método para limpiar recursos cuando no se necesiten
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const optimizer = new PerformanceOptimizer();
  optimizer.init();
  
  // Exponer globalmente para debugging
  window.performanceOptimizer = optimizer;
});

// Cleanup en unload
window.addEventListener('beforeunload', () => {
  if (window.performanceOptimizer) {
    window.performanceOptimizer.cleanup();
  }
});
