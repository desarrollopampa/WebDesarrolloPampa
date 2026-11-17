/**
 * Configuración centralizada de la agencia Desarrollo Pampa.
 */
export const AGENCY_CONFIG = {
  name: 'Desarrollo Pampa',
  // Número de WhatsApp oficial en formato internacional (código de país + código de área + número)
  // Sin signos '+' ni espacios. Modificá este valor para actualizar el canal de contacto en toda la app:
  whatsappNumber: '5493573455898',
  email: 'estudiodesarrollospampa@gmail.com',
  location: 'Córdoba, Argentina',

  /**
   * Helper para construir la URL codificada de WhatsApp
   */
  buildWhatsAppUrl(message: string): string {
    const cleanNumber = this.whatsappNumber.replace(/[^0-9]/g, '')
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
  },
}
