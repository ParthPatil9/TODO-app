import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Appbar from "./components/Appbar"
import Landing from "./components/Landing"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Todos from "./components/Todos"
import EditTodo from "./components/EditTodo"

function App() {
  return (
      <div style={{
        backgroundColor : "#E9F1FA",
        margin : -10,
        padding : 10,
        height : "200%"
      }}>
        <Router>
          <Appbar/>
            <Routes>
              <Route path={"/"} element={<Landing />} />
              <Route path={"/signup"} element={<Signup />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/todos"} element={<Todos />} />
              <Route path={"/todos/:todoId"} element={<EditTodo />} />
            </Routes>
        </Router>
      </div>
      
  )
}

export default App
