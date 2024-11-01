"use client";

import { useEffect, useState } from "react"
import { Formik } from 'formik';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Link, Button } from "@nextui-org/react";

export default () => {

  const revalidatedData = async () => {
    const result = await fetch('http://localhost:3000/data', {
      method: 'GET',
      // mode: 'no-cors',
    });

    console.log(result);

    return result.json();
  }

  const [state, setState] = useState<{ id: number, data: string, created: string, updated: string }[] | {}>();
  const [loadData, setLoadData] = useState(true);

  useEffect(() => {
    if (!loadData)
      return;

    setLoadData(false)

    revalidatedData()
      .then(res => {
        setState(res)
      })
  })


  const deleteRecord = async (id: string) => {
    const result = await fetch(`http://localhost:3000/data/${id}`, {
      method: 'DELETE',
      // mode: 'no-cors',
    });

    revalidatedData()
      .then(res => {
        setState(res)
      })
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 dark">
      <h1 className="mb-4 text-lg">Data</h1>

      <div className="flex w-full justify-end mb-4">
        <Button>
          <Link href="/create">Create New</Link>
        </Button>
      </div>

      <Table aria-label="Data Table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Data</TableColumn>
          <TableColumn>Created</TableColumn>
          <TableColumn>Updated</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {state && state.map(row => (
            <TableRow key={row._id}>
              <TableCell>{row._id}</TableCell>
              <TableCell>{row.data}</TableCell>
              <TableCell>{row.created}</TableCell>
              <TableCell>{row.updatedAt}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip color="default" content="Edit data">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <Link href={`/edit/${row._id}`}>Edit</Link>
                      { /* <EditIcon /> */}
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete data">
                    { /* FUTURE: modal for confirmation */}
                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => deleteRecord(row._id)}>
                      Delete
                      { /* <DeleteIcon /> */}
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
