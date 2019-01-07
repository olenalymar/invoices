import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextArea = ({ label, name, value, placeholder, onChange, error }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        className={classnames('', {
          error: error
        })}
        placeholder={placeholder}
        cols="30"
        rows="3"
        value={value}
        onChange={onChange}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TextArea;
