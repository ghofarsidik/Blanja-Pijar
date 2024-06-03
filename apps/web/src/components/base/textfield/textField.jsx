import React from 'react';

const Textfield = ({ label, type, id, name, placeholder, spellCheck, className, onChange, onBlur, value, autoComplete }) => {
  return (
    <div className="form-group grid items-center space-x-4">
      {label && <label htmlFor={id} className="w-1/4">{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        spellCheck={spellCheck}
        required
        placeholder={placeholder}
        className={`p-5 border border-gray-300 rounded focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 ${className}`}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
};

export default Textfield;
