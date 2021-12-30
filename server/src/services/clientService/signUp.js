const Client = require("../../models/Client");
const bcrypt = require("bcrypt");
const {
  CLIENT_CHILD_DIRECTION_CHOICES,
} = require("../../models/configs/enums");
const {
  ParentDoesNotExistsError,
  ParentHasFullChildrenError,
  EmailAlreadyExistsError,
} = require("./exceptions");

const validateParentAndGetDirection = async (parentId) => {
  const parent = await Client.findOne({ _id: parentId, isVerified: true });
  if (!parent) throw new ParentDoesNotExistsError();

  const parentChildren = await Client.find({
    parent: parentId,
  }).select("direction");
  if (parentChildren.length > 1) {
    throw new ParentHasFullChildrenError();
  }
  if (parentChildren.length == 0) {
    return CLIENT_CHILD_DIRECTION_CHOICES[0].value;
  }
  const existedChildDirection = parentChildren[0].direction;
  if (CLIENT_CHILD_DIRECTION_CHOICES[0].value == existedChildDirection) {
    return CLIENT_CHILD_DIRECTION_CHOICES[1].value;
  }
  return CLIENT_CHILD_DIRECTION_CHOICES[0].value;
};

module.exports = async ({
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
}) => {
  const direction = await validateParentAndGetDirection(parentId);
  console.log({ direction });
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const client = new Client({
      profile: {
        firstName,
        lastName,
        gender,
        mobilePhone,
        facebookAccountLink,
      },
      cinId,
      rib,
      email,
      encryptedPassword,
      parent: parentId,
      direction,
    });
    await client.save();
    return client;
  } catch (err) {
    // unique email error
    if (err.code == 11000) {
      throw new EmailAlreadyExistsError();
    } else {
      throw err;
    }
  }
};
