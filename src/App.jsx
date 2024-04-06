import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {/* <Home/> */}
      <Navbar />
      <div className="max-w-7xl mx-auto pt-5 px-6">
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />}></Route>
          </Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </PersistGate>
  );
}

export default App;
