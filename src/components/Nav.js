import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { Transition } from '@tailwindui/react';

export default function Nav() {
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!navRef.current.contains(e.target)) {
        if (!isOpen) return;
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => removeEventListener('click', handleOutsideClick);
  }, [isOpen, navRef]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsOpen(false);
    });
  }, []);

  return (
    <nav ref={navRef} className='bg-white shadow'>
      <div className='container mx-auto px-2 sm:px-4 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex px-2 lg:px-0'>
            <div className='flex-shrink-0 flex items-center'>
              <img
                className='block h-8 w-auto'
                src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                alt='Workflow'
              />
              <h2 className='font-bold pl-3 hidden lg:block'>
                FA Interviewing Platform
              </h2>
            </div>
            <div className='hidden lg:ml-6 lg:flex lg:space-x-8'></div>
          </div>

          <div className='flex items-center lg:hidden'>
            {/* Mobile menu button */}
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
              aria-controls='mobile-menu'
              aria-expanded='false'
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              <svg
                className='hidden h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          <div className='hidden lg:ml-4 lg:flex lg:items-center'>
            {/* Profile dropdown */}
            <div className='ml-4 relative flex-shrink-0'>
              <div>
                <button
                  type='button'
                  className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  id='user-menu'
                  aria-expanded='false'
                  aria-haspopup='true'
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  <span className='sr-only'>Open user menu</span>
                  <img
                    className='h-8 w-8 rounded-full'
                    src='https://pbs.twimg.com/profile_images/1278308352657895426/hHTSqaqU_400x400.jpg'
                    alt='Workflow'
                  />
                </button>
              </div>
              <Transition
                show={isOpen}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <div
                  className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='user-menu'
                >
                  <Link href='/api/auth/logout'>
                    <a
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      role='menuitem'
                    >
                      Sign out
                    </a>
                  </Link>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      <div className={isOpen ? 'block lg:hidden' : 'hidden'} id='mobile-menu'>
        <div className='pt-2 pb-3 space-y-1'>
          {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
        </div>
        <div className='pt-4 pb-3 border-t border-gray-200'>
          <div className='flex items-center px-4'>
            <div className='flex-shrink-0'>
              <img
                className='h-10 w-10 rounded-full'
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=yefzfDzqqe&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt='Workflow'
              />
            </div>
            <div className='ml-3'>
              <div className='text-base font-medium text-gray-800'>
                {!isLoading && user && user.nickname}
              </div>
              <div className='text-sm font-medium text-gray-500'>
                {!isLoading && user && user.email}
              </div>
            </div>
          </div>
          <div className='mt-3 space-y-1'>
            <Link href='/api/auth/logout'>
              <a className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'>
                Sign out
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
