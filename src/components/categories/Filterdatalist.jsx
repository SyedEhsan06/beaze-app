import React from 'react';
export default function Filterdatalist({ Ftitle, onFilterSelection, subcategory, showCount, indexing, onShowMore, onShowLess }) {
    const [selectedFilters, setSelectedFilters] = React.useState([]);

    const handleCheckboxChange = (Ftitle, title) => {
        const isSelected = selectedFilters.includes(title);
        const updatedSelectedFilters = isSelected
          ? selectedFilters.filter((filter) => filter !== title)
          : [...selectedFilters, title];
        setSelectedFilters(updatedSelectedFilters);
        console.log(updatedSelectedFilters);
    };
    return (
        <div>
            {subcategory.slice(0, showCount).map((item, index) => (
                <div className='flex flex-col my-1' key={index}>
                    <div className='flex gap-x-4 items-center pb-2'>
                        <div className='relative w-[15px] h-[15px]'>
                            <input
                                type="checkbox"
                                id={item.title + indexing}
                                checked={selectedFilters.includes(item.title)}
                                onChange={() => handleCheckboxChange(Ftitle, item.title)}
                            />
                        </div>
                        <label htmlFor={item.title + indexing} className='text-lg cursor-pointer'>{item.title}</label>
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
