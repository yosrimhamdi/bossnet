export const validateId = (v) => v && /^[0-9a-fA-F]{24}$/.test(v);

export const validatePasswordResetKey = (v) => v && /^[a-zA-Z0-9]{30}$/.test(v);
