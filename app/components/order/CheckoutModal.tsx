import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, MapPin, CreditCard, CheckCircle, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { clearCart } from '../../store/cartSlice';
import { createOrder } from '../../lib/database';
import DeliveryForm from './DeliveryForm';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderType: 'delivery' | 'pickup';
}

type Step = 'address' | 'payment' | 'confirmation';

export default function CheckoutModal({ isOpen, onClose, orderType }: CheckoutModalProps) {
  const { user } = useAuth();
  const { items, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<Step>(orderType === 'delivery' ? 'address' : 'payment');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [deliveryQuote, setDeliveryQuote] = useState<{ amount: number; eta: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderError, setOrderError] = useState('');

  const deliveryFee = orderType === 'delivery' ? (deliveryQuote?.amount || 0) : 0;
  const finalTotal = total + deliveryFee;

  const handleAddressChange = (address: string, isValid: boolean) => {
    setDeliveryAddress(address);
    setIsAddressValid(isValid);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setOrderError('');

    try {
      const { order, error } = await createOrder({
        orderType,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal: total,
        deliveryFee,
        total: finalTotal,
        deliveryAddress: orderType === 'delivery' && deliveryAddress ? {
          street: deliveryAddress,
          postcode: '',
          city: '',
        } : undefined,
        estimatedDelivery: deliveryQuote?.eta,
      });

      if (error) {
        setOrderError(error.message);
        setIsProcessing(false);
        return;
      }

      if (order) {
        setOrderId(order.orderNumber);
        setOrderComplete(true);
        setStep('confirmation');
        dispatch(clearCart());
      }
    } catch (err) {
      setOrderError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (orderComplete) {
      // Reset state when closing after completion
      setStep(orderType === 'delivery' ? 'address' : 'payment');
      setOrderComplete(false);
      setOrderId('');
    }
    onClose();
  };

  const canProceedToPayment = orderType === 'pickup' || (orderType === 'delivery' && isAddressValid);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary-900 text-white p-6 relative shrink-0">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="font-display text-2xl font-bold">
                {step === 'confirmation' ? 'Order Confirmed!' : 'Checkout'}
              </h2>

              {/* Steps indicator */}
              {!orderComplete && (
                <div className="flex items-center gap-2 mt-4">
                  {orderType === 'delivery' && (
                    <>
                      <div className={`flex items-center gap-2 ${step === 'address' ? 'text-accent-400' : 'text-primary-300'}`}>
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">Address</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary-500" />
                    </>
                  )}
                  <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-accent-400' : 'text-primary-300'}`}>
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm font-medium">Payment</span>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {/* Delivery Address Step */}
                {step === 'address' && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-semibold text-lg text-primary-800 mb-4">Delivery Address</h3>
                    <DeliveryForm
                      onAddressChange={handleAddressChange}
                      onDeliveryQuote={setDeliveryQuote}
                    />
                  </motion.div>
                )}

                {/* Payment Step */}
                {step === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Order Summary */}
                    <div>
                      <h3 className="font-semibold text-lg text-primary-800 mb-3">Order Summary</h3>
                      <div className="bg-neutral-50 rounded-xl p-4 space-y-2">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-neutral-600">{item.quantity}x {item.name}</span>
                            <span className="font-medium">{(item.price * item.quantity).toFixed(2)}€</span>
                          </div>
                        ))}
                        <div className="border-t border-neutral-200 pt-2 mt-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-neutral-500">Subtotal</span>
                            <span>{total.toFixed(2)}€</span>
                          </div>
                          {orderType === 'delivery' && (
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-500">Delivery</span>
                              <span>{deliveryFee.toFixed(2)}€</span>
                            </div>
                          )}
                          <div className="flex justify-between font-bold text-lg mt-2">
                            <span className="text-primary-800">Total</span>
                            <span className="text-secondary-500">{finalTotal.toFixed(2)}€</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    {orderType === 'delivery' && deliveryAddress && (
                      <div>
                        <h3 className="font-semibold text-lg text-primary-800 mb-3">Delivery To</h3>
                        <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                          <Truck className="w-5 h-5 text-primary-500 mt-0.5" />
                          <div>
                            <p className="text-neutral-700">{deliveryAddress}</p>
                            {deliveryQuote && (
                              <p className="text-sm text-neutral-500 mt-1">ETA: {deliveryQuote.eta}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {orderType === 'pickup' && (
                      <div>
                        <h3 className="font-semibold text-lg text-primary-800 mb-3">Pickup Location</h3>
                        <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                          <MapPin className="w-5 h-5 text-primary-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-primary-800">Little Lemon Restaurant</p>
                            <p className="text-neutral-600 text-sm">2 Rue Jeanne d'Arc, 45000 Orléans</p>
                            <p className="text-sm text-neutral-500 mt-1">Ready in: 15-20 min</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payment Method (Demo) */}
                    <div>
                      <h3 className="font-semibold text-lg text-primary-800 mb-3">Payment Method</h3>
                      <div className="p-4 bg-accent-50 border border-accent-200 rounded-xl">
                        <p className="text-accent-800 text-sm">
                          This is a demo. In production, integrate with Stripe, PayPal, or another payment provider.
                        </p>
                      </div>
                    </div>

                    {/* Error Message */}
                    {orderError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <p className="text-red-700 text-sm">{orderError}</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Confirmation Step */}
                {step === 'confirmation' && (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-primary-900 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      Your order has been placed successfully.
                    </p>
                    <div className="bg-neutral-50 rounded-xl p-4 inline-block">
                      <p className="text-sm text-neutral-500">Order ID</p>
                      <p className="font-mono font-bold text-lg text-primary-700">{orderId}</p>
                    </div>
                    <p className="text-sm text-neutral-500 mt-6">
                      {orderType === 'delivery'
                        ? 'You will receive tracking updates via email.'
                        : 'Your order will be ready for pickup shortly.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!orderComplete && (
              <div className="p-6 border-t border-neutral-100 shrink-0">
                <div className="flex gap-3">
                  {step === 'payment' && orderType === 'delivery' && (
                    <motion.button
                      onClick={() => setStep('address')}
                      className="flex-1 py-3.5 border border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </motion.button>
                  )}

                  {step === 'address' && (
                    <motion.button
                      onClick={() => setStep('payment')}
                      disabled={!canProceedToPayment}
                      className="flex-1 py-3.5 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: canProceedToPayment ? 1.01 : 1 }}
                      whileTap={{ scale: canProceedToPayment ? 0.99 : 1 }}
                    >
                      Continue to Payment
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  )}

                  {step === 'payment' && (
                    <motion.button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 py-3.5 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      whileHover={{ scale: !isProcessing ? 1.01 : 1 }}
                      whileTap={{ scale: !isProcessing ? 0.99 : 1 }}
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          Place Order - {finalTotal.toFixed(2)}€
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            )}

            {orderComplete && (
              <div className="p-6 border-t border-neutral-100">
                <motion.button
                  onClick={handleClose}
                  className="w-full py-3.5 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Done
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
