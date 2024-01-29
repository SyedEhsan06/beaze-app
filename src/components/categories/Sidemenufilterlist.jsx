import React from 'react'

export default function Sidemenufilterlist({ subcategory, showCount, indexing, onShowMore, onShowLess }) {
    return (
        <div>
            {subcategory.slice(0, showCount).map((item, index) => (
                <div className='flex flex-col my-1' key={index}>
                    <div className='flex gap-x-4 items-center pb-2'>
                        <div className=' relative w-[15px] h-[15px]'>
                            <input type="checkbox" id={item.title + indexing} />
                        </div>
                        <label htmlFor={item.title + indexing} className=' text-lg cursor-pointer'>{item.title}</label>
                    </div>

                </div>
            ))}

            {showCount === 5 && subcategory.length >= 5 ? (
                <button onClick={onShowMore} className=' text-sm text-[#FFB61D] font-[500] underline' >View More</button>
            ) : showCount > 5 ? (
                <button onClick={onShowLess} className=' text-sm text-[#FFB61D] font-[500] underline' >View Less</button>
            ) : null}
        </div>
    )
}
