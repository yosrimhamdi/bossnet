const { ValidationError } = require("admin-bro");
const Client = require("../../../../models/Client");
const { CLIENT_CHILD_DIRECTION_CHOICES } = require("../../../../models/configs/enums");
const { PARENT_CHILD_DIRECTION_ALREADY_EXISTS, REQUIRED_ERROR_MSG, ROOT_ALREADY_EXISTS } = require("../../configs/customErrors");
// --------------------------------------


const directionIsRoot = (direction) => direction == CLIENT_CHILD_DIRECTION_CHOICES[2].value;

const rootClientIsAlreadyExists = async (clientId) => !!(await Client.findOne({
    _id: { $ne: clientId },
    direction: CLIENT_CHILD_DIRECTION_CHOICES[2].value
}));

const validateParentChildDirection = async (parentId, childId, direction) => {

    // Check if parent has a place for another child in specific direction
    const parentChildByDirection = (await Client.findOne({ parent: parentId, direction }).select(["_id"]));
    if (parentChildByDirection && parentChildByDirection._id.toString() != childId) {
        throw new ValidationError({
            direction: {
                message: PARENT_CHILD_DIRECTION_ALREADY_EXISTS,
            },
        });
    }
}



module.exports = async (payload) => {
    const { _id, parent, direction } = payload;

    if (direction) {
        if (directionIsRoot(direction)) {
            if (await rootClientIsAlreadyExists(_id)) {
                throw new ValidationError({
                    direction: {
                        message: ROOT_ALREADY_EXISTS,
                    },
                });
            }
        } else if (!parent) {
            throw new ValidationError({
                parent: {
                    message: REQUIRED_ERROR_MSG,
                },
            });
        } else {
            await validateParentChildDirection(parent, _id, direction);
        }
    }
}