import type { Project } from '@/types/project'

export const PROJECTS: Project[] = [
  {
    id: 'pos-lubricentro',
    slug: 'erp-pos-taller-lubricentro',
    name: 'Sistema Integral ERP, POS y Taller',
    tagline: 'Punto de venta express, facturación electrónica ARCA/AFIP y control operativo para lubricentros y talleres',
    category: 'erp-pos',
    categoryLabel: 'ERP & Punto de Venta',
    accentColor: '#10b981',
    liveUrl: 'https://demo-lubricentro.desarrollopampa.com',
    shortDescription:
      'Solución robusta de punto de venta express y gestión de taller con facturación electrónica nativa AFIP/ARCA, control de stock fraccionado a granel y seguimiento histórico vehicular por patente.',
    fullDescription:
      'Diseñado específicamente para el ritmo de trabajo exigente de lubricentros, talleres mecánicos y casas de repuestos automotores. Este ecosistema unifica el cobro en mostrador mediante un POS express optimizado para uso intensivo de teclado y lectores de código de barras, con emisión directa de comprobantes fiscales electrónicos (Facturas A, B, C, notas de crédito/débito con CAE y código QR reglamentario). Gestiona inventario fraccionado en tambores a granel (litros/fracciones) y artículos unitarios, administra cuentas corrientes y cartera de cheques, y automatiza el seguimiento de servicios preventivos vinculados a la patente del vehículo. Su arquitectura híbrida permite operar tanto en la nube SaaS como en un servidor local LAN para garantizar operatividad ininterrumpida ante caídas de conectividad.',
    deploymentModes: ['Nube SaaS', 'Servidor Local LAN', 'Híbrido con Sincronización'],
    techStack: {
      backend: ['NestJS 11', 'Prisma 7', 'PostgreSQL 16', 'Redis 7', 'BullMQ'],
      frontend: ['Vue 3', 'Vite 7', 'PrimeVue 4', 'TailwindCSS 4', 'Pinia 3'],
      infrastructure: ['Docker Compose', 'Linux'],
    },
    highlights: [
      {
        title: 'POS Express con Atajos y Código de Barras',
        description:
          'Interfaz de caja de ultra-alta velocidad operada 100% mediante atajos de teclado y lectores ópticos, permitiendo despachar ventas de mostrador en segundos sin tocar el ratón.',
      },
      {
        title: 'Facturación Electrónica AFIP/ARCA Nativa',
        description:
          'Integración directa vía Web Services (WSAA/WSFE) para comprobantes A, B, C con CAE en tiempo real, cálculo automatizado de alícuotas e impresión de ticket fiscal con QR.',
      },
      {
        title: 'Historial Vehicular por Patente y Alertas',
        description:
          'Ficha técnica por dominio con registro de filtros, aceites, kilometraje y disparador automático de recordatorios por WhatsApp/Email para el próximo mantenimiento preventivo.',
      },
      {
        title: 'Stock Fraccionado a Granel y Tambores',
        description:
          'Control bidimensional de inventario: despacho fraccionado en litros directamente desde tambores y venta unitaria cerrada, con costeo FIFO/PPP y mermas controladas.',
      },
      {
        title: 'Tesorería, Múltiples Cajas y Cartera de Cheques',
        description:
          'Arqueos ciegos por turno, conciliación de medios de pago (efectivo, transferencias, tarjetas), control de cuentas corrientes de clientes y seguimiento del ciclo de vida de cheques y eCheqs.',
      },
      {
        title: 'Modalidad Híbrida: Nube SaaS o Servidor Local LAN',
        description:
          'Capacidad de operar de forma 100% autónoma en la red local del taller sin depender de conexión a Internet, sincronizando las operaciones de forma segura con la nube central.',
      },
    ],
    metrics: [
      { label: 'Tiempo de emisión fiscal', value: '< 2.5 seg' },
      { label: 'Disponibilidad offline', value: '100% Operativo LAN' },
      { label: 'Reducción tiempo mostrador', value: '-45%' },
      { label: 'Precisión de inventario', value: '99.9%' },
    ],
    widgetType: 'pos-lubricentro',
    screenshots: [
      {
        src: '/projects/pos-ventas.webp',
        caption: 'Punto de venta express con atajos y lectura óptica de barras',
      },
      {
        src: '/projects/pos-taller.webp',
        caption: 'Ficha técnica vehicular por patente con historial de lubricación',
      },
      {
        src: '/projects/pos-arca.webp',
        caption: 'Emisión instantánea de facturas electrónicas AFIP/ARCA con CAE',
      },
    ],
  },
  {
    id: 'miagenda-booking',
    slug: 'miagenda-saas-turnos-cobros',
    name: 'MiAgenda — Plataforma SaaS de Turnos y Cobros',
    tagline: 'Motor de disponibilidad en tiempo real, cobro de señas con MercadoPago y notificaciones omnicanal',
    category: 'saas',
    categoryLabel: 'SaaS & Reservas',
    accentColor: '#3b82f6',
    liveUrl: 'https://miagenda.desarrollopampa.com',
    shortDescription:
      'Plataforma SaaS multi-tenant de agendamiento online con motor de concurrencia en Redis, cobro automático de turnos y señas vía MercadoPago Marketplace y recordatorios inteligentes por WhatsApp y SMS.',
    fullDescription:
      'MiAgenda automatiza de punta a punta la agenda y recaudación de profesionales, consultorios, centros de estética, barberías y canchas deportivas. Cuenta con un motor de disponibilidad de alta concurrencia respaldado por Redis que procesa calendarios semanales, bloqueos manuales, excepciones horarias y sincronización bidireccional con Google Calendar. Su integración profunda con MercadoPago Marketplace vía OAuth permite a cada negocio cobrar turnos completos o señas con split de fondos directo y verificación estricta de webhooks HMAC. A través de colas de mensajería con BullMQ, orquesta el envío oportuno de confirmaciones y recordatorios por WhatsApp, SMS (Twilio), emails dinámicos y WebPush, reduciendo drásticamente el ausentismo no avisado.',
    deploymentModes: ['Multi-Tenant Cloud', 'Docker Container', 'PWA Instalable'],
    techStack: {
      backend: ['NestJS 11', 'Prisma', 'MySQL 8', 'Redis', 'BullMQ', 'Socket.io'],
      frontend: ['Next.js 16', 'React 19', 'Redux Toolkit', 'Material UI'],
      infrastructure: ['Docker Compose', 'Nginx', 'PM2', 'Linux'],
    },
    highlights: [
      {
        title: 'Motor de Disponibilidad en Tiempo Real con Redis',
        description:
          'Cálculo ultrarrápido de franjas horarias libres teniendo en cuenta horarios por profesional, servicios simultáneos, excepciones por feriados y sincronización activa con Google Calendar.',
      },
      {
        title: 'Reserva Atómica con Bloqueo Temporal',
        description:
          'Mecanismo transaccional anti-colisiones que bloquea temporalmente el turno por 10 minutos mientras el usuario realiza el pago, liberándolo automáticamente si la transacción no se completa.',
      },
      {
        title: 'MercadoPago Marketplace (OAuth) y Señas',
        description:
          'Conexión nativa de las cuentas de cobro de cada prestador con split de pagos, gestión de comisiones de plataforma, soporte para suscripciones recurrentes y webhooks firmados con HMAC.',
      },
      {
        title: 'Notificaciones Multicanal Automatizadas',
        description:
          'Disparo programado de alertas de confirmación, reprogramación y recordatorio 24h/2h antes vía WhatsApp, SMS con Twilio, Email transaccional y WebSockets en tiempo real.',
      },
      {
        title: 'PWA Instalable Offline',
        description:
          'Aplicación web progresiva lista para instalar en dispositivos móviles y de escritorio, con soporte de caché offline para consultar agenda de citas sin conectividad.',
      },
    ],
    metrics: [
      { label: 'Reducción de ausentismo', value: 'Hasta 68%' },
      { label: 'Tiempo de reserva online', value: '< 45 seg' },
      { label: 'Capacidad de concurrencia', value: '+5.000 req/s' },
      { label: 'SLA de plataforma', value: '99.95%' },
    ],
    widgetType: 'miagenda-booking',
    screenshots: [
      {
        src: '/projects/miagenda-turnos.webp',
        caption: 'Selector de turnos en tiempo real con motor de disponibilidad en Redis',
      },
      {
        src: '/projects/miagenda-pagos.webp',
        caption: 'Cobro de señas automatizado mediante MercadoPago Marketplace OAuth',
      },
    ],
  },
  {
    id: 'rive-store',
    slug: 'rive-streetwear-ecommerce',
    name: 'RIVE — Catálogo E-Commerce & Panel Autoadministrable',
    tagline: 'Tienda online streetwear industrial minimalista, checkout a WhatsApp y panel autoadministrable',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce',
    accentColor: '#f59e0b',
    liveUrl: 'https://rive.desarrollopampa.com',
    shortDescription:
      'Catálogo online de alto impacto visual y velocidad extrema con variantes complejas de producto, cierre de carrito conversacional vía WhatsApp y panel autogestivo con compresión WebP en Sharp.',
    fullDescription:
      'RIVE combina la potencia estética del diseño streetwear industrial con una arquitectura tecnológica de carga ultrarrápida (Core Web Vitals 99+). Construido sobre Next.js 15 y React 19, aprovecha Server Actions para una navegación fluida sin recargas. Incorpora un esquema de variantes independientes por talle y color con control estricto de inventario. Su proceso de checkout elimina la fricción tradicional dirigiendo los pedidos directamente a WhatsApp con un formato estructurado y trazabilidad de conversión. En el panel de control, los administradores cuentan con ordenamiento drag & drop del catálogo, cálculo dinámico de precios de venta mediante porcentaje de margen sobre costo y un pipeline automatizado de procesamiento de fotografías a WebP mediante Sharp.',
    deploymentModes: ['Cloud VPS', 'Docker Container', 'Edge CDN'],
    techStack: {
      backend: ['Next.js Server Actions', 'Prisma', 'PostgreSQL', 'NextAuth 5'],
      frontend: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion', 'Zustand'],
      infrastructure: ['GitHub Actions CI/CD', 'PM2', 'Docker', 'Linux'],
    },
    highlights: [
      {
        title: 'Estética Streetwear Industrial Minimalista',
        description:
          'Diseño editorial de vanguardia con tipografías monoespaciadas, microinteracciones a 60 FPS y una experiencia visual inmersiva que eleva el valor percibido de marca.',
      },
      {
        title: 'Variantes por Talle con Stock Independiente',
        description:
          'Gestión granular de inventario por talle y color con detección automática de quiebres de stock y desactivación inmediata de opciones no disponibles.',
      },
      {
        title: 'Cierre de Carrito Automatizado por WhatsApp',
        description:
          'Compilación del carrito en un mensaje preformateado listo para enviar por WhatsApp, incluyendo SKU, variantes elegidas, total calculado y parámetros UTM de seguimiento.',
      },
      {
        title: 'Cálculo Dinámico de Precios por Costo y Margen',
        description:
          'Herramienta en panel que calcula el precio al público automáticamente al ingresar el costo del producto y el margen deseado, facilitando ajustes masivos por inflación.',
      },
      {
        title: 'Ordenamiento Drag & Drop de Catálogo',
        description:
          'Reorganización visual e intuitiva de productos destacados y colecciones con persistencia instantánea del orden de exhibición.',
      },
      {
        title: 'Conversión Automática a WebP con Sharp & SEO Dinámico',
        description:
          'Optimización al vuelo de imágenes reduciendo el peso hasta en un 75%, complementada con metadatos Open Graph y microformatos Schema.org (JSON-LD Product).',
      },
    ],
    metrics: [
      { label: 'Rendimiento Lighthouse', value: '99 / 100' },
      { label: 'Conversión checkout', value: '+42%' },
      { label: 'Compresión WebP Sharp', value: '-72% peso' },
      { label: 'Velocidad First Contentful Paint', value: '< 600ms' },
    ],
    widgetType: 'rive-store',
    screenshots: [
      {
        src: '/projects/rive-catalogo.webp',
        caption: 'Catálogo de diseño industrial minimalista con filtros dinámicos',
      },
      {
        src: '/projects/rive-checkout.webp',
        caption: 'Cierre de pedidos por WhatsApp con desglose de talles y atribución',
      },
    ],
  },
  {
    id: 'travel-agency',
    slug: 'travel-agency-enterprise-custom',
    name: 'Plataformas a Medida para Agencias de Viajes y Empresas',
    tagline: 'Sistemas a medida para gestión operativa turística, reservas mayoristas, itinerarios dinámicos y finanzas',
    category: 'custom',
    categoryLabel: 'Software a Medida',
    accentColor: '#8b5cf6',
    liveUrl: 'https://travel.desarrollopampa.com',
    shortDescription:
      'Desarrollo a medida para agencias turísticas y empresas de servicios: unificación operativa de reservas hoteleras y aéreas, generador de itinerarios interactivos y cuentas corrientes bimonetarias.',
    fullDescription:
      'Solución corporativa construida exclusivamente para resolver las complejidades operativas de agencias de viajes mayoristas, receptivas y empresas corporativas. La plataforma centraliza el ciclo completo de reservas turísticas (aéreos, hotelería, excursiones y traslados privados) con control riguroso de confirmaciones y fechas límite. Permite confeccionar cotizaciones e itinerarios dinámicos día por día, accesibles para el cliente final mediante portal web interactivo o exportables en PDF de diseño corporativo. Además, integra un módulo de tesorería y cuentas corrientes bimonetarias (ARS y USD) para pasajeros y operadores mayoristas, con liquidación automatizada de comisiones y conciliación bancaria adaptada a las reglas de negocio del cliente.',
    deploymentModes: ['Dedicated Cloud', 'On-Premise', 'Private VPN'],
    techStack: {
      backend: ['NestJS 11', 'Prisma', 'PostgreSQL', 'Redis'],
      frontend: ['Vue 3', 'TypeScript', 'Tailwind CSS 4', 'PrimeVue'],
      infrastructure: ['Docker', 'Linux VPS', 'Automated Backups'],
    },
    highlights: [
      {
        title: 'Gestión Operativa Integral de Reservas',
        description:
          'Tablero centralizado para coordinar servicios aéreos, hoteleros y terrestres, con seguimiento de estados de confirmación, emisión de vouchers y alertas de plazos de pago.',
      },
      {
        title: 'Constructor y Armado de Itinerarios Dinámicos',
        description:
          'Herramienta visual para armar itinerarios día a día con cálculo dinámico de costos y márgenes, generando una vista web interactiva para el pasajero y exportación a PDF profesional.',
      },
      {
        title: 'Cuentas Corrientes Bimonetarias (ARS / USD)',
        description:
          'Manejo estricto de saldos en moneda dual, cobros parciales, aplicación de cotizaciones cambiarias oficiales o financieras y seguimiento de deudas con operadores mayoristas.',
      },
      {
        title: 'Automatización Administrativa y Reglas de Negocio',
        description:
          'Eliminación de planillas de cálculo dispersas mediante flujos automáticos de liquidación de comisiones a vendedores, alertas de cobro y conciliación financiera integral.',
      },
      {
        title: 'Arquitectura Segura y Adaptabilidad Total',
        description:
          'Desarrollo a medida con permisos basados en roles (RBAC), registro de auditoría de modificaciones y despliegue en infraestructura dedicada con copias de seguridad automatizadas.',
      },
    ],
    metrics: [
      { label: 'Ahorro de tiempo administrativo', value: '75%' },
      { label: 'Conciliación contable', value: '100% Automatizada' },
      { label: 'Tiempo de cotización', value: '< 5 minutos' },
      { label: 'Control de cobros', value: 'Cero discrepancias' },
    ],
    widgetType: 'travel-agency',
    screenshots: [
      {
        src: '/projects/travel-itinerario.webp',
        caption: 'Generador visual de itinerarios día a día con cotización multi-moneda',
      },
      {
        src: '/projects/travel-finanzas.webp',
        caption: 'Panel de cuentas corrientes bimonetarias ARS/USD y comisiones',
      },
    ],
  },
]
