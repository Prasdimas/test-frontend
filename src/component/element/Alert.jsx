import React from 'react'

const Alert = (props) => {
  const {msg} = props
    return (
 <div className='w-64 mx-auto'>
  <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 W-10%">
    Danger
  </div>
  <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
    {msg}
  </div>
</div>
  )
}

export default Alert