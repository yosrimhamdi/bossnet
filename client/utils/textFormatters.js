const NOT_SPACE_OR_ALPHANUM_REGEX = /[^\w\s\zàâçéèêëîïôûùüÿñæœ]/gi;
export const formatSearchQuery = (searchQuery) =>
  searchQuery.replace(NOT_SPACE_OR_ALPHANUM_REGEX, "");
