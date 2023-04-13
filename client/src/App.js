import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AddMeal from "./components/add-meal.component";
import MealsList from "./components/meals-list.component";
import UpdateMeal from "./components/update-meal.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/meals" className="navbar-brand">
            FoodyTrucks
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/meals"} className="nav-link">
                Meals
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/meals/:id" element={<UpdateMeal/>} />
            <Route path="/meals" element={<MealsList/>} />
            <Route path="/add" element={<AddMeal/>} />
          </Routes>
        </div>
      </div>
    );
  }
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       {/* <img src={logo} className="App-logo" alt="logo" /> */}
  //       <p>"Food Trucks"</p>
  //     </header>
  //   </div>
  // );
}

export default App;
