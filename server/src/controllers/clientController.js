const clientService = require("./../services/clientService");

/*
    body: {
      firstName,
      lastName,
      gender,
      mobilePhone,
      facebookAccountLink,
      cinId,
      rib,
      email,
      password,
      parentId,
    }
*/
const signUp = async (req, res) => {
  const client = await clientService.signUp(req.body);
  res.status(201).send({
    clientId: client._id,
  });
};

/*
  body: {
    email,
    password
  }
*/
const signIn = async (req, res) => {
  const response = await clientService.signIn(req.body);
  res.send(response);
};

/*
  body: {email}
*/
const resetPasswordRequest = async (req, res) => {
  await clientService.resetPasswordRequest(req.body.email);
  res.status(204).send();
};

/*
  body: {
    clientId,
    resetKey,
    password
  }
*/
const resetPassword = async (req, res) => {
  await clientService.resetPassword(req.body);
  res.status(204).send();
};

/*
  body: {
    password,
    firstName,
    lastName,
    gender,
    mobilePhone,
    facebookAccountLink,
    cinId,
    rib
  }
*/
const updateData = async (req, res) => {
  await clientService.updateData(req.client._id, req.body);
  res.status(204).send();
};

/*
  body: {
    currentPassword,
    newPassword
  }
*/
const updatePassword = async (req, res) => {
  await clientService.updatePassword(req.client._id, req.body);
  res.status(204).send();
};

/*
  params: {clientId}
*/
const getTreeByClientId = async (req, res) => {
  const clients = await clientService.getTreeByClientId(
    req.params.clientId,
    req.client._id
  );
  res.send({
    clients,
  });
};

/*
  params: {page}
*/
const getAuthClientChildren = async (req, res) => {
  const clients = await clientService.getClientChildren(
    req.client._id,
    req.params.page
  );
  res.send({
    clients,
  });
};

const getAuthClientBalance = async (req, res) => {
  const balance = await clientService.getClientBalance(req.client._id);
  res.send({ balance });
};

/*
  params: {page}
*/
const getAuthClientPaymentsHistory = async (req, res) => {
  const payments = await clientService.getClientPaymentsHistory(
    req.client._id,
    req.params.page
  );
  res.send({
    payments,
  });
};

module.exports = {
  signUp,
  signIn,
  resetPasswordRequest,
  resetPassword,
  getTreeByClientId,
  getAuthClientChildren,
  updateData,
  updatePassword,
  getAuthClientBalance,
  getAuthClientPaymentsHistory,
};
