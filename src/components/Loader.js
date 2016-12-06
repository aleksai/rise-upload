import React from 'react';

const Loader = ({ size = 'medium', theme = 'dark' }) => {
  const classes = `loader ${size} ${theme}`;
  return <div className={classes}/>;
};

Loader.propTypes = {
  size: React.PropTypes.oneOf(['small', 'medium', 'large'])
};

export default Loader;
