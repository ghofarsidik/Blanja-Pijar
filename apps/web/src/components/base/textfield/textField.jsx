import React from 'react'

const Textfield = ({ label, type, id, placeholder, spellCheck, className, props, onChange}) => {
  return (
    <form>
    <div className="form-group grid items-center space-x-4">
      <label htmlFor={id} className="w-1/4">{label}</label>
      <input
        type={type} 
        id={id} 
        spellCheck={spellCheck} 
        required 
        placeholder={placeholder}
        className={`p-5 border border-gray-300 rounded focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 ${className}`}
        {...props}
        onChange={onChange}
      />
    </div>
  </form>
  )
}

export default Textfield