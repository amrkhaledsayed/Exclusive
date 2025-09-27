import { useEffect } from "react";
import { useState } from "react";

export const useFetchDetails = (productId) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`,
          { signal: controller.signal },
        );
        const data = await response.json();

        setProduct(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [productId]);
  return { product, error, loading };
};
