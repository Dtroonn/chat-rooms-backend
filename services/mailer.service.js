const { nodemailerTransporter } = require("../core/nodemailer");

class MailerService {
    async verify(to, name, token) {
        return nodemailerTransporter.sendMail({
            from: process.env.USER_MAIL,
            to,
            subject: `Активация аккаунта на ${process.env.FRONTEND_URL}`,
            text: "",
            html: `
                <div>
                    <h2>"${name}, здравствуйте! Для подтверждения аккаунта перейдите по ссылке, которая находится ниже."</h2>
                    <br/>
                    <p><a href="${process.env.FRONTEND_URL}${process.env.VERIFY_MAIL_RELATIVE_PATH}/${token}">
                        "${process.env.FRONTEND_URL}${process.env.VERIFY_MAIL_RELATIVE_PATH}/${token}"
                    </a></p>
                    <br/>
                    <div>Если вы не регистрировались на данном сайте, то просто проигнорируйте сообщение</div>
                </div>
            `,
        });
    }
}

module.exports = new MailerService();
