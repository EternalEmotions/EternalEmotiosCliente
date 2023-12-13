// notificationService.js

// Este es un servicio de notificación simulado.
// En un entorno real, reemplazarías esta lógica con llamadas a un servicio de notificación real.

const notificationService = {
    async sendNotification({ userEmail, orderDetails }) {
      // Simula el envío de una notificación
      console.log(`Notificación enviada a ${userEmail} con detalles de la orden:`, orderDetails);
  
      // Puedes agregar más lógica aquí según tus necesidades
      return { success: true, message: 'Notificación enviada con éxito' };
    },
  };
  
  export default notificationService;
  