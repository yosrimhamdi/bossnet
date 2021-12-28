const UNEXPECTED_ERROR = {
  type: "error",
  title: "Erreur inattendue!",
  content:
    "Une erreur s'est produite, veuillez vérifier votre connexion ou réessayer plus tard.",
};
export default {
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
  CONTACT_SUCCESS: {
    type: "success",
    title: "Merci de nous contacter!",
    content: `Merci d'avoir renseigné vos informations,<br/>Un de nos collègues vous répondra bientôt.`,
  },
};
