import React from 'react'
import Hero from '../Layout/Hero'
import GenderCollection from '../Products/GenderCollection'
import NewArrivals from '../Products/NewArrivals'
import ProductDetails from '../Products/ProductDetails'
import ProductGrid from '../Products/ProductGrid'
import FeaturedCollection from '../Products/FeaturedCollection'
import FeaturesSection from '../Products/FeaturesSection'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchProductsByFilters } from '../../redux/slices/productSlice'

const Home = () => {

    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [bestSellerProduct, setBestSellerProduct] = useState(null);

    useEffect(() => {
        // fetching the product  for collection
        dispatch(fetchProductsByFilters({ gender: "Women", category: "Bottom Wear", limit: 8 }))

        // Best seller product
        const fetchBestSeller = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/products/bestseller`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch best seller product");
                }
                const data = await response.json();
                setBestSellerProduct(data);
                console.log("best sellers", data);
                // console.log(products, bestSellerProduct);
            } catch (error) {
                console.error("Error fetching best seller product:", error);
            }
        }
        fetchBestSeller();
    }, [dispatch])


    return (
        <div>
            <Hero />
            <GenderCollection />
            <NewArrivals />

            {/* Best Seller */}
            <h2 className='text-3xl text-center font-bold mb-4'>Best Sellers</h2>
            {bestSellerProduct ? (
                <ProductDetails productId={bestSellerProduct._id} />
            ) : (
                <p className='text-center'>Loading best seller product...</p>
            )}
            {/* Women section of may like */}
            <div className='container mx-auto '>
                <h2 className='text-3xl text-center font-bold mb-4'>Top Wears for Women</h2>
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
            <FeaturedCollection />
            <FeaturesSection />
        </div>
    )
}

export default Home