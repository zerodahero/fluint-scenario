'use client'

import DataForm from '@/app/components/dataForm';
import { Button, Textarea } from '@nextui-org/react';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default () => {
  const router = useRouter()

  const createData = async (values) => {
    const response = await fetch(`http://localhost:3000/data`, {
      method: 'POST',
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
      <h1>Create New Data</h1>
      <DataForm props={{ data: '', submitData: createData }} />
    </main>
  );
};
