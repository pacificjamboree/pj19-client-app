import sortBy from 'lodash.sortby';

export default clickedColumn => state => {
  const { column, data, direction } = state;
  if (column !== clickedColumn) {
    return {
      column: clickedColumn,
      data: sortBy(data, [clickedColumn]),
      direction: 'ascending',
    };
  }

  return {
    data: data.reverse(),
    direction: direction === 'ascending' ? 'descending' : 'ascending',
  };
};
