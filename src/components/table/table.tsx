import React, { Fragment, ReactElement } from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  Row,
} from '@tanstack/react-table'
import { Task } from '../../api/methods'

export type TableMeta<TData> = { updateData: () => Promise<void> }
type TableProps<TData> = {
  data: TData[]
  columns: ColumnDef<TData>[]
  updateData: () => Promise<void>
}

export function Table({
  data,
  columns,
  updateData,
}: TableProps<Task>): ReactElement {
  const table = useReactTable<Task>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    meta: { updateData }
  })

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <Fragment key={row.id}>
                <tr>
                  {/* first row is a normal row */}
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>

              </Fragment>
            )
          })}
        </tbody>
      </table>
      <div className="h-2" />
    </div>
  )
}

