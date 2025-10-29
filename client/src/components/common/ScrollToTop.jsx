import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component's job is to scroll the window to the top on every route change.
const ScrollToTop = () => {
  // Extracts the pathname from the current URL (e.g., "/courses", "/courses/123")
  const { pathname } = useLocation();

  // This useEffect hook will run every time the pathname changes.
  useEffect(() => {
    // Scrolls the window to the top left corner (coordinates 0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // The dependency array ensures this effect only runs when the URL path changes

  // This component does not render any visible UI, it only performs an action.
  return null;
};

export default ScrollToTop;
