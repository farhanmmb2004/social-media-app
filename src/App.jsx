import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MediaProvider } from './context/context';
import Header from './header';
import Menu from './menu';
import Home from './pages/Home';
import Videocam from './pages/Videocam';
import Favorite from './pages/Favorite';
import Account from './pages/Account';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);
  const [hideNavigation, setHideNavigation] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setHideHeader(true);
        setHideNavigation(true);
      } else {
        setHideHeader(false);
        setHideNavigation(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <MediaProvider>
      <Router>
        <div className={`head ${hideHeader ? 'hidden-head' : ''}`}>
          <Header hideNavigation={hideNavigation} mobile={isMobile}/>
        </div>
        <main>
          {!isMobile && <Menu />}
          <div className="temp_">
            <br />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/videocam" element={<Videocam />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
        </main>
      </Router>
    </MediaProvider>
  );
}

export default App;
