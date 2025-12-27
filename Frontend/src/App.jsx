import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";

export default function App(){
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Companies/>}/>
        <Route path="/company/:id" element={<CompanyDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}
