import React, { useState } from 'react';

export default function Sidemenufilterlist({ refresh,category, subcategory, showCount, indexing, onShowMore, onShowLess, onSubcategorySelect }) {
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    console.log('selectedSubcategories', refresh);
    const handleSubcategorySelect = (subcategoryId) => {
        const isSelected = selectedSubcategories.includes(subcategoryId);
        if (isSelected) {
            setSelectedSubcategories(selectedSubcategories.filter(id => id !== subcategoryId));
        } else {
            setSelectedSubcategories([...selectedSubcategories, subcategoryId]);
        }
        onSubcategorySelect(category, subcategoryId);
    };
    
    return (
        <div>
        
            <div className='flex flex-col my-1'>
                <div className='flex gap-x-4 items-center pb-2'>
                    <div className=' relative w-[15px] h-[15px]'>
                        <input type="checkbox" id={`all_${indexing}`} />
                    </div>
                    <label htmlFor={`all_${indexing}`} className=' text-lg cursor-pointer'>All Items</label>
                </div>
            </div>
          
            {subcategory?.slice(0, showCount).map((item, index) => (
                <div className='flex flex-col my-1' key={index}>
                    <div className='flex gap-x-4 items-center pb-2'>
                        <div className=' relative w-[15px] h-[15px]'>
                            <input 
                                type="checkbox" 
                                id={item.name + indexing} 
                                onChange={() => handleSubcategorySelect(item._id)} 
                            />
                        </div>
                        <label htmlFor={item.name + indexing} className=' text-lg cursor-pointer'>{item.name}</label>
                    </div>
                </div>
            ))}

            {showCount === 5 && subcategory.length >= 5 ? (
                <button onClick={onShowMore} className=' text-sm text-[#FFB61D] font-[500] underline' >View More</button>
            ) : showCount > 5 ? (
                <button onClick={onShowLess} className=' text-sm text-[#FFB61D] font-[500] underline' >View Less</button>
            ) : null}
        </div>
    );
}
