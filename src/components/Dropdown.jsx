import React from 'react';
import PropTypes from 'prop-types';

const mapListToOptions = (list, key, label) => {
    return list.map((elem, i) => {
        return <option key={elem[key]} value={elem[key]}>{elem[label]}</option>
    });
}

const Dropdown = ({ items, onChange, currentValue, itemKey, itemLabel }) => (
    <select
        className="form-control"
        value={currentValue}
        onChange={onChange}
    >
        {mapListToOptions(items, itemKey, itemLabel)}
    </select>
);

Dropdown.propTypes = {
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    currentValue: PropTypes.string.isRequired,
    itemKey: PropTypes.string,
    itemLabel: PropTypes.string
};

Dropdown.defaultProps = {
    itemKey: 'code',
    itemLabel: 'name'
};

export default Dropdown;