module.exports = (clientDoc) => {
  const client = clientDoc.toObject();
  if (client.parent) {
    if (client.parent.ancestors) {
      client.parent.ancestorsSize = client.parent.ancestors.length;
      delete client.parent.ancestors;
    } else {
      client.parent.ancestorsSize = 0;
    }
  }
  if (client.encryptedPassword) {
    delete client.encryptedPassword;
  }
  return client;
};
