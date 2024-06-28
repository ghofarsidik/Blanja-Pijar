import React from 'react'

export const Recommendation = ({title, desc, children}) => {
  return (
    <div className="mx-[10%] mt-[50px]">
        <p className="text-[34px] font-bold font-blanja_metropolis h-[40px]">{title}</p>
        <p className="text-xs font-blanja_metropolis mt-[4px]">{desc}</p>
        <div className="grid grid-cols-1 lg:grid-cols-5 place-items-center gap-y-[25px] mt-[25px]">
        {children}
        </div>
      </div>
  )
}
