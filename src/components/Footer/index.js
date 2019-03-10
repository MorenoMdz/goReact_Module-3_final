import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const Footer = ({ count }) => {
  return (
    <div>
      <p>You have {count} favorites</p>
    </div>
  );
};

Footer.propTypes = {
  count: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  return {
    count: state.favorites.data.length,
  };
};

export default connect(mapStateToProps)(Footer);
