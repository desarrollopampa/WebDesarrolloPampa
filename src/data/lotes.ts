import { PROJECTS } from './projects'
import type { Project } from '@/types/project'

export type LoteId = 'tienda' | 'turnos' | 'taller' | 'medida'

export interface Lote {
  id: LoteId
  numero: string
  nombre: string
  producto: string
  rubro: string
  promesa: string
  color: string
  colorTexto: string
  angulo: number
  resuelve: string[]
  project: Project
}

const byId = (id: string): Project => {
  const p = PROJECTS.find((x) => x.id === id)
  if (!p) throw new Error(`Proyecto ${id} no encontrado`)
  return p
}

export const LOTES: Lote[] = [
  {
    id: 'tienda',
    numero: '01',
    nombre: 'Tienda',
    producto: 'RIVE',
    rubro: 'Ropa, catálogos, comercios',
    promesa: 'Tu catálogo online, rápido y prolijo. El pedido te llega armado por WhatsApp.',
    color: '#D6F46A',
    colorTexto: '#5E7A12',
    angulo: -38,
    resuelve: ['Talles y colores con stock propio', 'Precio por costo y margen, para ajustar rápido', 'Fotos livianas que cargan al toque'],
    project: byId('rive-store'),
  },
  {
    id: 'turnos',
    numero: '02',
    nombre: 'Turnos',
    producto: 'MiAgenda',
    rubro: 'Consultorios, estética, canchas',
    promesa: 'Tus clientes reservan solos, a cualquier hora, y dejan la seña con MercadoPago.',
    color: '#A9C8F5',
    colorTexto: '#2F5FA8',
    angulo: 0,
    resuelve: ['Agenda que no se pisa: el turno queda bloqueado mientras pagan', 'Recordatorios por WhatsApp, SMS y mail', 'Se sincroniza con Google Calendar'],
    project: byId('miagenda-booking'),
  },
  {
    id: 'taller',
    numero: '03',
    nombre: 'Lubricentros',
    producto: 'POS & Taller',
    rubro: 'Lubricentros, talleres, repuestos',
    promesa: 'Caja rápida, factura electrónica y el historial de cada patente. Anda aunque se corte internet.',
    color: '#F4A27C',
    colorTexto: '#9A4520',
    angulo: 52,
    resuelve: ['Caja con atajos de teclado y lector de código', 'Factura A, B y C con ARCA', 'Aceite a granel por litro y ficha por patente'],
    project: byId('pos-lubricentro'),
  },
  {
    id: 'medida',
    numero: '04',
    nombre: 'A medida',
    producto: 'Agencias y empresas',
    rubro: 'Lo que todavía no existe',
    promesa: 'Si tu negocio no entra en una planilla, lo construimos desde nuestra base.',
    color: '#F4F6F0',
    colorTexto: '#103B3F',
    angulo: 90,
    resuelve: ['Reservas, vouchers y vencimientos en un tablero', 'Cuentas corrientes en pesos y dólares', 'Itinerarios para el pasajero, en web o PDF'],
    project: byId('travel-agency'),
  },
]
