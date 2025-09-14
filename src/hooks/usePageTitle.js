import { useEffect } from 'react';

export const usePageTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Laundry Hamper`;
    
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};