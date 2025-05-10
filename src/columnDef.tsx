import { ColumnDef, Table, } from "@tanstack/react-table";
import { MultiValue } from "react-select";
import { AutoComplete, Option } from "./components/autocomplete/multi-select-controlled";
import { TableMeta } from "./components/table/table";
import { getUsers, Task, updateAssignees, User } from "./api/methods";
const promiseOptions = async (inputValue: string) => {
  try {
    const users = await getUsers()
    console.log(users)
    if (!users?.length) throw new Error('no users')
    return users.map(user => ({ label: user.first + ' ' + user.last, value: user.id })) as Option[]
  }
  catch (e) {
    console.log(e)
    return []
  }
}
async function handleAssigneeUpdate(selection: MultiValue<Option>, rowData: Task, table: Table<Task>) {
  console.log(selection, rowData)
  await updateAssignees({ taskId: rowData.id, userIds: selection.map(option => option.value) })
  const tableHelpers = table.options.meta as TableMeta<Task>
  tableHelpers && tableHelpers.updateData()

}

function mapUsersToOption(users: User[]) {
  if (users == undefined || users.length == 0) return []
  return users.map((user: User) => ({ value: user.id, label: user.first + ' ' + user.last }))

}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row, getValue }) => (
      <a
      >
        {getValue<string>()}
      </a>
    ),
    footer: props => props.column.id,
  },
  {
    accessorFn: row => row.assignees,
    id: 'assignees',
    cell: ({ cell, row, table }) => {
      return AutoComplete({
        loadOptions: promiseOptions,
        changeHandler: (selection) => { handleAssigneeUpdate(selection, row.original, table) },
        selection: mapUsersToOption(cell.getValue() as User[]),
      })
    },
    header: () => <span>Last Name</span>,
    footer: props => props.column.id,
  },

  {
    accessorKey: 'progress',
    header: ' Progress',
    footer: props => props.column.id,
  },
] 
