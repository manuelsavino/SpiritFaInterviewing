import Head from 'next/head';
import { useBeforeunload } from 'react-beforeunload';
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useState, useEffect, useRef } from 'react';
import Nav from '../components/Nav';
import Form from '../components/Form';

const Index = () => {
  const { user, isLoading } = useUser();

  const [questions, setQuestions] = useState([]);
  const [saved, setSaved] = useState({});

  useEffect(() => {
    setSaved(JSON.parse(localStorage.getItem('faLocalSave')));
    fetch('/api/getQuestions')
      .then((res) => res.json())
      .then((data) => setQuestions(data.records));
  }, []);

  useBeforeunload((event) => event.preventDefault());

  return (
    <>
      <Nav />
      <div className='container pt-5 mx-auto'>
        <Head>
          <title>NextJS Starter</title>
        </Head>

        {questions.length > 0 && <Form questions={questions} saved={saved} />}
      </div>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Index;
