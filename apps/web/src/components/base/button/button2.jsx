import React from 'react'

const Button2 = ({ variant = '', text = 'Button', className, ...props }) => {
    if (variant === 'primary-red') {
        return (
            <button {...props} className={`p-[15px] bg-[#DB3022] rounded-full font-bold text-base leading-5 text-[#FFFFFF] ${className}`}>{text}</button>
        )
    } else if (variant === 'secondary-black') {
        return (
            <button {...props} className={`p-[15px] bg-white border border-[#222222] rounded-full font-bold text-base leading-5 text-[#222222] ${className}`}>{text}</button>
        )
    } else if (variant === 'secondary-gray') {
        return (
            // <button {...props} className={`p-[15px] bg-[#FBB017] rounded-full font-bold text-base leading-5 text-[#FFFFFF] ${className}`}>{text}</button>
            <button {...props} className={`p-[15px] bg-white border border-[#9b9b9b] rounded-full font-bold text-base leading-5 text-[#9b9b9b] ${className}`}>{text}</button>
        )
    } else {
        return (
            <button {...props} className={`p-[15px] bg-[#DB3022] rounded-full font-bold text-base leading-5 text-[#FFFFFF] ${className}`}>{text}</button>
        )
    }

}

export default Button2