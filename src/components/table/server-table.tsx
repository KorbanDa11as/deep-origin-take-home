
import React, { Fragment, ReactElement, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import { Table } from './table';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'
import { GenericDataEndpoint, Task } from '../../api/methods'
import { buttonClasses } from '@mui/material';
import { PaginationControl } from './pagination-control';

type TableProps<TData> = {
  fetchData: (page: number, pageSize: number) => Promise<GenericDataEndpoint<Task> | Error>
  columns: ColumnDef<TData>[]
}

export function ServerTable({
  fetchData,
  columns,
}: TableProps<Task>): ReactElement {
  const [pageData, setPageData] = useState<Task[]>([])
  const [page, setPage] = useState(0)
  const [error, setError] = useState<Error | null>(null)
  const [rowCount, setRowCount] = useState(0)

  async function fetchPageData() {
    const resp = await fetchData(page, 10)
    if (resp === null) {
      setError(new Error('failed to fetch'))
    }
    else {
      const { data, total } = resp as GenericDataEndpoint<Task>
      setPageData(data as Task[])
      // setRowCount(total)
    }
  }
  useEffect(() => {
    fetchPageData()
  }, [page])


  if (error) return <div>{error.message}</div>
  return <>
    <Table
      data={pageData} columns={columns} updateData={fetchPageData}></Table>
    <PaginationControl page={page} pageSize={10} totalRowCount={rowCount} setPage={setPage} />

  </>

}


