import React, {useRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import UserService from "../../services/UserService";
import axios from "axios";
import {loginSuccess, logoutSuccess} from "../../redux/slice/authSlice";
// import logo from "../assets/images/Logo-2.png";
// import { auth } from "../firebase/config";
// import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../redux/auth/authSlice";
import {ShowOnLogin, ShowOnLogout} from "../hiddenLink/hiddenLink";
// import productData from "../assets/fake-data/products";
const mainNav = [
    {
        display: "Trang chủ",
        path: "/",
    },
    {
        display: "Sản phẩm",
        path: "/catalog",
    },
    {
        display: "Phụ kiện",
        path: "/accessories",
    },
    {
        display: "Liên hệ",
        path: "/contact",
    },
];

const Header = () => {
    const {pathname} = useLocation();
    const [displayName, setdisplayName] = useState("");
    const activeNav = mainNav.findIndex((e) => e.path === pathname);
    const cartItems = "";
    const headerRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                UserService.getCurrentUser().then((res) => {
                    if (res.status === 200) {
                        dispatch(loginSuccess(res.data));
                        const name = res.data.firstName + " " + res.data.lastName;
                        setdisplayName(name);
                    }
                });
            }
        }
        , [dispatch]);
    const logoutUser = () => {
        dispatch(logoutSuccess());
        toast.success("Đăng xuất thành công");
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (
                document.body.scrollTop > 80 ||
                document.documentElement.scrollTop > 80
            ) {
                headerRef.current.classList.add("shrink");
            } else {
                headerRef.current.classList.remove("shrink");
            }
        });
        return () => {
            //   window.removeEventListener("scroll");
        };
    }, []);

    const menuLeft = useRef(null);

    const menuToggle = () => menuLeft.current.classList.toggle("active");

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">{/* <img src={logo} alt="" /> */}</Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className="bx bx-menu-alt-left"></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className="bx bx-chevron-left"></i>
                        </div>
                        {mainNav.map((item, index) => (
                            <div
                                key={index}
                                className={`header__menu__item header__menu__left__item ${
                                    index === activeNav ? "active" : ""
                                }`}
                                onClick={menuToggle}
                            >
                                <Link to={item.path}>
                                    <span>{item.display}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <i className="bx bx-search"></i>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <div className="header__cart">
                                <Link to="/cart">
                                    <i className="bx bx-shopping-bag"></i>
                                </Link>
                                <span className="header__card-notice">{}</span>

                            </div>
                        </div>

                        <div className="header__menu__item header__menu__right__item ">
                            <div className="header__user">
                                <ShowOnLogin>
                                    <Link>
                                        <i className='bx bx-user'></i>
                                        <span>{displayName}</span>
                                    </Link>
                                </ShowOnLogin>
                            </div>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <ShowOnLogout>
                                <Link to="/login">
                                    <span>Đăng nhập</span>
                                </Link>
                            </ShowOnLogout>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <ShowOnLogin>
                                <Link to="/order-history"><span>Đơn hàng</span></Link>
                            </ShowOnLogin>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <ShowOnLogin>
                                <Link onClick={logoutUser} to="/login">
                                    <span>

                                          Đăng xuất

                                    </span>

                                </Link>
                            </ShowOnLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
