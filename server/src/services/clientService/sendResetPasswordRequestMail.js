const { EMAIL_USER, HOST_NAME } = require("../../config");
const nodeMailerTransporter = require("../../utils/nodeMailerTransporter");
const { ClientSendResetPasswordEmailError } = require("./exceptions");

const generetResetPasswordLink = (clientId, resetPasswordKey) => {
  return `${HOST_NAME}/reset-password/${clientId}/${resetPasswordKey}`;
};

module.exports = async (clientEmail, clientId, resetPasswordKey) => {
  try {
    await nodeMailerTransporter.sendMail({
      from: EMAIL_USER,
      to: clientEmail,
      subject: "Réinitialisation du mot de passe - Bossnet",
      html: `
      <h1>Réinitialisation du mot de passe - Bossnet</h1>
    Une demande de réinitialisation de votre mot de passe a été effectuée.<br/>
     Si vous n'avez pas fait cette demande, ignorez simplement cet e-mail. Si vous avez fait cette demande, cliquez simplement sur le lien ci-dessous :<br/>
    ${generetResetPasswordLink(clientId, resetPasswordKey)}<br/><br/>
    Si l'URL ci-dessus ne fonctionne pas, essayez de la copier et de la coller dans votre navigateur.<br/>
     Si vous continuez à rencontrer des problèmes, n'hésitez pas à nous contacter.<br/>
    Remarque : Ce lien expire après 2 heures.
    `,
    });
  } catch {
    throw new ClientSendResetPasswordEmailError();
  }
};
