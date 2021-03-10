import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Index = () => {
  const { user, isLoading } = useUser();

  return (
    <div className='container mx-auto mt-5'>
      <Head>
        <title>NextJS Starter</title>
      </Head>
      {!isLoading && user && (
        <Link
          className='py-2 px-4 text-white rounded bg-red-500'
          href='/api/auth/logout'
        >
          <a className='py-2 px-4 text-white rounded bg-red-500'>Logout</a>
        </Link>
      )}
      {!isLoading && !user && (
        <Link
          className='py-2 px-4 text-white rounded bg-blue-500'
          href='/api/auth/login'
        >
          Login
        </Link>
      )}
      <h1 className='text-7xl pt-5'>Hello</h1>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Index;
