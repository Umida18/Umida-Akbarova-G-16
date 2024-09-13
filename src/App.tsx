import "./App.css";
import Layoutt from "./components/layout";
import { Provider } from "react-redux";
import store from "./store";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { CompanyTable } from "./pages/company";
import { Job } from "./pages/job";
// import { MovieTable } from "./pages/movie";
// import { GenreTable } from "./pages/genre";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layoutt>
                <Outlet />
              </Layoutt>
            }
          >
            <Route
              path="/"
              element={<Navigate to={"./companyTable"} />}
            ></Route>
            <Route path="/companyTable" element={<CompanyTable />}></Route>
            <Route path="/job" element={<Job />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
