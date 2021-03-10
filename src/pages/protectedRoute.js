import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default function protectedRoute() {
  const { user, isLoading } = useUser();

  return (
    <div className='container mx-auto mt-5'>
      <Head>
        <title>NextJS Starter</title>
      </Head>
      {!isLoading && user && <Link href='/api/auth/logout'>Logout</Link>}
      <h1 className='text-7xl pt-5 text-blue-500'>Protected Route</h1>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
