import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container max-w-7xl min-h-[85vh] md:mx-auto bg-blue-400 md:w-1/2 my-5 rounded-lg p-5">
        <h1 className='font-bold text-red-900 text-center text-xl md:text-[22px]'>myTaskPlanner - Plan Your Task At One Place</h1>
        <div className="addTodd my-5 flex flex-col gap-4">
          <h1 className='text-xl font-mono'>Add Todo</h1>
          <div className='flex gap-4'>
            <input onChange={handleChange} value={todo} type="text" className='bg-amber-50 rounded-full px-5 py-1 w-full' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='font-mono bg-blue-700 disabled:bg-blue-800 hover:bg-blue-900 text-white hover:font-semibold p-2 py-1 text-sm rounded-md'>Save</button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" className='font-mono mx-0.5 my-4' checked={showFinished} />Show Finished
        <div className='h-[2px] bg-black opacity-40 w-[90%] mx-auto my-2'></div>
        <h2 className='text-xl font-mono'>Your Todo's</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todo</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  justify-between my-3">
              <div className='flex gap-5'>
                <input onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} name={item.id} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="btns flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='font-mono bg-blue-700 hover:bg-blue-900 text-white hover:font-semibold p-2 py-1 text-lg rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='font-mono bg-blue-700 hover:bg-blue-900 text-white hover:font-semibold p-2 py-1 text-lg rounded-md mx-1'><MdDelete />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
