import { ref, onMounted, onUnmounted, type Directive } from 'vue'

export interface RevealOptions extends IntersectionObserverInit {
  delay?: number
}

/**
 * Composable para detectar cuándo un elemento entra en el viewport.
 */
export function useReveal(options: RevealOptions = {}) {
  const targetRef = ref<HTMLElement | null>(null)
  const isRevealed = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!targetRef.value || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      isRevealed.value = true
      return
    }

    observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        if (options.delay) {
          setTimeout(() => {
            isRevealed.value = true
          }, options.delay)
        } else {
          isRevealed.value = true
        }

        if (targetRef.value && observer) {
          observer.unobserve(targetRef.value)
        }
      }
    }, {
      threshold: options.threshold ?? 0.12,
      rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
    })

    observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return { targetRef, isRevealed }
}

/**
 * Directiva v-reveal para animación de entrada suave al hacer scroll.
 */
export const vReveal: Directive<HTMLElement, { delay?: number } | undefined> = {
  mounted(el, binding) {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    // Estado inicial oculto y desplazado hacia abajo
    el.classList.add(
      'opacity-0',
      'translate-y-8',
      'transition-all',
      'duration-700',
      'ease-out',
      'transform-gpu'
    )

    if (binding.value?.delay) {
      el.style.transitionDelay = `${binding.value.delay}ms`
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.remove('opacity-0', 'translate-y-8')
            el.classList.add('opacity-100', 'translate-y-0')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
  },
}
