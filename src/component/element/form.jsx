import React from 'react'

const Form = (props) => {
  const {teks,name,type,value,onchange} = props;
  return (
    <div>
    <label htmlFor={name} className="block text-sm font-medium leading-2 text-gray-900">
      {teks}
    </label>
    <div className="mt-1">
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={name}
        value={value}
        onChange={onchange}
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
      />
    </div>
  </div>
  )
}

export default Form