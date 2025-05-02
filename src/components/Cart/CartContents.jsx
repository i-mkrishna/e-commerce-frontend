import React from 'react';
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice';

const CartContents = ({ cart, userId, guestId }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (productId, delta, quantity, size, color) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({
                productId,
                quantity: newQuantity,
                guestId,
                userId,
                size,
                color
            }));
        }
    };

    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(removeFromCart({ productId, guestId, userId, size, color }));
    };

    return (
        <div className="space-y-6">
            {cart.products.map((product, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between border-b pb-4 gap-4"
                >
                    {/* Image */}
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 rounded object-cover flex-shrink-0"
                    />

                    {/* Product Info */}
                    <div className="flex flex-col flex-grow">
                        <h3 className="text-base font-medium">{product.name}</h3>
                        <div className="text-sm text-gray-500 mt-1">
                            <p>size: <span className="font-medium text-gray-700">{product.size}</span></p>
                            <p>color: <span className="font-medium text-gray-700">{product.color}</span></p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center mt-3 space-x-2">
                            <button
                                onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)}
                                className="w-7 h-7 border rounded text-lg font-semibold flex items-center justify-center"
                            >
                                -
                            </button>
                            <span className="text-md font-medium">{product.quantity}</span>
                            <button
                                onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)}
                                className="w-7 h-7 border rounded text-lg font-semibold flex items-center justify-center"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex flex-col items-end">
                        <p className="font-semibold text-lg text-gray-800">${product.price}</p>
                        <button
                            onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}
                            className="mt-4 text-red-600 hover:text-red-800"
                        >
                            <RiDeleteBin3Line className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartContents;
