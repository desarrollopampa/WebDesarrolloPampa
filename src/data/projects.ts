import type { Project } from '@/types/project'

export const PROJECTS: Project[] = [
  {
    id: 'pos-lubricentro',
    slug: 'erp-pos-taller-lubricentro',
    name: 'Sistema Integral ERP, POS y Taller',
    tagline: 'Atención express en mostrador, facturación electrónica AFIP al instante y control total de lubricentro y taller',
    category: 'erp-pos',
    categoryLabel: 'ERP & Punto de Venta',
    accentColor: '#A64335',
    shortDescription:
      'Punto de venta ágil con lector de códigos de barras, facturación AFIP en el acto, historial vehicular por patente y control de aceites y repuestos.',
    fullDescription:
      'Diseñado específicamente para el ritmo ágil y exigente de lubricentros, talleres mecánicos y casas de repuestos. Este sistema agiliza la atención en el mostrador para despachar ventas en segundos con lector de códigos de barras, emitiendo facturas electrónicas AFIP oficiales en el acto y sin errores. Permite llevar el historial completo de cada vehículo buscando directamente por número de patente (filtros cambiados, aceites y kilometraje), envía avisos automáticos a los clientes para su próximo mantenimiento preventivo, y controla con exactitud tanto el stock fraccionado de tambores de aceite como los repuestos por unidad. Además, ordena la administración diaria con arqueos de caja por turno, cuentas corrientes de clientes y seguimiento seguro de cheques.',
    highlights: [
      {
        title: 'Atención Express con Lector de Código de Barras',
        description:
          'Despachá ventas de mostrador en segundos utilizando lector óptico y atajos de teclado, agilizando las filas en horarios pico.',
      },
      {
        title: 'Facturación Electrónica AFIP en el Acto',
        description:
          'Emisión directa de Facturas A, B, C y notas de crédito oficiales con CAE al instante, con cálculo automático de impuestos e impresión de ticket.',
      },
      {
        title: 'Historial Vehicular por Patente y Recordatorios',
        description:
          'Ficha técnica por dominio para consultar qué aceite y filtros se colocaron en visitas anteriores, enviando avisos de próximo cambio de aceite.',
      },
      {
        title: 'Control Exacto de Aceites Sueltos y Repuestos',
        description:
          'Seguimiento en tiempo real de litros despachados desde tambores a granel y repuestos por unidad, evitando faltantes y desfasajes de mercadería.',
      },
      {
        title: 'Cajas Diarias, Cuentas Corrientes y Cheques',
        description:
          'Arqueos claros por turno, control de cobros con efectivo, transferencias y tarjetas, seguimiento de deudas de clientes habituales y cartera de cheques.',
      },
    ],
    widgetType: 'pos-lubricentro',
    cardImage: '/projects/lubricentro.png',
    cardImagePosition: 'object-center',
  },
  {
    id: 'miagenda-booking',
    slug: 'miagenda-saas-turnos-cobros',
    name: 'MiAgenda — Plataforma de Turnos y Cobros Online',
    tagline: 'Reservas online las 24 hs, cobro de señas con MercadoPago y recordatorios automáticos por WhatsApp',
    category: 'saas',
    categoryLabel: 'SaaS & Reservas',
    accentColor: '#6B3A5A',
    liveUrl: 'https://miagenda.site',
    shortDescription:
      'Tus clientes reservan turnos solos desde un link simple las 24 hs, pagan la seña por MercadoPago y reciben confirmación automática por WhatsApp.',
    fullDescription:
      'MiAgenda elimina los mensajes interminables de ida y vuelta para coordinar horarios en salones de estética, consultorios, barberías, canchas deportivas y profesionales independientes. Proporciona a cada negocio una página web limpia y personalizada donde los clientes eligen profesional, servicio y horario disponible en tiempo real desde cualquier celular las 24 horas del día. Para asegurar la asistencia y proteger el tiempo del profesional, permite cobrar señas previas o turnos completos mediante MercadoPago con acreditación directa. Además, se sincroniza automáticamente con el calendario de Google Calendar y envía confirmaciones y recordatorios por WhatsApp para reducir ausencias y cancelaciones de último momento.',
    highlights: [
      {
        title: 'Reservas Online 24/7 desde un Link Simple',
        description:
          'Tus clientes eligen fecha, horario y profesional disponible desde un enlace directo y ágil, sin esperas ni mensajes de consulta manual.',
      },
      {
        title: 'Cobro de Señas Online con MercadoPago',
        description:
          'Asegurá cada turno reservado cobrando una seña previa o el valor total con tarjeta o dinero en cuenta, acreditando los fondos en tu cuenta.',
      },
      {
        title: 'Reducción Drástica del Ausentismo por WhatsApp',
        description:
          'Envío automatizado de confirmaciones y recordatorios previos a la cita para que ningún cliente olvide su horario ni deje vacía la agenda.',
      },
      {
        title: 'Sincronización Automática con Google Calendar',
        description:
          'Bloqueo instantáneo de horarios ocupados y actualización con el calendario personal de cada profesional para evitar superposiciones de turnos.',
      },
      {
        title: 'Panel Simple de Profesionales, Servicios y Tarifas',
        description:
          'Configurá horarios de atención, excepciones por feriados, servicios prestados y precios de cada integrante de tu equipo en pocos clics.',
      },
    ],
    widgetType: 'miagenda-booking',
    cardImage: '/projects/miagenda.jpg',
    cardImagePosition: 'object-top',
  },
  {
    id: 'rive-store',
    slug: 'rive-streetwear-ecommerce',
    name: 'RIVE — Tienda Online y Catálogo Autoadministrable',
    tagline: 'Catálogo con stock por talle, pedido listo a WhatsApp y panel simple para actualizar precios y promociones',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce',
    accentColor: '#8C4E31',
    shortDescription:
      'Catálogo online de alto impacto con variantes por talle, armado de pedidos directo a WhatsApp y panel autoadministrable sin intermediarios.',
    fullDescription:
      'Una tienda online pensada para marcas de indumentaria, calzado y comercios que buscan exhibir sus productos con una imagen profesional y vender de forma directa sin comisiones abusivas. El catálogo presenta las colecciones de forma visual e intuitiva, con selección clara de talles, colores y stock real para evitar vender prendas no disponibles. Los compradores arman su carrito en segundos y el sistema genera automáticamente un pedido cerrado y ordenado listo para enviar a WhatsApp, facilitando un cobro y entrega ágiles. El dueño de la marca cuenta con un panel de control muy fácil de usar para cargar nuevos productos, aplicar márgenes de ganancia sobre costos y actualizar precios o banners sin depender de nadie.',
    highlights: [
      {
        title: 'Colecciones con Stock Actualizado por Talle',
        description:
          'Exhibición visual de cada producto con fotos en alta calidad y disponibilidad en tiempo real por talle y color, evitando pedidos de prendas agotadas.',
      },
      {
        title: 'Cierre de Pedido Listo por WhatsApp',
        description:
          'El cliente arma su compra y envía un mensaje listo con el detalle exacto de artículos, talles elegidos y total a abonar para una atención ágil.',
      },
      {
        title: 'Actualización Rápida de Precios y Márgenes',
        description:
          'Panel para ajustar precios de venta al público en pocos segundos aplicando porcentaje de margen sobre costo, ideal para mantener listas al día.',
      },
      {
        title: 'Carga Autogestiva de Productos y Banners',
        description:
          'Subí fotos, creá promociones y organizá el orden de tus colecciones destacadas sin necesidad de conocimientos técnicos de programación.',
      },
      {
        title: 'Velocidad Inmediata de Carga en Celulares',
        description:
          'Navegación ultra fluida optimizada para compras desde el teléfono móvil, asegurando que tus clientes naveguen y elijan sin trabas ni demoras.',
      },
    ],
    widgetType: 'rive-store',
    cardImage: '/projects/rive.jpg',
    cardImagePosition: 'object-top scale-[1.16] origin-top',
  },
  {
    id: 'travel-agency',
    slug: 'travel-agency-enterprise-custom',
    name: 'Sistemas a Medida para Agencias de Viajes y Empresas',
    tagline: 'Centralización de reservas turísticas, generador de itinerarios para clientes y cuentas corrientes bimonetarias',
    category: 'custom',
    categoryLabel: 'Software a Medida',
    accentColor: '#533347',
    shortDescription:
      'Sistema a medida para unificar reservas de viajes, armar itinerarios dinámicos para pasajeros y llevar cuentas corrientes en pesos y dólares.',
    fullDescription:
      'Desarrollo personalizado para resolver la operativa diaria de agencias de turismo, operadores receptivos y empresas de servicios corporativos. El sistema reemplaza por completo el desorden de planillas de cálculo dispersas, centralizando en un único lugar las reservas de vuelos, alojamientos, excursiones y traslados privados. Permite a los agentes armar cotizaciones e itinerarios día por día en minutos, entregándole al pasajero un enlace interactivo o un documento formal para su viaje. Incluye un módulo financiero con cuentas corrientes en pesos y dólares para pasajeros y proveedores, liquidación automática de comisiones para el equipo comercial y alertas de vencimientos para no perder ninguna reserva.',
    highlights: [
      {
        title: 'Centralización Total de Reservas Turísticas',
        description:
          'Tablero unificado para coordinar servicios aéreos, hoteleros y excursiones con control estricto de confirmaciones, vouchers y fechas límite de pago.',
      },
      {
        title: 'Armado Rápido de Itinerarios Claros para Pasajeros',
        description:
          'Confeccioná cronogramas día a día con detalle de actividades y costos, compartiendo un enlace interactivo o un resumen formal con el cliente.',
      },
      {
        title: 'Cuentas Corrientes en Pesos y Dólares sin Errores',
        description:
          'Administración ordenada de saldos en moneda dual, cobros parciales, cotizaciones del día y control riguroso de deudas con operadores y prestadores.',
      },
      {
        title: 'Automatización del Seguimiento Administrativo',
        description:
          'Cálculo automático de comisiones por vendedor, alertas de vencimiento de señas y conciliación de cobros para ahorrar horas de trabajo de oficina.',
      },
      {
        title: 'Adaptabilidad a los Circuitos de tu Negocio',
        description:
          'Diseñado a la medida exacta de tus procesos operativos y comerciales, con perfiles y permisos específicos para cada integrante del equipo.',
      },
    ],
    widgetType: 'travel-agency',
    // cardImage: '/projects/viajes.png', // Preparado para cuando se cargue la captura
  },
  {
    id: 'farmacias-turnos',
    slug: 'turnos-farmacias',
    name: 'Turnos de Farmacias',
    tagline: 'Consulta inmediata de farmacias de turno y gestión de cronogramas mensuales',
    category: 'saas',
    categoryLabel: 'Salud & Turnos Públicos',
    accentColor: '#3B5B52',
    liveUrl: 'https://sosafarmacia.com.ar/',
    shortDescription:
      'Plataforma pública de consulta rápida para vecinos y panel administrativo para organizar cronogramas mensuales de turnos.',
    fullDescription:
      'Sistema pensado para comunidades, colegios farmacéuticos y redes de farmacias que necesitan informar de forma clara y sin errores qué farmacia está de guardia en cada momento. Combina una página pública ultrarrápida para consultar desde el celular con un panel simple para cargar y actualizar los cronogramas de todo el mes.',
    highlights: [
      {
        title: 'Consulta inmediata "Ahora de Turno"',
        description:
          'Muestra automáticamente qué farmacia está atendiendo en ese preciso momento, respetando los horarios reales de cambio de guardia (apertura y cierre).',
      },
      {
        title: 'Contacto y ubicación en un toque',
        description:
          'Permite al vecino abrir el mapa para llegar, llamar por teléfono o escribir directo por WhatsApp desde el celular.',
      },
      {
        title: 'Calendario mensual interactivo',
        description:
          'Cualquier persona puede consultar qué farmacia estará de turno en los próximos días del mes de forma clara y visual.',
      },
      {
        title: 'Panel de gestión y cronogramas listos',
        description:
          'Administración centralizada de farmacias con ubicación en mapa, carga rápida de turnos mensuales y generación de cronogramas listos para compartir o imprimir.',
      },
    ],
    widgetType: 'farmacias-turnos',
    cardImage: '/projects/farmacias.png',
    cardImagePosition: 'object-top',
  },
]
