import React from 'react';
import Header from '../header/index';

export default class Base extends React.Component {
  static propTypes = {
    children: React.PropTypes.element
  };

  render() {
    return (
      <section>
        <Header />
        {this.props.children}
      </section>
    );
  }
}
