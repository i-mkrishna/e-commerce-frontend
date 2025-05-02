import { IoMdClose } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
    const navigate = useNavigate();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    const userId = user ? user._id : null;

    const handleCheckout = () => {
        toggleCartDrawer();
        navigate(user ? "/checkout" : "/login?redirect=checkout");
    };

    return (
        <div className={`fixed top-0 right-0 w-4/5 sm:w-2/3 md:w-[28rem] h-full bg-white shadow-xl transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
            {/* Header */}
            <div className='flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10'>
                <h2 className='text-lg sm:text-xl font-semibold'>Your Cart</h2>
                <button onClick={toggleCartDrawer} className='text-gray-500 hover:text-black'>
                    <IoMdClose className='h-6 w-6' />
                </button>
            </div>

            {/* Cart contents */}
            <div className='flex-grow p-4 overflow-y-auto'>
                {cart && cart?.products?.length > 0 ? (
                    <CartContents cart={cart} userId={userId} guestId={guestId} />
                ) : (
                    <div className='flex flex-col items-center justify-center h-full text-gray-500'>
                        <FaShoppingCart className='w-12 h-12 mb-3' />
                        <p className='text-center text-sm'>Your cart is empty</p>
                    </div>
                )}
            </div>

            {/* Checkout button */}
            {cart && cart?.products?.length > 0 && (
                <div className='p-4 border-t bg-white shadow-md sticky bottom-0'>
                    <button
                        onClick={handleCheckout}
                        className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'
                    >
                        Checkout
                    </button>
                    <p className='text-xs text-gray-500 mt-2 text-center'>Shipping, taxes, and discounts calculated at checkout.</p>
                </div>
            )}
        </div>
    );
};

export default CartDrawer;
