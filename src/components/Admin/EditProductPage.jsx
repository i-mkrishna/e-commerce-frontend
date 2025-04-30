import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProductById } from "../../redux/slices/productSlice";
import { updateProduct } from "../../redux/slices/adminProductSlice";

const EditProductPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { selectedProduct, loading, error } = useSelector((state) => state.products);

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collection: "",
        material: "",
        gender: "",
        images: [],
    });
    const [imageFiles, setImageFiles] = useState([]);


    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }


    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProduct) {
            setProductData(selectedProduct);
        }

    }, [selectedProduct])

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(files);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/upload`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, data.imageUrl],
            }));
        } catch (error) {
            console.error("Image upload failed:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
      
        try {
          const uploadedImageObjects = [];
      
          for (const file of imageFiles) {
            const formData = new FormData();
            formData.append("image", file);
      
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/upload`, {
              method: "POST",
              body: formData,
            });
      
            if (!response.ok) {
              throw new Error("Image upload failed");
            }
      
            const data = await response.json();
            uploadedImageObjects.push({ url: data.imageUrl, altText: "" }); // You can add altText later if needed
          }
      
          const finalProductData = {
            ...productData,
            images: [...productData.images, ...uploadedImageObjects], // Merge new images with existing ones
          };
      
          console.log("Final product data:", finalProductData);
      
          await dispatch(updateProduct({ id, productData: finalProductData })).unwrap();
          navigate("/admin/products");
        } catch (err) {
          console.error("Product update failed:", err);
          alert(err.message || "Failed to update product");
        } finally {
          setUploading(false);
        }
      };
      


    if (loading) return <p>loading...</p>
    if (error) return <p>Error : {error}</p>

    return (
        <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
            <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Product Name</label>
                    <input type="text" name="name" value={productData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" required />
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        rows={4}
                        required
                    />

                </div>
                {/* price */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Price</label>
                    <input type="number" name="price" value={productData.price} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                {/* SKU */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">SKU</label>
                    <input type="text" name="sku" value={productData.sku} disabled className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                {/* Sizes */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Sizes (comma-separated)</label>
                    <input
                        type="text"
                        name="sizes"
                        value={productData.sizes.join(",")}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                sizes: e.target.value.split(",").map((size) => size.trim()),
                            })
                        }
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                {/* Colors */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Colors (comma-separated)</label>
                    <input
                        type="text"
                        name="colors"
                        value={productData.colors.join(",")}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                colors: e.target.value.split(",").map((color) => color.trim()),
                            })
                        }
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Upload Image</label>
                    <input type="file" multiple onChange={handleImageChange} />
                    <div className="flex gap-4 mt-4">
                        {productData.images.map((image, index) => {
                            const imageUrl = typeof image === "string" ? image : image?.url;
                            return (
                                <div key={imageUrl || index}>
                                    <img
                                        src={imageUrl}
                                        alt={image?.altText || "Product Image"}
                                        className="w-20 h-20 object-cover rounded-md shadow-md"
                                    />
                                </div>
                            );
                        })}

                    </div>
                </div>
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">Update Product</button>
            </form>
        </div>
    )
}

export default EditProductPage