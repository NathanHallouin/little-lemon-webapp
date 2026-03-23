import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Truck, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getDeliveryQuote, isStuartConfigured } from '../../lib/stuart';
import { useAuth } from '../../providers/AuthProvider';

interface DeliveryFormProps {
  onAddressChange: (address: string, isValid: boolean) => void;
  onDeliveryQuote: (quote: { amount: number; eta: string } | null) => void;
}

export default function DeliveryForm({ onAddressChange, onDeliveryQuote }: DeliveryFormProps) {
  const { user } = useAuth();
  const [address, setAddress] = useState('');
  const [addressDetails, setAddressDetails] = useState({
    street: '',
    postcode: '',
    city: '',
    floor: '',
    instructions: '',
  });
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [quote, setQuote] = useState<{ amount: number; eta: string } | null>(null);
  const [error, setError] = useState('');

  const stuartEnabled = isStuartConfigured();

  // Build full address string
  useEffect(() => {
    const fullAddress = [
      addressDetails.street,
      addressDetails.postcode,
      addressDetails.city,
      'France'
    ].filter(Boolean).join(', ');
    setAddress(fullAddress);
  }, [addressDetails]);

  // Validate address and get quote when address changes
  useEffect(() => {
    const validateAndQuote = async () => {
      if (!addressDetails.street || !addressDetails.postcode || !addressDetails.city) {
        setIsValid(null);
        setQuote(null);
        onAddressChange('', false);
        onDeliveryQuote(null);
        return;
      }

      setIsValidating(true);
      setError('');

      try {
        if (stuartEnabled) {
          const deliveryQuote = await getDeliveryQuote(address);
          setQuote({ amount: deliveryQuote.amount, eta: deliveryQuote.eta });
          setIsValid(true);
          onAddressChange(address, true);
          onDeliveryQuote({ amount: deliveryQuote.amount, eta: deliveryQuote.eta });
        } else {
          // Demo mode - simulate validation
          await new Promise(resolve => setTimeout(resolve, 500));
          const mockQuote = { amount: 3.99, eta: '30-45 min' };
          setQuote(mockQuote);
          setIsValid(true);
          onAddressChange(address, true);
          onDeliveryQuote(mockQuote);
        }
      } catch (err) {
        setError('Unable to deliver to this address');
        setIsValid(false);
        setQuote(null);
        onAddressChange(address, false);
        onDeliveryQuote(null);
      } finally {
        setIsValidating(false);
      }
    };

    const debounce = setTimeout(validateAndQuote, 800);
    return () => clearTimeout(debounce);
  }, [address, stuartEnabled]);

  return (
    <div className="space-y-5">
      {/* Address Fields */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          Street Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={addressDetails.street}
            onChange={(e) => setAddressDetails(prev => ({ ...prev, street: e.target.value }))}
            className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="123 Main Street"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Postal Code
          </label>
          <input
            type="text"
            value={addressDetails.postcode}
            onChange={(e) => setAddressDetails(prev => ({ ...prev, postcode: e.target.value }))}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="45000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            City
          </label>
          <input
            type="text"
            value={addressDetails.city}
            onChange={(e) => setAddressDetails(prev => ({ ...prev, city: e.target.value }))}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Orléans"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Floor / Apt (optional)
          </label>
          <input
            type="text"
            value={addressDetails.floor}
            onChange={(e) => setAddressDetails(prev => ({ ...prev, floor: e.target.value }))}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="3rd floor, Apt 12"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            defaultValue={user?.phone || ''}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          Delivery Instructions (optional)
        </label>
        <textarea
          value={addressDetails.instructions}
          onChange={(e) => setAddressDetails(prev => ({ ...prev, instructions: e.target.value }))}
          rows={2}
          className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
          placeholder="Ring doorbell twice, leave at door..."
        />
      </div>

      {/* Validation Status */}
      <AnimatePresence mode="wait">
        {isValidating && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl"
          >
            <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
            <span className="text-neutral-600">Checking delivery availability...</span>
          </motion.div>
        )}

        {!isValidating && isValid && quote && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-green-50 border border-green-200 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-green-800">Delivery available!</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1.5 text-green-700">
                    <Truck className="w-4 h-4" />
                    <span>Delivery: {quote.amount.toFixed(2)}€</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-green-700">
                    <Clock className="w-4 h-4" />
                    <span>ETA: {quote.eta}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!isValidating && isValid === false && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-50 border border-red-200 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error || 'Address not in delivery zone'}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!stuartEnabled && (
        <p className="text-xs text-neutral-500 text-center">
          Demo mode - Stuart integration not configured
        </p>
      )}
    </div>
  );
}
