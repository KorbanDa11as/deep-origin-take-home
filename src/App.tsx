import React, { useEffect, useState } from 'react';
import './App.css';
import { columns } from './columnDef';
import { Table } from './components/table/table';
import { getTasks, Task } from './api/methods';

function App() {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = React.useState<Task[]>([])
  async function asyncWrapper() {
    console.log('test')
    setData(await getTasks())
    setLoading(false)
  }

  useEffect(() => {
    getTasks()
    asyncWrapper()
  }, [])
  if (isLoading) return <>loading</>
  return (
    <div className="App">
      <Table
        data={data}
        columns={columns}
        updateData={asyncWrapper}

      />
    </div>
  );
}

export default App;
