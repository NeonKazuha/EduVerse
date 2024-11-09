import React, { useState } from 'react';
import "./Product.css";
import { useAtom } from 'jotai';
import { ClothMenuAtom } from '../Utils/ClothMenuAtom';
import XrContainer2 from '../XR/XRContainer2';
import { item_id } from '../Utils/Itematom';
import clothItems from '../data/clothItems'; // Import the updated cloth items data

const Cloths = () => {
    const [selectedItem, setSelectedItem] = useAtom(item_id);
    const [showmenuAtom, setShowMenuAtom] = useAtom(ClothMenuAtom);
    const [xr, setXr] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const containerStyle = {
        visibility: showmenuAtom ? 'visible' : 'hidden',
    };

    // Get unique categories from cloth items
    const categories = [...new Set(clothItems.map(item => item.category))];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleProductClick = (product) => {
        setSelectedItem(product.id);
        setSelectedProduct(product);
        setXr(true);
    };

    const handleBackClick = () => {
        setSelectedCategory(null); // Reset the selected category
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter items based on search query
    const filteredItems = selectedCategory
        ? clothItems.filter(item =>
            item.category === selectedCategory &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : clothItems.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <>
            <div className='MainContainer' style={containerStyle}>
                <div className='left-portion overflow-auto gap-1 scrollbar-hidden'>
                    {/* Search Bar */}
                    <div className="w-3/5 ">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search items..."
                            className="glassmorphism-item px-2 py-1 w-full text-[15px] text-white bg-gray-800  
                             placeholder:text-black placeholder:text-[15px] border-[0px] rounded-none focus:outline-none focus:ring-0 focus:ring-gray-600"
                        />
                    </div>

                    {!selectedCategory ? (
                        // Show categories if no category is selected
                        categories.map(category => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className='glassmorphism-item w-3/5 h-auto flex justify-center border-[0px] items-center text-[20px] text-white py-2  rounded-none bg-gray-800 hover:bg-gray-400 transition-all duration-300'
                            >
                                {category}
                            </button>
                        ))
                    ) : (
                        <>
                            {/* Back button */}
                            <button
                                onClick={handleBackClick}
                                className='glassmorphism-item w-auto absolute top-0 left-0 h-auto flex justify-center  items-center text-[14px] text-black  px-2 py-1 m-2 rounded-none  hover:bg-gray-200 hover:text-gray-800 border-[0px] transition-all duration-300'
                            >
                                Back
                            </button>

                            {/* Show products of the selected category */}
                            {filteredItems.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => handleProductClick(item)}
                                    className='glassmorphism-item item-1 w-3/5 h-auto flex flex-row justify-between align-middle'
                                >
                                    <div className='flex-grow text-[12px]  border-[0px] text-slate-200 rounded-md w-1/2 px-2 p-2 h-auto flex border-none justify-between flex-col bg-gray-800 hover:scale-105 hover:shadow-md translate-all duration-300'>
                                        <p className='text-[18px]'>{item.name}</p>
                                        <p className='text-[12px]'>ETH: {item.price.ETH}</p>
                                        <p className='text-[12px]'>₹: {item.price.Rupees}</p>
                                        <p className='text-[12px]'>WMC: {item.price.WallmartCoins}</p>
                                        <p className='text-[12px]'>Rating: {item.ratings} / 5</p>
                                        <p className='text-[12px]'>Reviews: {item.reviews} reviews</p>
                                    </div>
                                    <div className='w-1/2 h-auto p-2'>
                                        <img
                                            className="w-[150px] h-[150px] object-cover rounded-md"
                                            src={item.image}
                                            alt={item.name}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* Pass the selected product information to XrContainer */}
                {xr && <XrContainer2 modelSrc={selectedProduct.modelSrc} productInfo={selectedProduct} />}
            </div>
        </>
    );
};

export default Cloths;
