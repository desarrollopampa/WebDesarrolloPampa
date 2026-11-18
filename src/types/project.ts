export type ProjectCategory = 'erp-pos' | 'saas' | 'ecommerce' | 'custom'

export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectHighlight {
  title: string
  description: string
}

export interface ProjectScreenshot {
  src: string
  caption: string
}

export type ProjectWidgetType =
  | 'pos-lubricentro'
  | 'miagenda-booking'
  | 'rive-store'
  | 'travel-agency'
  | 'farmacias-turnos'

export interface ProjectTechStack {
  backend: string[]
  frontend: string[]
  infrastructure: string[]
}

export interface Project {
  id: string
  slug: string
  name: string
  tagline: string
  category: ProjectCategory
  categoryLabel: string
  accentColor: string
  liveUrl?: string
  shortDescription: string
  fullDescription: string
  deploymentModes?: string[]
  techStack?: {
    backend: string[]
    frontend: string[]
    infrastructure: string[]
  }
  highlights: ProjectHighlight[]
  metrics?: ProjectMetric[]
  widgetType: ProjectWidgetType
  screenshots?: ProjectScreenshot[]
  cardImage?: string
  cardImagePosition?: string
}
