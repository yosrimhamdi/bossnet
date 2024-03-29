const UNEXPECTED_ERROR = {
  type: "error",
  title: "Erreur inattendue!",
  content:
    "Une erreur s'est produite, veuillez vérifier votre connexion ou réessayer plus tard.",
};

export default {
  // globals
  UNEXPECTED_ERROR,
  MONGOOSE_ERROR: UNEXPECTED_ERROR,
  CAPTCHA_ERROR: {
    type: "error",
    title: "Erreur CAPTCHA!",
    content:
      "Erreur lors de la vérification du captcha, veuillez actualiser la page et réessayer.",
  },
  INPUTS_ERROR: {
    type: "error",
    title: "Erreur",
    content:
      "Une erreur s'est produite, veuillez vérifier vos données saisies.",
  },
  CLIENT_DOES_NOT_EXISTS_ERROR: {
    type: "error",
    title: "Erreur",
    content:
      "Un client avec cet email n'existe pas, veuillez vérifier vos données saisies.",
  },

  // Contact
  CONTACT_SUCCESS: {
    type: "success",
    title: "Merci de nous contacter!",
    content: `Merci d'avoir renseigné vos informations,
    <br/>Un de nos collègues vous répondra bientôt.`,
  },

  // sign Up
  PARENT_HAS_FULL_CHILDREN_ERROR: {
    type: "error",
    title: "Erreur",
    content:
      "Le parent n'est pas disponible pour l'inscription, veuillez vérifier vos données saisies.",
  },
  PARENT_NOT_FOUND_ERROR: {
    type: "error",
    title: "Erreur",
    content: "Le parent n'existe pas, veuillez vérifier vos données saisies.",
  },
  EMAIL_ALREADY_EXISTS_ERROR: {
    type: "error",
    title: "Erreur",
    content:
      "Un client avec cet email existe déjà, veuillez vérifier vos données saisies.",
  },
  SIGNUP_SUCCESS: {
    type: "success",
    title: "Merci pour votre inscription!",
    content: `Merci d'avoir renseigné vos informations,
    <br/>Un de nos collègues vous contactera bientôt pour compléter le processus d'inscription.`,
  },
  // Sign In

  CLIENT_PASSWORD_AND_EMAIL_DOES_NOT_MATCH_ERROR: {
    type: "error",
    title: "Erreur",
    content:
      "Email ou mot de passe incorrect, veuillez vérifier vos données saisies.",
  },
  SIGNIN_SUCCESS: {
    type: "success",
    title: "Bienvenue!",
    content: "Bienvenue à votre compte bossnet.",
  },
  // reset password
  CLIENT_SEND_RESET_PASSWORD_EMAIL_ERROR: UNEXPECTED_ERROR,
  CLIENT_PASSWORD_RESET_DOES_NOT_EXISTS_ERROR: {
    type: "error",
    title: "Lien invalide",
    content:
      "Le lien de réinitialisation que vous avez saisi n'est pas valide, veuillez réessayer.",
  },
  CLIENT_PASSWORD_RESET_EXPIRED_ERROR: {
    type: "error",
    title: "Lien expiré",
    content:
      "Le lien de réinitialisation que vous avez saisi a expiré, veuillez réessayer.",
  },
  CLIENT_PASSWORD_RESET_SUCCESS: {
    type: "success",
    title: "Réinitialisation terminée",
    content: `La réinitialisation de votre mot de passe a été effectuée avec succès,
       vous pouvez maintenant vous connecter avec votre nouveau mot de passe.`,
  },
  // client update
  CLIENT_UPDATE_NOT_ALLOWED_ERROR: {
    type: "error",
    title: "Erreur",
    content:
      "Mot de passe actuel incorrect, veuillez vérifier vos données saisies.",
  },
  CLIENT_UPDATE_DATA_SUCCESS: {
    type: "success",
    title: "Succès",
    content: "Vos informations personnelles ont été enregistrées.",
  },
  CLIENT_UPDATE_PASSWORD_SUCCESS: {
    type: "success",
    title: "Succès",
    content: "Mot de passe mis à jour avec succès.",
  },
  AUTH_TOKEN_EXPIRED_INFO: {
    type: "info",
    title: "Session expiré",
    content: "Votre session a expiré, veuillez vous reconnecter!",
  },

  // rate limits errors
  CONTACT_TOO_MANY_REQUESTS_ERROR: {
    type: "error",
    title: "Opération non autorisée",
    content: `Vous pouvez soumettre un maximum de 10 demandes par jour.`,
  },
  CLIENT_TOO_MANY_REQUESTS_ERROR: {
    type: "error",
    title: "Opération non autorisée",
    content: `Veuillez patienter quelques minutes avant de réessayer.`,
  },
};
