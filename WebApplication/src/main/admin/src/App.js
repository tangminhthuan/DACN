import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import "./App.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/index.css";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./components/sidebar/Sidebar";
import {Dashboard, Customers, Products, Categories, Brands} from "./pages";
import Login from "./pages/Login";
import {selectIsLoggedIn} from "./redux/slice/authSlice";
import {useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import Topnav from "./components/topnav/TopNav";
import AddProduct from "./pages/AddProduct";
import ProductImages from "./pages/ProductImages";
import EditProduct from "./pages/EditProduct";
import {useEffect} from "react";
function App() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return (
        <BrowserRouter>
            <Routes>
                {isLoggedIn ? (
                    <Route
                        path="/*"
                        element={
                            <div className="layout">
                                <Sidebar/>
                                <div className="layout__content">
                                    <Topnav/>
                                    <div className="layout__content-main">
                                        <Routes>
                                            <Route path="/" element={<Dashboard/>}/>
                                            <Route path="/customers" element={<Customers/>}/>
                                            <Route path="/products/*" element={<Products/>}/>
                                            <Route path="products/addProduct" element={<AddProduct/>}/>
                                            <Route path="products/images/:id" element={<ProductImages/>}/>
                                            <Route path="products/:id" element={<EditProduct/>}/>
                                            <Route path="categories" element={<Categories/>}/>
                                            <Route path="brands" element={<Brands/>}/>
                                        </Routes>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                ) : (
                    <Route path="/login" element={<Login/>}/>
                )}
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    );
}

export default App;
