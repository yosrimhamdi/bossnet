// All models enums ( choices label )

const {
  ADMIN_ROLE,
  ADMIN,
  ADVERTISSMENT,
  CONTACT,
  CUSTOM_PAGE,
  CLIENT,
  CLIENT_PASSWORD_RESET,
  CLIENT_PAYMENT,
  CATEGORY,
  PARTNER,
  PARTNER_OFFER,
} = require("./collectionsNames");

module.exports = {
  // ads home page positions
  AD_POSITION_CHOICES: [
    { value: "1", label: "Slider" },
    { value: "2", label: "Deuxième section" }, // After slider
    { value: "3", label: "Dernière section" }, // After last card
  ],
  CLIENT_PROFILE_GENDER_CHOICES: [
    { value: "m", label: "Homme" }, // man
    { value: "f", label: "Femme" }, // female
  ],
  CLIENT_CHILD_DIRECTION_CHOICES: [
    { value: "l", label: "Gauche" }, // right
    { value: "r", label: "Droit" }, // left
  ],
  CLIENT_PAYMENT_METHOD_CHOICES: [
    { value: "ca", label: "Espèces" }, // cash
    { value: "ch", label: "Chèque" }, // check
    { value: "d", label: "Brouillon" }, // draft
    { value: "t", label: "Transfert" }, // transfert
  ],
  PARTNER_TYPE_CHOICES: [
    { value: "1", label: "Platinium" },
    { value: "2", label: "Gold" },
    { value: "3", label: "Silver" },
  ],
  ADMIN_PERMISSION_COLLECTION_CHOICES: [
    { value: ADMIN, label: "Administrateurs" },
    { value: ADMIN_ROLE, label: "Rôles de l'administration" },
    { value: ADVERTISSMENT, label: "Publicités" },
    { value: CONTACT, label: "Contactes" },
    { value: CUSTOM_PAGE, label: "Pages personnalisées" },
    { value: CLIENT, label: "Clients" },
    { value: CLIENT_PASSWORD_RESET, label: "Réinitialisation du mot de passe" },
    { value: CLIENT_PAYMENT, label: "Paiement des clients" },
    { value: CATEGORY, label: "Catégories" },
    { value: PARTNER, label: "Partenaires" },
    { value: PARTNER_OFFER, label: "Offres" },
  ],
};
