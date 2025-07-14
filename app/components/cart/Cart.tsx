import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';

// Item typing to fix errors
interface CartItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

// SVGs inline
const CartIcon = (
  <svg className="text-[#495e57]" width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#495e57" d="M7 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7.16 16h9.68a2 2 0 0 0 1.97-1.68l1.38-7.44A1 1 0 0 0 19.2 6H6.21l-.2-1.09A2 2 0 0 0 4.05 3H2v2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 6 17a2 2 0 0 0 2 2h12v-2H8.42a.5.5 0 0 1-.49-.6l.03-.12z"/></svg>
);
const TrashIcon = (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#e53e3e" d="M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h5v2H4V4h5V3zm2 5v10h2V8h-2zm-4 0v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8H7z"/></svg>
);
const ArrowIcon = (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M13.293 17.293a1 1 0 0 1 1.414 0l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 1 1 1.414-1.414l5.707 5.707a1 1 0 0 1 0 1.414l-5.707 5.707a1 1 0 0 1-1.414-1.414z"/><path fill="#fff" d="M19 12a1 1 0 0 1-1 1H5a1 1 0 1 1 0-2h13a1 1 0 0 1 1 1z"/></svg>
);

/**
 * Cart component that displays cart items and handles cart operations
 * @returns Cart interface with item management and checkout functionality
 */
export default function Cart() {
  const { items, total } = useAppSelector((state: any) => state.cart);
  const dispatch = useAppDispatch();

  /**
   * Handles removing an item from the cart
   * @param id - The ID of the item to remove
   */
  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  /**
   * Handles updating the quantity of an item in the cart
   * @param id - The ID of the item to update
   * @param quantity - The new quantity value
   */
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="flex items-center text-lg font-bold mb-4 gap-2">
          <span className="text-xs">{CartIcon}</span> Cart
        </h2>
        <div className="text-center py-8">
          <p className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</p>
          <p className="text-base text-gray-500">Add some dishes to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="flex items-center text-lg font-bold mb-6 gap-2">
        <span className="text-xs">{CartIcon}</span> Cart
      </h2>
      <div className="space-y-4 mb-8">
        {items.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow transition-all duration-200 hover:shadow-xs hover:bg-gray-50"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded-lg border border-gray-100 shadow-sm mr-3"
            />
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="font-semibold text-base text-gray-900 truncate block">{item.name}</span>
              <div className="flex items-center space-x-1 mt-2">
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-base font-bold hover:bg-gray-300 transition-colors shadow-sm"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-sm font-medium text-gray-700 px-2">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-base font-bold hover:bg-gray-300 transition-colors shadow-sm"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="ml-4 text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50 text-xl flex items-center"
              aria-label="Remove item"
            >
              {TrashIcon}
            </button>
          </div>
        ))}
      </div>
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-lg font-bold text-[#495e57]">{total.toFixed(2)}€</span>
        </div>
        <button className="w-full flex items-center justify-center gap-3 bg-[#495e57] text-white py-2.5 px-4 rounded-lg text-base font-semibold shadow-md hover:bg-[#3d4f47] transition-colors">
          <span>Proceed to checkout</span>
          <span className="text-xl">{ArrowIcon}</span>
        </button>
      </div>
    </div>
  );
} 