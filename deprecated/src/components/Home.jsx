// Import necessary components and libraries
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

/**
 * @function Home
 * @description This component is the home page of the website.
 * @returns Home component
 */
function Home() {
  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to handle closing the modal
  const handleOnClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Event listener for key presses
    const handleKeyPress = (event) => {
      // Open modal with CMD/WIN + K
      if (event.keyCode === 75 && event.metaKey) {
        if (showModal) {
          setShowModal(false);
        } else {
          setShowModal(true);
        }
      }
      // Close modal with ESC key
      if (event.keyCode === 27) {
        setShowModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showModal]);

  // Function to handle input click and open the modal
  const handleInputClick = () => {
    setShowModal(true);
  };

  return (
    <div className='scroll-smooth min-h-screen  dark:bg-customGray'>
      <Navbar />
      <div className="h-screen flex flex-col justify-center items-center mx-4">
        <div className='hidden lg:block'>
          <div className="w-16 h-16 blur rounded-full animate-blob transition delay-500 absolute top-36 bg-amber-500 left-56"></div>
          <div className="w-16 h-16 blur rounded-full animate-blob transition delay-500 absolute top-36 bg-white left-48"></div>
          <div className="w-16 h-16 blur rounded-full animate-blob transition delay-500 absolute bottom-28 bg-amber-500 right-28"></div>
          <div className="w-16 h-16 blur rounded-full animate-blob transition delay-500 absolute bottom-24 bg-white right-24"></div>
        </div>
        <div className="dark:text-white text-center lg:w-7/12 container">
          <h1 className='text-4xl lg:text-6xl mb-6 font-bold'>Unleash Your <span className='text-amber-500'>Project's Potential</span>, Rapidly Build Modern Applications without Leaving Your Development Zone! </h1>
          <h2 className='text-md lg:text-3xl text-gray-700 dark:text-gray-400 lg:mx-24'>Ignite Collaboration. Empower Projects. Shape Data-driven Designs. Build, Collaborate, and Innovate with DataStorehouse.</h2>
          <div className='lg:mt-12 mt-6'>
            <button className='mt-4 p-2.5 mr-4 rounded-lg text-xl bg-amber-500 shadow-lg'>
              <Link to='/datasets'>Getting started</Link>
            </button>
            <button className='mt-4 shadow-lg' onClick={handleInputClick}>
              <div className="relative w-80 drop-shadow lg:w-[24rem] ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <input type="text" className="bg-gray-50 ring-1 ring-amber-500 h-12 w-full border border-black-300 text-gray-900 text-lg rounded-lg focus:ring-amber-500 focus:border-amber-500 block  pl-10 p-2.5  dark:bg-gray-700 dark:border-amber-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-amber-500" placeholder="Quick Search..." disabled />
                <div className="absolute inset-y-0 right-3 flex dark:text-white/70 items-center pl-3 pointer-events-none">
                  &#8984; K
                </div>
              </div>
            </button>
          </div>
          
        </div>
      </div>
      <Footer />
      {showModal && <Searchbar onClose={handleOnClose} visible={showModal} />}
    </div>
  );
}

export default Home;
