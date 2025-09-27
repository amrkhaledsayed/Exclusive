import { useEffect } from 'react';

export const useFetchOnView = ({
  sectionRef,
  hasFetched,
  setHasFetched,
  fetchData,
}) => {
  useEffect(() => {
    if (!sectionRef?.current || hasFetched) return;

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFetched) {
            fetchData();
            setHasFetched(true);
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [sectionRef, fetchData, hasFetched, setHasFetched]);
};
