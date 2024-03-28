"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCategory, toggleColor, toggleSize, toggleMaterial, toggleSleeve, toggleSubcategory, selectColor, selectSize, selectSleeve, selectMaterial } from '@/redux/slices/filterSlice';

export default function Filterdatalist({ Ftitle, onFilterSelection, subcategory, showCount, indexing, onShowMore, onShowLess }) {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const dispatch = useDispatch();
    const selectedColor = useSelector(selectColor);
    const selectedSize = useSelector(selectSize);
    const selectedMaterial = useSelector(selectMaterial);
    const selectedSleeve = useSelector(selectSleeve);

    useEffect(() => {
    }, [selectedFilters]);

    const handleCheckboxChange = (item) => {
        let updatedFilters = [...selectedFilters];

        // Toggle the filter based on its type
        if (updatedFilters.includes(item)) {
            updatedFilters = updatedFilters.filter((filter) => filter !== item);
        } else {
            updatedFilters.push(item);
        }

        setSelectedFilters(updatedFilters);
        dispatchFilterAction(item); 
    }
    const dispatchFilterAction = (item) => {
        switch (Ftitle) {
            case 'Colors':
                dispatch(toggleColor(item));
                break;
            case 'Sizes':
                dispatch(toggleSize(item));
                break;
            case 'Material':
                dispatch(toggleMaterial(item));
                break;
            case 'sleeve':
                dispatch(toggleSleeve(item));
                break;
            default:
                null;
        }
    };

    return (
        <div>
            {subcategory.slice(0, showCount).map((item, index) => (
                <div className='flex flex-col my-1' key={index}>
                    <div className='flex gap-x-4 items-center pb-2'>
                        <div className='relative w-[15px] h-[15px]'>
                            <input
                                type="checkbox"
                                id={item + indexing}
                                name={item + indexing}
                                checked={selectedColor.includes(item) || selectedSize.includes(item) || selectedMaterial.includes(item) || selectedSleeve.includes(item)}
                                onClick={() => handleCheckboxChange(item)}
                            />
                        </div>
                        <label htmlFor={item + indexing} className='text-lg cursor-pointer'>{item}</label>
                    </div>
                </div>
            ))}

            {showCount === 5 && subcategory.length >= 5 ? (
                <button onClick={onShowMore} className='text-sm text-[#FFB61D] font-[500] underline'>View More</button>
            ) : showCount > 5 ? (
                <button onClick={onShowLess} className='text-sm text-[#FFB61D] font-[500] underline'>View Less</button>
            ) : null}
        </div>
    );
}
