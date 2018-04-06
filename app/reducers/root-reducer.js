const initialState = {
  oompaLoompas: [],
  oompaLoompaDetail: [],

  /* for search component */
  searchTerm: '',
  filteredOompaLoompas: [],

  /* for scroll component */
  isFetching: false,
  errorMessage: '',
  page: 0,
  hasMore: true
}

export function addOompaLoompaDetail(object, state) {
  const oompaLoompaDetail = object;
  return {...state, oompaLoompaDetail};
}

export function filterLoompasByTerm(term, state) {
  const searchTerm = term;
  const filteredOompaLoompas = state.oompaLoompas.filter((obj) => {
      return obj.first_name.toLowerCase().indexOf(term.toLowerCase()) !== -1
          || obj.last_name.toLowerCase().indexOf(term.toLowerCase()) !== -1
          || obj.profession.toLowerCase().indexOf(term.toLowerCase()) !== -1
  });
  return {...state, searchTerm, filteredOompaLoompas};
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_OOMPA_LOOPA_DETAIL':
      return  addOompaLoompaDetail(action.collection, state);

    case 'SEARCH_TERM':
      return filterLoompasByTerm(action.searchTerm, state);

    case 'POSTS_REQUEST':
      return {
        ...state,
        isFetching: true,
        page: action.page,
        hasMore: true
      };

    case 'POSTS_SUCCESS':
      const oompaLoompas = state.oompaLoompas;
      action.collection.forEach((oompaLoompa) => {
        oompaLoompas.push(oompaLoompa);
      });
      const filteredOompaLoompas = oompaLoompas;
      return {
        ...state,
        isFetching: false,
        oompaLoompas: oompaLoompas,
        filteredOompaLoompas: filteredOompaLoompas,
        hasMore: action.hasMore
      };

    case 'POSTS_FAILURE':
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage,
        hasMore: false
      };

    default:
      return state;
  }
}
