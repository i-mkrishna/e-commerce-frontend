import { Link } from "react-router-dom";
import mensCollection from "../../assets/mens-collection.webp";
import womensCollection from "../../assets/womens-collection.webp";

const GenderCollection = () => {
    return (
        <section className="py-16 px-4 lg:px-0">
            <div className="container mx-auto flex flex-xol md:flex-row gap-8">
                {/* Womens collection */}
                <div className="relative flex-1">
                    <img src={womensCollection} alt="women-collection" className="w-full h-[700px] object-cover" />
                    <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Women's Collection</h2>
                        <Link to="/collections/all?gender=Women" className="text-gray-900 underline">Shop Now</Link>
                    </div>
                </div>
                {/* Men's Collection */}
                <div className="relative flex-1">
                    <img src={mensCollection} alt="men-collection" className="w-full h-[700px] object-cover" />
                    <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Men's Collection</h2>
                        <Link to="/collections/all?gender=Women" className="text-gray-900 underline">Shop Now</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GenderCollection