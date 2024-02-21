import React, { useEffect, useState } from 'react'
import Sidemenu from './Sidemenu'
import Contentcategories from './Contentcategories'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategories } from '@/redux/slices/categorySlice';

export default function Containercategories({params}) {
const dispatch = useDispatch();
const [categories, setCategories] = useState([]);
const categorySelect = useSelector(selectCategories);
useEffect(() => {
  if (!categorySelect) {
    dispatch(fetchCategories());
  }
  if(categorySelect){
    setCategories(categorySelect.categories)
  }
}
, [categorySelect,dispatch]);

  return (
    <div className='w-full flex '>
      <div className='lg:w-[22%] bg-white shadow hidden lg:block'>
        <Sidemenu
          categories={categories}
        />
      </div>
      <div className='lg:w-[78%] w-[100%] lg:pt-5 pt-2 pb-9 lg:px-8 px-4 bg-gray-50'>
        <Contentcategories params={params} categories={categories} />
      </div>
    </div>
  )
}
