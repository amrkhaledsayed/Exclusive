import { useCallback, useState, useRef } from 'react';

// Cache عام خارج الـ component
const globalCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 دقائق

const useFetchData = ({ limit, skip = 0, category, allProduct, search }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const pendingRequests = useRef(new Map());

  const skipAll = (page - 1) * 15;

  const fetchData = useCallback(
    async (controllerParam) => {
      const controller = controllerParam || new AbortController();
      let url;

      if (category) url = `https://dummyjson.com/products/category/${category}`;
      else if (allProduct)
        url = `https://dummyjson.com/products?limit=16&skip=${skipAll}`;
      else if (search)
        url = `https://dummyjson.com/products/search?q=${search}`;
      else url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

      // ✅ تحقق من الـ cache
      const cached = globalCache.get(url);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        const newProducts = cached.data.products || [];
        if (category || search) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => {
            const filtered = newProducts.filter(
              (p) => !prev.some((prevP) => prevP.id === p.id)
            );
            return [...prev, ...filtered];
          });
        }
        setLoading(false);
        return;
      }

      // مسح cache منتهي
      if (cached) globalCache.delete(url);

      // ✅ تحقق من pending requests
      if (pendingRequests.current.has(url)) {
        return pendingRequests.current.get(url);
      }

      setLoading(true);

      const fetchPromise = (async () => {
        try {
          const response = await fetch(url, { signal: controller.signal });
          const data = await response.json();

          // ✅ حفظ في الـ cache
          globalCache.set(url, {
            data,
            timestamp: Date.now(),
          });

          const newProducts = data.products || [];
          if (category || search) {
            setProducts(newProducts);
          } else {
            setProducts((prev) => {
              const filtered = newProducts.filter(
                (p) => !prev.some((prevP) => prevP.id === p.id)
              );
              return [...prev, ...filtered];
            });
          }
        } catch (err) {
          if (err.name !== 'AbortError') setError(err.message);
        } finally {
          setLoading(false);
          pendingRequests.current.delete(url);
        }
      })();

      pendingRequests.current.set(url, fetchPromise);
      return fetchPromise;
    },
    [limit, category, allProduct, search, skipAll, skip]
  );

  return {
    products,
    fetchData,
    goToPage: (num) => setPage(num),
    skipAll,
    loading,
    error,
  };
};

export default useFetchData;
