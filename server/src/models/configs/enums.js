// All models enums ( choices label )

module.exports = {
    // ads home page positions
    AD_POSITION_CHOICES: [
        { value: "1", label: "Slider" },
        { value: "2", label: "Deuxième section" }, // After slider
        { value: "3", label: "Dernière section" }, // After last card
    ],
    CLIENT_PROFILE_GENDER_CHOICES: [
        { value: "m", label: "Homme" }, // man
        { value: "f", label: "Femme" } // female
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
        { value: "p", label: "Platinium" },
        { value: "g", label: "Gold" },
        { value: "s", label: "Silver" }
    ]
}