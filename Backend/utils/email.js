// import nodemailer from "nodemailer";

// export const sendEmail = async (options) => {
//     const transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD, // Corrected this line
//         }
//     });

//     const mailOptions = { 
//         from: "Mahnoor Tufail <mahnoortufail@gmail.com>",
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//     };
    
//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent: ' + info.response);
//     } catch (error) {
//         console.error('Error sending email:', error);
//         // Handle the error as needed, e.g., throw a custom error or return a response
//     }
// };
