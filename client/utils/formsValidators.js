export const validatePhoneNumber = (v) => {
  if (v) {
    const VALID_NUMBER_REGEX = /^[0-9]{8}$/;
    v = v.replaceAll(" ", "").replace("+216", "");
    return VALID_NUMBER_REGEX.test(v);
  }
  return true; // reuired validation already exists
};

export const validateFacebookProfileLink = (v) => {
  if (v)
    return v.startsWith("www.facebook.com/profile.php?id=") && v.length < 120;
  return true;
};

export const validateCinId = (v) => {
  if (v) return /^[0-9]{8}$/.test(v);
  return true;
};

export const validateRib = (v) => {
  if (v) return /^[0-9]{20}$/.test(v.replaceAll(" ", ""));
  return true;
};

export const validatePassword = (v) => {
  if (v) return v.length >= 8 && v.length <= 128 && /^[\S]+$/.test(v);
  return true;
};

export const validateMongoId = (v) => {
  if (v) return /^[0-9a-fA-F]{24}$/.test(v);
  return true;
};
