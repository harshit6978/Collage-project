import React, { useEffect, useState } from 'react';
import { useFoodContext } from '../../context/foodContext';
import axios from "axios";
import { FaHeart, FaStar, FaRupeeSign } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useCartContext } from '../../context/cartContext';
// import { FaIndustry } from "react-icons/fa";

const Menu = () => {
  const { Food, setFood } = useFoodContext();
  const [active, setActive] = useState({});
  const [value, setValue] = useState({
    id: 0,
    name: 'All',
    value: 'all'
  });

  const category = [
    {
      id: 0,
      name: 'All',
      value: 'all'
    },
    {
      id: 1,
      name: 'Frappuccino',
      value: 'Frappuccino'
    },
    {
      id: 2,
      name: 'Desert',
      value: 'Desert'
    },
    {
      id: 3,
      name: 'Late',
      value: 'Late'
    },
    {
      id: 4,
      name: 'Tonic Base',
      value: 'Tonic Base'
    },
    {
      id: 5,
      name: 'Shakes',
      value: 'Shakes'
    },
    {
      id: 6,
      name: 'Mojito',
      value: 'Mojito'
    },
    {
      id: 7,
      name: 'Hot Chocolate',
      value: 'Hot Chocolate'
    },
    {
      id: 8,
      name: 'Juice',
      value: 'Juice'
    },
  ];

  console.log(Food, "fooddddd");
  const handleBtn = (btn) => {
    setActive(btn.id);
    setValue(btn.value);
  }

  const params = useParams()
  const getFoods = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/food/getAllFoods?category=${value}`);
      if (res.data.success) {
        setFood(res.data.data.food);
      }
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getFoods()
  }, [value])
  console.log(Food, "khg");

  const { addToCart } = useCartContext()



  return (
    <div className='pt-[16vh]'>
      <div className='container mx-auto py-8'>
        <div className='p-5 mb-14'>
          <div className='flex flex-wrap justify-center mb-8 gap-5'>
            {category.map(btn => (
              <button key={btn.id} className={active === btn.id ? "text-xl px-4 py-3 text-center text-white bg-red-500 border-red-500 border-2 rounded-sm justify-center font-medium" : "text-xl px-4 py-3 text-red-500 border-red-500 border-2 rounded-sm"} onClick=
                {() => { handleBtn(btn) }}>
                {btn.name}
              </button>
            ))}
          </div>

          <div className='grid gap-8 py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
            {Food?.map((curElem) => (
              <div className='food-card flex bg-red-500/10 rounded-xl flex-col cursor-pointer items-center p-5'>
                <div className='relative mb-3'>
                  <Link to={`/menu/${curElem?._id}`}>
                    <img src={curElem?.foodImage} />
                  </Link>
                  <div className='absolute top-2 left-2'>
                    <button className='shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-5 rounded-full relative' >
                      <FaHeart className='absolute text-xl top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2' />
                    </button>
                  </div>

                  <div className='absolute bottom-2 right-2'>
                    <button className='shadow-sm bottom-4 border-white text-white bg-[#fdc55e] cursor-pointer p-3 h-16 w-16 text-xl font-bold rounded-full relative'>
                      <div className='absolute flex text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <FaRupeeSign className='mt-1' />{curElem.price}
                      </div>
                    </button>
                  </div>
                </div>

                {/* rating part  */}
                <div className='flex gap-4 items-center'>
                  <p className='text-xl text-center font-bold text-[#f54748]'>{curElem.name}</p>
                  <div className='flex text-sm space-x-2 cursor-pointer'>
                    {/* <span className='font-normal text-[#fdc55e]'>4.3</span> */}
                    {/* <FaStar size={16} className='text-[#fdc55e]' /> */}
                    <span className='font-medium'>({curElem.qty})</span>
                  </div>
                </div>
                <button className={curElem.qty === 0 ? 'bg-gray-400 cursor-not-allowed transition duration-150 transform shadow-md rounded-full px-8 py-2 text-xl font-medium text-white' : 'bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white'} onClick={() => addToCart(curElem)} disabled={curElem.qty === 0}>
                  {curElem.qty === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            ))

            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

