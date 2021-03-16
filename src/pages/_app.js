import '../styles/styles.css';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className='bg-gray-100'>
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;
