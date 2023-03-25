const fuzzySearch = (searchTerm, data) => {
  const searchTermLower = searchTerm.toLowerCase();

  const isMatch = (search, text) => {
    let searchIndex = 0;

    for (const char of text) {
      if (search[searchIndex] === char) searchIndex++;

      if (searchIndex === search.length) return true;
    }
    return false;
  };

  const isItemMatch = (search, item) => {
    return Object.values(item).some(value => isMatch(search, String(value).toLowerCase()));
  };

  return data?.filter(item => isItemMatch(searchTermLower, item));
};

export default fuzzySearch
