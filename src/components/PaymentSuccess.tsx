import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 dark:from-green-900 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Payment Successful!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Thank you for your purchase. Your order has been processed successfully.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;