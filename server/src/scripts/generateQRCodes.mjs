import consola from "consola";

import dbConnect from "../loaders/mongoose.js";
import Client from "../models/Client.js";
import { generateQRCode } from "../services/clientService/index.js";

const dbc = await dbConnect();
const clients = await Client.find();

clients.forEach(async (client) => {
  try {
    await generateQRCode(client);
    consola.success(`qrcode generated for client _id = ${client._id}`);
  } catch (e) {
    consola.error(e);
  }
});

dbc.connection.close();
