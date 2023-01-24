const qrcode = require("qrcode");
const path = require("path");

module.exports = async (client) => {
  const {
    _id,
    email,
    cinId,
    profile: { firstName, lastName, mobilePhone },
  } = client;

  try {
    await qrcode.toFile(
      path.join(__dirname, "../../../public/qrcodes", `${_id}.png`),
      `Bienvenue à BOSSNET MARKETING\nNom et Prenom: ${firstName} ${lastName}\nNum Tel: ${mobilePhone}\nCIN: ${cinId}\nE-mail: ${email}\nEst notre chère client.`,
      { width: 300 }
    );
  } catch (e) {
    console.error(e);
  }
};
