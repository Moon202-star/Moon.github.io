import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import PackageCard from './components/PackageCard';
import Footer from './components/Footer';
import PaymentForm from './components/PaymentForm';
import PaymentSuccess from './components/PaymentSuccess';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-800 dark:bg-white text-white dark:text-gray-800 shadow-lg"
    >
      {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
    </button>
  );
}

function App() {
  const packages = [
    {
      name: "Moon Premium",
      price: 24.99,
      features: ["Custom Cape", "Priority Support", "All Premium Modules", "Name Tag Color"],
      popular: true
    },
    {
      name: "Moon Lite",
      price: 14.99,
      features: ["Basic Modules", "Standard Support", "Basic Customization"],
      popular: false
    },
    {
      name: "Moon Ultimate",
      price: 39.99,
      features: ["All Features", "VIP Support", "Exclusive Updates", "Custom Modules"],
      popular: false
    }
  ];

  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <Routes>
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/" element={
              <>
                <Navbar />
                <div className="relative overflow-hidden">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                      <Moon className="h-16 w-16 mx-auto mb-8 text-blue-500" />
                      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Moon Client
                      </h1>
                      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        Elevate your Minecraft experience with the most advanced client
                      </p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                        Download Now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="py-20">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Choose Your Package</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {packages.map((pkg) => (
                        <PackageCard key={pkg.name} {...pkg} />
                      ))}
                    </div>
                  </div>
                </div>
                <Footer />
              </>
            } />
          </Routes>
          <ThemeToggle />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;