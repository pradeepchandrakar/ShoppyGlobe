import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductList from "./components/ProductList";

const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./components/NotFound"));

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const App = () => {
  const location = useLocation();

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route 
              path="/product/:id" 
              element={
                <Suspense fallback={<LoadingScreen message="Loading Product..." />}>
                  <MotionWrapper>
                    <ProductDetailPage />
                  </MotionWrapper>
                </Suspense>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <Suspense fallback={<LoadingScreen message="Loading Cart..." />}>
                  <MotionWrapper>
                    <CartPage />
                  </MotionWrapper>
                </Suspense>
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Suspense fallback={<LoadingScreen message="Loading Checkout..." />}>
                  <MotionWrapper>
                    <Checkout />
                  </MotionWrapper>
                </Suspense>
              } 
            />
            <Route 
              path="*" 
              element={
                <Suspense fallback={<LoadingScreen message="Loading..." />}>
                  <MotionWrapper>
                    <NotFound />
                  </MotionWrapper>
                </Suspense>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

// Loading Component with dark mode styling
const LoadingScreen = ({ message }) => (
  <motion.div
    className="text-center text-lg text-gray-400 mt-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    🔄 {message}
  </motion.div>
);

// Wrapper for animated page transitions
const MotionWrapper = ({ children }) => (
  <motion.div
    variants={pageTransition}
    initial="initial"
    animate="animate"
    exit="exit"
    className="p-6 bg-[#1E1E2E] shadow-lg rounded-xl"
  >
    {children}
  </motion.div>
);

export default App;




