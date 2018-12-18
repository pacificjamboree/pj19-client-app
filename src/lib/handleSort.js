import sortBy from 'lodash.sortby';

export default clickedColumn => state => {
  const { data } = state;
  const { column, direction } = state.sort;
  if (column !== clickedColumn) {
    return {
      sort: {
        column: clickedColumn,
        direction: 'ascending',
      },
      data: sortBy(data, [clickedColumn]),
    };
  }

  return {
    data: data.reverse(),
    sort: {
      column: clickedColumn,
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    },
  };
};
