import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class OompaLoompaList extends Component {

  constructor(props){
    super(props);
  } 

  render() {
    const { filteredOompaLoompas } = this.props;
    let oompaLoopaElements = null;  
    oompaLoopaElements = filteredOompaLoompas.map((each, index) => {
      const { id, first_name, last_name, gender, profession, image } = each;
      const gender_word = (gender === 'F') ? 'Woman' : 'Man';
      return (
        <div key={index} className="col-md-4 mb-5" onClick={() => browserHistory.push("/" + id)}>
            <div className="oompa-item h-100">
            <img src={image} className="img-fluid" onError={(e)=>{e.target.src="images/oompa-fallback.png"}} />
            <div className="mt-3">
                <strong>{first_name} {last_name}</strong>
                <div className="text-secondary">{gender_word}</div>
                <div className="text-secondary">{profession}</div>
            </div>
            </div>
        </div>
      );
    });

    if (filteredOompaLoompas.length) {
        return (
          <div className="row">
            {oompaLoopaElements}
          </div>  
        );
    } else {
        return (
          <div className="row">
            <div className="col-md-12 text-center">
              <h5 className="no-loompas-found text-secondary">No Oompa Loopas are found :(</h5>
            </div>
          </div>  
        );
    }
  }
}