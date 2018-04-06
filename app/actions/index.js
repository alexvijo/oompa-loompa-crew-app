import 'whatwg-fetch';

export function search(searchTerm) {
  return {
    searchTerm,
    type: 'SEARCH_TERM'
  };
}

export function requestOompaLoompas(page) {
  return {
    type: 'POSTS_REQUEST',
    page: page + 1
  }
}

export function successOompaLoompas(collection) {
  return {
    type: 'POSTS_SUCCESS',
    collection,
    hasMore: collection.length > 0
  }
}

export function requestError(error) {
  return {
    type: 'POSTS_FAILURE',
    errorMessage: error
  }
}

export function fetchData(page) {
  const URL = `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`;
  console.log('URL', URL);
  return dispatch => {
    dispatch(requestOompaLoompas(page));
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        dispatch(successOompaLoompas(jsonResponse.results));
      });
  };
}

export function addOompaLoompaDetail(collection) {
  return {
    collection: collection,
    type: 'ADD_OOMPA_LOOPA_DETAIL'
  };
}

export function fetchDetail(id) {
  const RESOURCE = `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${id}`;
  return dispatch => {
    fetch(RESOURCE)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        dispatch(addOompaLoompaDetail(jsonResponse));
      });
  };
}