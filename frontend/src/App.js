import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import User from "./createUser/createUser";
import View from "./viewUser/viewUser";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path ="/:id"Component = {User}></Route>
      <Route path ="/" Component = {User}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;