import { ref } from 'vue'
import type { LoteId } from '@/data/lotes'

export type Modalidad = 'listo' | 'adaptado' | 'medida'

const loteElegido = ref<LoteId | null>(null)
const modalidad = ref<Modalidad | null>(null)

export function useSeleccion() {
  const pedirLote = (id: LoteId) => {
    loteElegido.value = id
    modalidad.value = id === 'medida' ? 'medida' : 'adaptado'
    document.getElementById('presupuesto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return { loteElegido, modalidad, pedirLote }
}
