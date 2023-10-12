import { Route, Routes } from "react-router-dom";
import "./App.css";
import CategoryForm from "./components/CategoryForm/CategoryForm";
import ProductList from "./components/ProductList/ProductList";
import ProductForm from "./components/ProductForm/ProductForm";
import CategoryList from "./components/CategoryList/CategoryList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={CategoryList} />
        <Route path="/category/:categoryId" Component={ProductList} />
        <Route path="/create-category" Component={CategoryForm} />
        <Route path="/create-product" Component={ProductForm} />
      </Routes>
    </div>
  );
}

export default App;
