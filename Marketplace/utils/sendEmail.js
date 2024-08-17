const nodemailer = require('nodemailer');

// Configura el transportador de correo con Mailtrap
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ea0eb92cc1978c",
        pass: "d188281e902715"
    }
});

// Función para enviar el correo de confirmación del método de pago
const sendPaymentConfirmationEmail = async (email, cardNumber, paymentMethodType) => {
    const mailOptions = {
        from: "merchanjair1@gmail.com", // Dirección del remitente
        to: email,
        subject: 'Confirmación de Compra',
        text: `Hola,\n\nTu nueva compra se realizó con éxito.\n\nDetalles:\nNúmero de tarjeta: ${cardNumber}\nTipo de pago: ${paymentMethodType}\n\nGracias por usar nuestro servicio.`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
        return info;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error;
    }
};

module.exports = {
    sendPaymentConfirmationEmail
};

