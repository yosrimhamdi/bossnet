const Client = require("../models/Client");
const consola = require("consola");

const generateRandomClient = (direction, parent) => ({
  profile: {
    firstName: `Child - P(${parent && parent._id.toString()}) - ${direction}`,
    lastName: `test`,
    facebookAccountLink: "www.facebook.com/profile.php?id=1000103762550",
    mobilePhone: "54567123",
    gender: "m",
  },
  rib: "10006035183598478831",
  cinId: "12345678",
  email: `test${parent && parent._id.toString()}.${direction}@gmail.com`,
  encryptedPassword: "dsfsdfsdfsdfsddsfsd",
  isVerified: true,
  parent: parent._id,
  direction,
});

const createFirstTwoParents = async () => {
  const cl1 = new Client(generateRandomClient("l", null));
  await cl1.save();
  const cl2 = new Client(generateRandomClient("r", null));
  await cl2.save();
};
const getParentsBySize = async (size) => {
  return await Client.find({
    ancestors: {
      $size: size,
    },
  }).select("_id");
};
const createParentChildren = async (parent) => {
  const ch1 = new Client(generateRandomClient("l", parent));
  await ch1.save();
  const ch2 = new Client(generateRandomClient("r", parent));
  await ch2.save();
};
/*
 START by size 0
    find parents with that size
        create two childs for eache one
 repeat until size == 12 ( incerement size by 1)
*/
module.exports = async (startSize = 0, endSize = 12) => {
  // if (startSize == 0) await createFirstTwoParents();
  for (let size = startSize; size <= endSize; size++) {
    const parents = await getParentsBySize(size);
    for (let i = 0; i < parents.length; i++) {
      await createParentChildren(parents[i]);
    }
  }
  consola.log("Clients for testing created succesfuly");
};
