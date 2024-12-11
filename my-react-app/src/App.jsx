// import UserTable from "./UserTable";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Auth from "./Auth";
import FirebaseCrud from "./FirebaseCrud";
import { ThemeProvider } from "./Context/ThemeContext";
import ThemeToggler from "./components/ThemeToggler";

// import UserTableCrud from "./UserTableCrud";
function App() {
  return (
    <>
      {/* <UserTable /> */}
      {/* <UserTableCrud /> */}
      {/* <Auth /> */}
      <FirebaseCrud />

      {/* <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/crud" element={<FirebaseCrud />} />
        </Routes>
      </Router> */}
      <ThemeProvider>
        <ThemeToggler />
      </ThemeProvider>
    </>
  );
}

export default App;
