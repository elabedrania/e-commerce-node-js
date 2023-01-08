const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service : "Gmail",
    auth: {
        user: "raniiaelabed@gmail.com",
        pass:"Rania rania1234567@@##$$%%"
    }
});


module.exports.sendConfirmationEmail = (email, activationCode)=>{
    transport
    .sendMail({
        from: "raniiaelabed@gmail.com",
        to: email,
        subject: "confirmer votre compte",
        html:'<h1>email de confirmation</h1> <h2>pour activer veuillez cliquer sur ce lien</h2> <a href=http://localhost:8081/confirm/${activationCode}>Cliquez ici ! </a>'

    })
    .catch((err)=> console.log(err));
};