const navigationGroups = require("./../resources/configs/navigationGroups");

const getResourceCounts = async (resource) => {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  return {
    all: await resource.MongooseModel.count(),
    today: await resource.MongooseModel.count({
      createdAt: {
        $gte: todayDate,
      },
    }),
  };
};

const getAllResources = async (context) => {
  const allowedResourcesOnly = context._admin.resources.filter((resource) =>
    resource._decorated.actions.show.action.isAccessible(context)
  );
  return await Promise.all(
    allowedResourcesOnly.map(async (resource) => ({
      id: resource._decorated.id(),
      name: resource._decorated.getResourceName(),
      navigation: resource._decorated.getNavigation(),
      counts: await getResourceCounts(resource),
    }))
  );
};

const getGroupResources = (navGroup, resources) => {
  const navGroupResources = resources.filter((resource) => {
    return resource.navigation.name == navGroup.name;
  });
  return navGroupResources.map(({ id, name, counts }) => ({
    id,
    name,
    counts,
  }));
};

const getResourcesByGroups = async (context) => {
  const resources = await getAllResources(context);
  return Object.values(navigationGroups)
    .map((navGroup) => ({
      navGroup,
      resources: getGroupResources(navGroup, resources),
    }))
    .filter(({ resources }) => resources.length); // remove empty groups
};

const getAdmin = ({
  currentAdmin: { _id, fullName, email, isSuperuser, role },
}) => ({
  _id,
  fullName,
  email,
  isSuperuser,
  role,
});

module.exports = async (req, res, context) => {
  return {
    resourcesByGroups: await getResourcesByGroups(context),
    admin: getAdmin(context),
  };
};
