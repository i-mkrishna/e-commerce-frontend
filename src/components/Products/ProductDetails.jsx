import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchProductById, fetchSimilarProducts } from "../../redux/slices/productSlice";
import { addToCart} from "../../redux/slices/cartSlice"

const ProductDetails = ({ productId }) => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
    const { user, guestId } = useSelector((state) => state.auth);

    const productFetchId = productId || id;
    // console.log("id", id);

    const handleQuantityChange = (action) => {
        if (action === "plus") setQuantity((prev) => prev + 1);
        if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    };

    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductById(productFetchId));
            dispatch(fetchSimilarProducts({ id: productFetchId }));
        }

    }, [dispatch, productFetchId]);

    

    useEffect(() => {
        if (selectedProduct?.images) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, [productFetchId]);
    console.log(selectedProduct);

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            toast.error("Please select a size and color before adding to cart.", { duration: 1000, });
            return;
        }
        setIsButtonDisabled(true);

        dispatch(addToCart({
            productId: productFetchId,
            quantity,
            size: selectedSize,
            color: selectedColor,
            guestId: guestId,
            userId: user?._id,
        })
        ).then(() => {
            toast.success("Product added to cart successfully!", { duration: 1000, });
        }).finally(() => {
            setIsButtonDisabled(false);
        }
        )
    };
    if (loading) {
        return <p>loading....</p>
    }

    if (error) {
        return <p className="text-red-500">Error : {error}</p>
    }
    // console.log("similar products", similarProducts);

    return (
        <div className='p-6'>
            {selectedProduct && (
                <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                    <div className='flex flex-col md:flex-row'>
                        {/* Left Thumbnails */}
                        <div className='hidden md:flex flex-col space-y-4 mr-6'>
                            {selectedProduct.images.map((image, index) => (
                                <img key={index} src={image.url} alt={image.altText || `Thumbnail ${index}`}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                                    onClick={() => setMainImage(image.url)}
                                />
                            ))}
                        </div>
                        {/* Main Images */}
                        <div className="md:w-1/2">
                            <div className="mb-4">
                                <img src={mainImage} alt="Main Product" className="w-full h-auto object-cover rounded-lg" />
                            </div>
                        </div>
                        {/* Mobile Thumbnail */}
                        <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
                            {selectedProduct.images.map((image, index) => (
                                <img key={index} src={image.url} alt={image.altText || `Thumbnail ${index}`}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                                    onClick={() => setMainImage(image.url)}
                                />
                            ))}
                        </div>
                        {/* Right  Side */}
                        <div className="md:w-1/2 md:ml-10">
                            <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>
                            <p className="text-lg text-gray-600 mb-1 line-through">{selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}</p>
                            <p className="text-xl text-gray-500 mb-2">${selectedProduct.price}</p>
                            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                            <div className="mb-4">
                                <p className="text-gray-700">Colors:</p>
                                <div className="flex-gap-2 mt-2">
                                    {selectedProduct.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-full border ${selectedColor === color ? "border-4 border-black" : "border-gray-300"}`}
                                            style={{ backgroundColor: color.toLowerCase(), filter: "brightness(0.5)" }}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                            {/* Sizes */}
                            <div className="mb-4">
                                <p className="flex gap-2 mt-2">
                                    {selectedProduct.sizes.map((size) => (
                                        <button key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 rounded border ${selectedSize === size ? "bg-black text-white" : ""}`}
                                        >{size}</button>
                                    ))}
                                </p>
                            </div>
                            <div className="mb-6">
                                <p className="text-gray-700">Quantity:</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <button className="px-2 py-1 bg-gray-200 rounded text-lg"
                                        onClick={() => handleQuantityChange("minus")}
                                    >-</button>
                                    <span className="text-lg">{quantity}</span>
                                    <button className="px-2 py-1 bg-gray-200 rounded text-lg"
                                        onClick={() => handleQuantityChange("plus")}
                                    >+</button>
                                </div>
                            </div>
                            <button onClick={handleAddToCart}
                                disabled={isButtonDisabled}
                                className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? "cursor-not-allowed opacity-500" : "hover:bg-gray-900"}`}>{isButtonDisabled ? "Adding..." : "ADD TO CART"}</button>

                            <div className="mt-10 text-gray-700">
                                <h3 className="text-xl font-bold mb-4">Charactersitics:</h3>
                                <table className="w-full text-left text-sm text-gray-700">
                                    <tbody>
                                        <tr>
                                            <td className="py-1">Brand</td>
                                            <td className="py-1">{selectedProduct.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Material</td>
                                            <td className="py-1">{selectedProduct.material}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* YOu may like  */}
                    <div className="mt-20">
                        <h2 className="text-2xl text-center font-medium mb-4">
                            YOu May Also Like
                        </h2>
                        <ProductGrid products={similarProducts} loading={loading} error={error}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetails