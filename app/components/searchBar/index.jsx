import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';

class SearchBar extends Component {

  render(event) {
    const { search, searchTerm } = this.props;

    return (
        <div className="row">
            <div className="col-md-12">    
                <div className="form-inline">
                    <div className="input-group mb-2 ml-auto mt-4">
                        <input type="text"
                                className="form-control"
                                onChange={event => search(event.target.value)}
                                value={searchTerm}
                                placeholder="Search" />
                        <div className="input-group-addon">
                            <img src="images/ic_search.png" />
                        </div> 
                    </div>
                </div>  
            </div>
        </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
      searchTerm: state.rootReducer.searchTerm
    };
}

function mapDispatchToProps(dispatch) {
    return {
      search: (term) => dispatch(actions.search(term))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);