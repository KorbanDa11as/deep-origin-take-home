
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
export async function getUsers() {
  try {
    const resp = await fetch('http://localhost:8000/users')
    const data = await resp.json()
    return data as User[]
    console.log(data)
  }
  catch (e) {
    console.log(e)
  }
}
export async function getTasks() {
  try {
    const resp = await fetch('http://localhost:8000/tasks')
    const data = await resp.json()
    return data
    console.log(data)
  }
  catch (e) {
    console.log(e)
  }
}

export type updateAssigneeTask = { taskId: string, userIds: string[] }
export async function updateAssignees({ taskId, userIds }: updateAssigneeTask) {
  try {
    console.log('update', taskId, userIds)
    const resp = await fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assignees: userIds }),
    })
  }
  catch (e) {

    console.log(e)
  }
}
