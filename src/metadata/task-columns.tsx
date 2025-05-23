import { ColumnDef, Table, } from "@tanstack/react-table";
import { MultiValue } from "react-select";
import { MultiSelect, Option } from "../components/multi-select/multi-select";
import { TableMeta } from "../components/table/table";
import { filterUsers, getUsers, Task, updateAssignees, User } from "../api/methods";

async function handleAssigneeUpdate(selection: MultiValue<Option>, rowData: Task, table: Table<Task>) {
  await updateAssignees({ taskId: rowData.id, userIds: selection.map(option => option.value) })
  const tableHelpers = table.options.meta as TableMeta<Task>
  tableHelpers && tableHelpers.updateData()

}

function mapUsersToOption(users: User[]) {
  if (users == undefined || users.length == 0) return []
  return users.map((user: User) => ({ value: user.id, label: user.first + ' ' + user.last }))

}

export function columns(initUsers: User[]): ColumnDef<Task>[] {
  return [
    {
      accessorKey: 'id',
      header: 'id',
      cell: ({ row, getValue }) => (
        <a
          href={`task/${getValue()} `}
        >
          {`details for ${getValue<string>()}`
          }
        </a >
      ),
    }, {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row, getValue }) => (
        <a
        >
          {getValue<string>()}
        </a>
      ),
    },

    {
      accessorKey: 'tags',
      header: 'Tags',
    },
    {
      accessorKey: 'progress',
      header: ' Progress',
    },
    {
      accessorFn: row => row.assignees,
      id: 'assignees',
      size: 400,
      cell: ({ cell, row, table }) => {
        return MultiSelect({
          initOptions: mapUsersToOption(initUsers),
          filterOptions: (inputString) => filterUsers(inputString, mapUsersToOption),
          changeHandler: (selection) => { handleAssigneeUpdate(selection, row.original, table) },
          selection: mapUsersToOption(cell.getValue() as User[]),
        })
      },
      header: () => <span>Assignees</span>,
    },
  ]
} 
