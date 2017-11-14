import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, size, onClick, className }) => (
    <i
        className={`fa fa-${name} ${className}`}
        style={{ width: `${size}px` }}
        onClick={onClick}
    >
    </i>
);

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    onClick: PropTypes.func
};

Icon.defaultProps = {
    size: 50
};

export default Icon;