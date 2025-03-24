import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductList from "./components/ProductList";

const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./components/NotFound"));

const App = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route 
            path="/product/:id" 
            element={
              <Suspense fallback={<div className="text-center text-lg">Loading Product...</div>}>
                <ProductDetailPage />
              </Suspense>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <Suspense fallback={<div className="text-center text-lg">Loading Cart...</div>}>
                <CartPage />
              </Suspense>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <Suspense fallback={<div className="text-center text-lg">Loading Checkout...</div>}>
                <Checkout />
              </Suspense>
            } 
          />
          <Route 
            path="*" 
            element={
              <Suspense fallback={<div className="text-center text-lg">Loading...</div>}>
                <NotFound />
              </Suspense>
            } 
          />
        </Routes>
      </main>
    </>
  );
};

export default App;



