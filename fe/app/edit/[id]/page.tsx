'use client'

import DataForm from '@/app/components/dataForm';
import { Button, Textarea } from '@nextui-org/react';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const id = params.id

  const [data, setData] = useState<string>('');
  const [loadData, setLoadData] = useState(true);

  useEffect(() => {
    if (!loadData)
      return;

    setLoadData(false)

    getData()
      .then(res => {
        setData(res.data)
      });

  })

  const getData = async () => {
    const response = await fetch(`http://localhost:3000/data/${id}`, {
      method: 'GET',
      // mode: 'no-cors',
    });
    // FUTURE: error handling
    return response.json();
  }

  const updateData = async (values) => {
    console.log(values)
    const response = await fetch(`http://localhost:3000/data/${id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });


    // FUTURE: error handling
    router.push('/')
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 dark">
      <h1>Edit Data: {id}</h1>
      <DataForm props={{ data, submitData: updateData }} />
    </main>
  );
};
