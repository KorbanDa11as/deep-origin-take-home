
export type Task = {
  id: string
  name: string
  tags: string
  progress: number
  assignees: User[]
}
export type User = {
  id: string
  first: string
  last: string
}

export type Error = {
  name: string;
  message: string;
  stack?: string;
}
export type GenericDataEndpoint<TData> = {
  data: TData[]
  total: number
}

export async function filterUsers(inputValue: string, transform?: (data: User[]) => any[]) {
  try {
    const data = await getUsers(inputValue)
    if (data instanceof Error) throw data
    else
      // return (data as User[]).map(user => ({ label: user.first + ' ' + user.last, value: user.id })) as Option[]
      return transform ? transform(data as User[]) : data as User[]
  }
  catch (e) {
    console.error(e)
    throw e
  }

}
export async function getUsers(filterName: string): Promise<User[] | Error> {
  try {
    const resp = await fetch(`http://localhost:8000/users?name=${filterName}`)
    const data = await resp.json()
    return data
  }
  catch (e) {
    console.error(e)

    return new Error("error fetching tasks")
  }
}
export async function getTasks(page: number, pageSize: number): Promise<GenericDataEndpoint<Task> | Error> {
  try {
    const resp = await fetch(`http://localhost:8000/tasks/${page}?limit=${pageSize}`)
    const data = await resp.json()
    return data
  }
  catch (e) {
    console.error(e)
    return new Error(' error fetching tasks')
  }
}

export type updateAssigneeTask = { taskId: string, userIds: string[] }
export async function updateAssignees({ taskId, userIds }: updateAssigneeTask) {
  try {
    const resp = await fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assignees: userIds }),
    })
  }
  catch (e) {
    console.error(e)
  }
}
