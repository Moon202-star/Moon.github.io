import React, { useState } from 'react';
import { CreditCard, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { luhnCheck } from '../utils/cardValidation';
import { sendPaymentWebhook } from '../services/webhook';
import { motion } from 'framer-motion';

function PaymentForm() {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!luhnCheck(cardNumber)) {
      setError('Invalid card number');
      return;
    }

    setLoading(true);
    try {
      const response = await sendPaymentWebhook({
        cardNumber,
        expiryDate,
        cvv,
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
      navigate('/payment-success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'API Error: Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md"
      >
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center mb-8"
        >
          <CreditCard className="h-12 w-12 text-blue-500" />
        </motion.div>
        <h2 className="text-2xl font-bold text-center mb-8 dark:text-white">Payment Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="1234 5678 9012 3456"
              maxLength={16}
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 4) {
                    const formatted = value.replace(/(\d{2})(\d{2})/, '$1/$2');
                    setExpiryDate(formatted);
                  }
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="MM/YY"
                maxLength={5}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                CVV
              </label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="123"
                maxLength={3}
              />
            </motion.div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/30 p-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default PaymentForm;