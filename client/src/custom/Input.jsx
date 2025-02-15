import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId(); // Correct usage of useId hook
    
    return (
        <div className='w-full'>
            {label && (
                <label className='inline-block mb-1 pl-1' htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                className={` rounded-xl focus:outline-none duration-200  w-full ${className}`}
                type={type}
                ref={ref}
                {...props}
                id={id} // Assigning the unique ID to the input element
            />
        </div>
    );
});

export default Input;
