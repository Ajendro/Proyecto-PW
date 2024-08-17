const nodemailer = require('nodemailer');

const transportLisa = {
    tls: { rejectUnauthorized: false },
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: "fintechnc@gmail.com",
        pass: "bplwnzddzukclgpm"
    }
};

async function sendPaymentConfirmationEmail(email, cardNumber, paymentMethodType) {
    const transporter = nodemailer.createTransport(transportLisa);

    const message = {
        from: `LISA <${transportLisa.auth.user}>`, // sender address
        to: email,
        subject: 'Payment Method Confirmation',
        text: `Your payment method has been successfully added.\nCard Number: ${cardNumber}\nPayment Method Type: ${paymentMethodType}`,
    };

    try {
        const info = await transporter.sendMail(message);
        console.log('Información de envío de correo:', info);
        return info;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('Error al enviar el correo');
    }
}

module.exports = sendPaymentConfirmationEmail;
