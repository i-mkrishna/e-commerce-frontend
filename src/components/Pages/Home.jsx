import React from 'react'
import Hero from '../Layout/Hero'
import GenderCollection from '../Products/GenderCollection'
import NewArrivals from '../Products/NewArrivals'
import ProductDetails from '../Products/ProductDetails'
import ProductGrid from '../Products/ProductGrid'
import FeaturedCollection from '../Products/FeaturedCollection'
import FeaturesSection from '../Products/FeaturesSection'


const placeholderProducts = [
    {
        _id: 1,
        name: "Product 1",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=1" }],
    },
    {
        _id: 2,
        name: "Product 2",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=2" }],
    },
    {
        _id: 3,
        name: "Product 3",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=3" }],
    },
    {
        _id: 4,
        name: "Product 4",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=4" }],
    },
    {
        _id: 5,
        name: "Product 5",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=5" }],
    },
    {
        _id: 6,
        name: "Product 6",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=6" }],
    },
    {
        _id: 7,
        name: "Product 7",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=7" }],
    },
    {
        _id: 8,
        name: "Product 8",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=8" }],
    },
];

const Home = () => {
    return (
        <div>
            <Hero />
            <GenderCollection />
            <NewArrivals />

            {/* Best Seller */}
            <h2 className='text-3xl text-center font-bold mb-4'>Best Sellers</h2>
            <ProductDetails />
            {/* Women section of may like */}
            <div className='container mx-auto '>
                <h2 className='text-3xl text-center font-bold mb-4'>Top Wears for Women</h2>
                <ProductGrid products={placeholderProducts} />
            </div>
            <FeaturedCollection />
            <FeaturesSection />
        </div>
    )
}

export default Home