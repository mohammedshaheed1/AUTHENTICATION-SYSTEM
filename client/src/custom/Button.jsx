import React from 'react'

const Button = ({children,type="button",bgColor="",textColor="",className="",...props}) => {
  return (
    <button className={`px-4 py-2  ${bgColor} ${textColor} ${className}`} {...props} >{children}</button>
  )
}

export default Button