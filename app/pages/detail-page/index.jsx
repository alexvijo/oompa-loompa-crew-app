import React from 'react';
import { Redirect } from 'react-router'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';


class DetailPage extends React.Component {
  
  componentDidMount() {
    const reg = new RegExp('^[0-9]+$'); // Validate first the param '^\\d+$'
    reg.test(this.props.params.id) ? this.props.fetchDetail(this.props.params.id)
                                   : this.context.router.push('/');
  }

  render() {
    const { first_name, last_name,
            description, gender,
            image, profession, email } = this.props.oompaLoompaDetail; 
    const gender_word = (gender === 'F') ? 'Woman' : 'Man';

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-7">
            <img src={image} className="img-fluid" onError={(e)=>{e.target.src="images/oompa-fallback.png"}} />
          </div>
          <div className="col-md-5"> 
            <h5 className="bold">{first_name} {last_name}</h5>
            <h6 className="text-secondary">{gender_word}</h6>
            <h6 className="text-secondary">{profession}</h6>
            <div className="mt-3" dangerouslySetInnerHTML={{ __html: description }}></div>
           </div>
        </div>
      </div>
    );
  }
}

DetailPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { 
    oompaLoompaDetail: state.rootReducer.oompaLoompaDetail,
  };
}

function mapDispatchToProps(dispatch) {
    return {
      fetchDetail: (id) => dispatch(actions.fetchDetail(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
