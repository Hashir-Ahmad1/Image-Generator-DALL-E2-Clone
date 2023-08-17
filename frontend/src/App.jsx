// App.jsx
import React from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost } from './pages/Index';

const App = () => {
  return (
    <BrowserRouter>
      {/* Header */}
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to='/'>
          <img src={logo} alt="logo" className='object-contain w-28'/>
        </Link>
        <Link to='/create-post' className='font-inter font-medium bg-blue-500 text-white px-4 py-2 rounded-md'>
          Create
        </Link>
      </header>

      {/* Main Content */}
      <main className='sm:px-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-post' element={<CreatePost/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
