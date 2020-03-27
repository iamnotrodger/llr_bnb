import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import logo from "../../2132GLogo_500x500.png";
import ProfileIcon from "./ProfileIcon";
import "./NavBar.css";

const links = [
        {
                label: "Add Property",
                link: "/add-property"
        },
        { role: "Guest", label: "About", link: "/about" },
        {
                label: "Register",
                link: "/register"
        },
        {
                label: "Log in",
                link: "/login"
        }
];

const NavBar = () => {
        const { user, setUser } = useContext(UserContext);
        const isSignedIn = user ? true : false;
        const userID = user ? user.uid : null;

        const filteredList = links.filter((link) => {
                return (
                        link.label === "About" ||
                        (isSignedIn && link.label === "Add Property") ||
                        (!isSignedIn &&
                                (link.link === "/login" ||
                                        link.link === "/register"))
                );
        });

        const linkMarkup = filteredList.map((link, i) => {
                return (
                        <li key={i}>
                                <Link to={link.link}>
                                        <div className='nav-padding'>
                                                {link.label}
                                        </div>
                                </Link>
                        </li>
                );
        });

        const logOut = () => {
                setUser(null);
        };

        return (
                <header id='navbar'>
                        <nav>
                                <div className='logo nav-items'>
                                        <Link to='/'>
                                                <img
                                                        src={logo}
                                                        alt='AirBnB'
                                                        style={{
                                                                height: "55px"
                                                        }}
                                                />
                                        </Link>
                                </div>

                                <div className='padding'></div>

                                <div className='nav-links nav-items'>
                                        <ul className='nav-menu'>
                                                {linkMarkup}
                                                <ProfileIcon
                                                        isSignedIn={isSignedIn}
                                                        userID={userID}
                                                        logOut={logOut}
                                                />
                                        </ul>
                                </div>
                        </nav>
                </header>
        );
};

export default NavBar;
