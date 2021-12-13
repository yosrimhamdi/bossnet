const Client = require("../../../../models/Client");

const deleteOldAncestors = (payload) => {
    for (const key in payload) {
        if (key.startsWith("ancestors.")) {
            delete payload[key];
        }
    }
}

const getAncestorsByParent = async (parentId) => {
    const parent = (await Client.findById(parentId).select("ancestors"));
    let parentAncestors;
    if (parent) {
        parentAncestors = parent.ancestors;
    }
    return [...parentAncestors, parentId];
}

module.exports = async (payload) => {
    deleteOldAncestors(payload);
    if (payload.parent) {
        payload.ancestors = await getAncestorsByParent(payload.parent);
    }
}