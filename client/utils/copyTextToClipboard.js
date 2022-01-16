export default (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
    return true;
  } else {
    alert(
      "Votre navigateur ne prend pas en charge la copie automatique, veuillez copier manuellement."
    );
  }
  return false;
};
