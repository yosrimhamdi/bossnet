const PAGINATE_BY_DEFAULT = 12;

const getCollectionPaginationSkip = (page, paginateBy = PAGINATE_BY_DEFAULT) => {
    return paginateBy * (page - 1);
}

const getPaginationStats = (Model, "");