import { useCallback, useState } from 'react';

const useFetchData = ({ limit, skip = 0, category, allProduct, search }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

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

      setLoading(true);
      try {
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();
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
      }
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
