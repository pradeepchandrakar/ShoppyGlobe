import { useState, useEffect, useRef } from "react";

const useFetchProducts = (url, retryCount = 3) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef({}); // Caching mechanism

  useEffect(() => {
    let isMounted = true; // Avoid setting state on unmounted components

    const fetchProducts = async (attempt = 1) => {
      if (cache.current[url]) {
        setProducts(cache.current[url]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch products (Attempt ${attempt})`);

        const data = await response.json();
        const productsData = data.products || data; // Handle different response structures

        if (isMounted) {
          setProducts(productsData);
          cache.current[url] = productsData; // Cache response
        }
      } catch (err) {
        console.error(err);
        if (attempt < retryCount) {
          fetchProducts(attempt + 1); // Retry fetching
        } else if (isMounted) {
          setError(`Failed to load products. Please try again.`);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false; // Cleanup function to avoid memory leaks
    };
  }, [url, retryCount]); // Refetch only if `url` or `retryCount` changes

  return { products, loading, error };
};

export default useFetchProducts;

