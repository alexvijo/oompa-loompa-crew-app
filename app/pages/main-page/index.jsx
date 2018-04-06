import React, { Component } from 'react';
import SearchBar from '../../components/searchBar/index';
import OompaLoompaList from '../../components/oompa-loompa-list/index';
import ReduxLazyScroll from '../../components/redux-lazy-scroll/index';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';

class MainPage extends React.Component {

  componentDidMount() {
    // fetch data if no oompaLoompas (in localStorage)
    !this.props.oompaLoompas.length ? this.props.fetchData(this.props.page) : false;
  }

  loadPosts() {
    this.props.fetchData(this.props.page);
  }

  render() {
    const { searchTerm, oompaLoompas, filteredOompaLoompas } = this.props;
    const { isFetching, errorMessage, hasMore } = this.props;
    
    return (
      <ReduxLazyScroll
        isFetching={isFetching}
        errorMessage={errorMessage}
        loadMore={this.loadPosts.bind(this)}
        hasMore={hasMore}
      >
        <div className="container">
          <SearchBar />
          <div className="row">
            <div className="col-md-12 text-center mt-3 mb-5">
              <h1>Find your Oompa Loompa</h1>
              <h3 className="text-secondary">There are more than 100k</h3>
            </div>
          </div>
          <OompaLoompaList filteredOompaLoompas={filteredOompaLoompas} />
          <div className="row">
            <div className="col-md-12">
              {isFetching && <div className="text-center">
                <h6> Loading Oompa Loompas... </h6>
                <img className="navbar-brand" width="42" src="images/bb8-loading.gif" />
              </div>}
              {!hasMore && !errorMessage && <div className="alert alert-success">
                <h6>All oompa loompas have been loaded.</h6>
                </div>}
            </div>
          </div>          
        </div>
      </ReduxLazyScroll>   
    );
  }
}

function mapStateToProps(state) {
  return { 
    oompaLoompas: state.rootReducer.oompaLoompas,
    filteredOompaLoompas: state.rootReducer.filteredOompaLoompas,
    searchTerm: state.rootReducer.searchTerm,
    isFetching: state.rootReducer.isFetching,
    errorMessage: state.rootReducer.errorMessage,
    hasMore: state.rootReducer.hasMore,
    page: state.rootReducer.page,
    limit: state.rootReducer.limit
  };
}

function mapDispatchToProps(dispatch) {
    return {
      fetchData: (page) => dispatch(actions.fetchData(page))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);