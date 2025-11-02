import React from 'react'
import Home from './pages/Home/Home'
import {Route , Routes} from 'react-router-dom'
import AddTask from './pages/AddTask/AddTask'
import MyTask from './pages/MyTask/MyTask'
import Analytics from './pages/Analytics/Analytics'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'


const App = () => {

  return (


    <div>
      <Routes>
        <Route element={<Home/>} path='/'></Route>
        <Route element={<AddTask/>} path='/add-task'></Route>
        <Route element={<MyTask/>} path='/my-task'></Route>
        <Route element={<Analytics/>} path='/my-analytics'></Route>
        <Route element={<Signup/>} path='/signup'></Route>
        <Route element={<Login/>} path='/login'></Route>
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "1.1rem",
            padding: "14px 18px",
            borderRadius: "12px",
            background: "#333",
            color: "#fff",
          },
          success: {
            style: {
              background: "linear-gradient(90deg, #00c853)",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#00c853",
            },
          },
          error: {
            style: {
              background: "linear-gradient(90deg, #d32f2f, #ff5252)",
              color: "#fff",
            },
          },
        }}
      />
    </div>
  )
}

export default App
