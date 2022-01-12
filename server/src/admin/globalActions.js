const flat = require("flat");
const { SortSetter, Filter, populator } = require("admin-bro");
const PER_PAGE_LIMIT = 500;

module.exports = {
  // THE main reason of this action handler is
  // to fix adminBro filter by _id bug manually
  list: async (request, response, context) => {
    const { query } = request;
    const { sortBy, direction, filters = {} } = flat.unflatten(query || {});
    const { resource } = context;
    let { page, perPage } = flat.unflatten(query || {});

    if (perPage) {
      perPage = +perPage > PER_PAGE_LIMIT ? PER_PAGE_LIMIT : +perPage;
    } else {
      perPage = 10; // default
    }
    page = Number(page) || 1;

    const listProperties = resource.decorate().getListProperties();
    const firstProperty = listProperties.find((p) => p.isSortable());
    let sort;
    if (firstProperty) {
      sort = SortSetter(
        { sortBy, direction },
        firstProperty.name(),
        resource.decorate().options
      );
    }
    let records = [],
      total = 0;
    const filter = await new Filter(filters, resource).populate();

    if (filters._id) {
      try {
        records = await resource.findMany([filters._id]);
        total = records ? records.length : 0;
      } catch (err) {}
    } else {
      records = await resource.find(filter, {
        limit: perPage,
        offset: (page - 1) * perPage,
        sort,
      });
      total = await resource.count(filter);
    }
    const populatedRecords = await populator(records);

    // eslint-disable-next-line no-param-reassign
    context.records = populatedRecords;

    return {
      meta: {
        total,
        perPage,
        page,
        direction: sort.direction,
        sortBy: sort.sortBy,
      },
      records: populatedRecords.map((r) => r.toJSON(context.currentAdmin)),
    };
  },
};
