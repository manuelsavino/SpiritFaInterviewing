import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const Index = () => {
  const { user, isLoading } = useUser();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState(null);

  useEffect(() => {
    fetch('/api/getResponses')
      .then((res) => res.json())
      .then((data) => setResponses(data.records[3].fields));

    fetch('/api/getQuestions')
      .then((res) => res.json())
      .then((data) => setQuestions(data.records));
  }, []);

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <>
      <Nav />

      <div className='container mx-auto mt-5'>
        <Head>
          <title>
            {responses ? responses.candidateName : 'Candidate Responses'}
          </title>
        </Head>

        {responses && questions.length && (
          <>
            <h1 className='text-4xl pt-5'>{responses.candidateName}</h1>
            <p>Interviewer: {responses.interviewer}</p>
            <p className='text-sm'>{new Date(responses.created).toString()}</p>

            {Object.keys(JSON.parse(responses.data)).map((e) => {
              return (
                <div>
                  {!e.includes('__notes') ? (
                    <p className='mt-5 font-semibold'>
                      {
                        questions.filter((q) => q.fields.name === e)[0].fields
                          .Question
                      }
                    </p>
                  ) : (
                    <p className='text-sm font-semibold text-gray-500'>
                      Comments
                    </p>
                  )}
                  <p className=''>{JSON.parse(responses.data)[e]}</p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Index;
