import React, { Component } from "react";
import MealDataService from "../services/meal.service";
import { Link } from "react-router-dom";

export default class MealsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchDate = this.onChangeSearchDate.bind(this);
    this.retrieveMeals = this.retrieveMeals.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMeal = this.setActiveMeal.bind(this);
    // this.searchDate = this.searchDate.bind(this);
    const date = new Date()
    this.state = {
      meals: [],
      currentIndex: -1,
      searchDate: date.getFullYear()+ '-' + (date.getMonth()+1) + "-" + date.getDate()
    };
  }

  componentDidMount() {
    this.retrieveMeals();
  }

  onChangeSearchDate(e) {
    const searchDate = e.target.value;

    this.setState({
      searchDate: searchDate
    });
  }

  retrieveMeals() {
    MealDataService.search(this.state.searchDate)
      .then(response => {
        this.setState({
          meals: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMeals();
    this.setState({
      currentMeal: null,
      currentIndex: -1
    });
  }

  setActiveMeal(Meal, index) {
    this.setState({
      currentMeal: Meal,
      currentIndex: index
    });
  }

  render() {
    const { searchDate, meals, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="date"
              className="form-control"
              placeholder="Search by Date"
              value={searchDate}
              onChange={this.onChangeSearchDate}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.retrieveMeals}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h4>Meals List "Dated: {this.state.searchDate.toString()}"</h4>

          <ul className="list-group">
            {meals &&
              meals.map((meal, index) => (
                <li>
                  {meal.name}
                  <Link
                    to={"/meals/" + meal.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}