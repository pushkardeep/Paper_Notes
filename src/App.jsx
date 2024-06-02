import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Notes from "./pages/notes";
import LogIn from "./pages/logIn";
import SignUp from "./pages/signUp";
import Protected from "./components/Protected";
import OpenRoute from "./components/OpenRoute";
import Error from "./pages/error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to={"/notes"} />} />
        <Route
          path="/notes"
          element={
            <Protected>
              <Notes />
            </Protected>
          }
        />
        <Route
          path="/log_in"
          element={
            <OpenRoute>
              <LogIn />
            </OpenRoute>
          }
        />
        <Route
          path="/sign_up"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
