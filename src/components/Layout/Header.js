import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  // GETTING CART HERE
  const [cart] = useCart()
  //GETTING CATEGORY SATTE FROM USE CATEGORYHOOK LIKE AUTH
  const categories = useCategory();

  const [auth, setAuth] = useAuth(); //auth or setAuth get kr liya

  //The spread syntax (...) in JavaScript is used to create a shallow copy of an object or an array. It allows you to create a new object or array with all the properties or elements from the original object or array, while also allowing you to add or overwrite specific properties.
  // ...auth: This uses the spread syntax to create a new object containing all the properties from the existing auth object. It effectively copies the existing auth object's properties into the new object.

  // user: null: This updates the user property of the new object to null. In other words, it sets the user information to null.

  // token: null: Similarly, this updates the token property of the new object to null.

  // Purpose:
  // The purpose of this code is to clear the user's authentication data stored in the auth state. By setting both the user and token properties to null, you effectively remove the user's information and authentication token, thus logging the user out.

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth"); //now we will navigate it to login page afgain but already in navlink of logout we redirects it to login page .
    toast.success("Logout successfully");
  };

  //explanation in this we created a btn logout if user exists then show logout btn if user nor exixst the show login orlogout funtion then user presents he logout from here then it redirects it to login and register page simple also add notification

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              🛒E-commerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {/* category hook */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>


              {/* using ternirary opertaor  now we are saying that if in auth  we cannot find any user then show register or login part   else agr user milta he or login hojata he to logout do ad also make fucntion for logout llike handle Logout  in thta logout fucnion we only cleares local storage but hmko direct homepage me se sara content remove krna he to direct state se remove krengen ku ke agr local storage skrengen to hmko reload krna padega */}

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          onClick={handleLogout}
                          to="/login"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Badge count={cart?.length} showZero>


                  <NavLink className="nav-link" to="/cart">

                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

// <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
// {auth?.user?.name}
// </NavLink>
// <ul className="dropdown-menu">
// <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item" >Dashboard</NavLink>
