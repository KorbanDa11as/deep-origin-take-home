import React, { useEffect, useState } from 'react';
import './App.css';
import { columns } from './column-def';
import { Table } from './components/table/table';
import { filterUsers, getTasks, getUsers, Task, User } from './api/methods';
import { ServerTable } from './components/table/server-table';
import { Option } from './components/autocomplete/multi-select-controlled';

function App() {

  const [initUsers, setInitUsers] = useState<User[]>([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  async function getInitUsers() {
    const initSearch = await getUsers('')
    setIsLoading(false)
    if (initUsers instanceof Error) { setIsError(true) }
    else {
      setInitUsers(initSearch as User[])
    }
  }
  useEffect(() => {
    getInitUsers()

  }, [])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>failed to fetch Users...</div>

  return (
    <div className="App">
      <ServerTable
        fetchData={getTasks}
        columns={columns(initUsers)}
      />
    </div>
  );
}

export default App;
