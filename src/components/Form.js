import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Form({ questions, saved }) {
  let saveInterval;
  const [showAlert, setShowAlert] = useState(null);
  useEffect(() => {
    saveInterval = setInterval(() => {
      localStorage.setItem('faLocalSave', JSON.stringify(getValues()));
    }, 10000);
  }, []);

  useEffect(() => {
    const savedWithValues = Object.keys(saved || {}).filter(
      (q) => saved[q] != null && saved[q] != ''
    );
    if (savedWithValues.length) {
      console.log('saved with val');
      setShowAlert(true);
    }
  }, []);

  const { register, handleSubmit, watch, errors, getValues, reset } = useForm({
    defaultValues: saved || {},
  });

  const proccessPipeline = (s) =>
    s
      .replace(/\*{1,2}(.*?)\*{1,2}/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code>$1</code>');

  const onSubmit = (data) => {
    clearInterval(saveInterval);
    console.log(data);
    // fetch('/api/recordResponses', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });

    localStorage.setItem(`faSave${Date.now()}`, JSON.stringify(getValues()));
    localStorage.removeItem('faLocalSave');
  };

  const resetForm = () => {
    localStorage.removeItem('faLocalSave');
    reset({});
    setShowAlert(false);
  };

  return (
    <>
      {saved && showAlert && (
        <div className='rounded-md bg-yellow-50 p-4 mb-5'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <svg
                className='h-5 w-5 text-yellow-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-yellow-800'>
                Oh No! Looks like you have unsubmitted responses!
              </h3>
              <div className='mt-2 text-sm text-yellow-700'>
                <p>
                  Click keep to continute with this candidate or Discard to
                  start the form fresh
                </p>
              </div>
              <div className='mt-4'>
                <div className='-mx-2 -my-1.5 flex'>
                  <button
                    onClick={() => setShowAlert(false)}
                    className='bg-yellow-50 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600'
                  >
                    Keep
                  </button>
                  <button
                    onClick={resetForm}
                    className='ml-3 bg-yellow-50 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600'
                  >
                    Discard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit((e) => onSubmit(e))}>
        <div className='flex border- border-gray-200 rounded-md mb-5 p-5 bg-white shadow-sm space-x-3'>
          <label htmlFor='candidateName'>
            Candidate Name
            <input
              className='border border-gray-300 rounded ml-3'
              type='text'
              ref={register}
              name='__candidateName'
            />
          </label>
          <label htmlFor='candidateName'>
            Interviewer(s)
            <input
              className='border border-gray-300 rounded ml-3'
              type='text'
              name='__interviewer'
              ref={register}
            />
          </label>
        </div>
        {questions.map((q) => (
          <div
            key={q.fields.id}
            className='flex border- border-gray-200 rounded-md mb-5 flex-col p-5 bg-white shadow-sm'
          >
            <p
              dangerouslySetInnerHTML={{
                __html: proccessPipeline(q.fields.Question),
              }}
            />
            {q.fields.questionType === 'cultureFit' && (
              <>
                <h2 className='mt-2 font-bold'>Positive Indicators</h2>
                <ul
                  className='escapeTailwinList'
                  dangerouslySetInnerHTML={{
                    __html: proccessPipeline(q.fields.positiveIndicators),
                  }}
                />
              </>
            )}
            {q.fields.questionType === 'competency' && (
              <div className='flex mt-5'>
                <div className=''>
                  <h3 className='bg-green-500 text-center'>
                    Meets Expecations
                  </h3>
                  <ul
                    className='escapeTailwinList mt-2 px-4'
                    dangerouslySetInnerHTML={{
                      __html: proccessPipeline(q.fields.competencyDoes),
                    }}
                  />
                </div>
                <div className=''>
                  <h3 className='bg-red-500 text-center'>
                    Does Not Meets Expecations
                  </h3>
                  <ul
                    className='escapeTailwinList mt-2 px-4'
                    dangerouslySetInnerHTML={{
                      __html: proccessPipeline(q.fields.competencyDoesNot),
                    }}
                  />
                </div>
              </div>
            )}
            <div className='flex space-x-4 my-2'>
              {q.fields.Options.map((option) => (
                <label
                  className={`${
                    option.includes('Not') || option.includes('No')
                      ? 'text-red-500'
                      : option.includes('Meets') || option.includes('Yes')
                      ? 'text-green-500'
                      : ''
                  }`}
                  key={`${q.fields.id}_${option}`}
                >
                  <input
                    type='radio'
                    name={q.fields.name}
                    value={option}
                    ref={register}
                    className='mr-2'
                  />
                  {option}
                </label>
              ))}
            </div>

            {q.fields.Notes && (
              <>
                <label>Notes</label>
                <textarea
                  className='border border-gray-300'
                  name={`${q.fields.name}__notes`}
                  ref={register}
                />
              </>
            )}
          </div>
        ))}
        <input
          className='bg-green-500 text-white px-3 py-2 rounded'
          type='submit'
        />
      </form>
    </>
  );
}
