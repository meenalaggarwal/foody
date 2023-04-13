import React, { Component } from "react";
import MealDataService from "../services/meal.service";

export default class AddMeal extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.saveMeal = this.saveMeal.bind(this);
    this.newMeal = this.newMeal.bind(this);

    this.state = {
      name: "",
      date: "",
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }

  saveMeal() {
    var data = {
      name: this.state.name,
      date: this.state.date
    };

    MealDataService.create(data)
      .then(response => {
        this.setState({
          name: response.data.name,
          date: response.data.date,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMeal() {
    this.setState({
      name: "",
      date: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMeal}>
              Add Meal
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                required
                value={this.state.date}
                onChange={this.onChangeDate}
                name="date"
              />
            </div>

            <button onClick={this.saveMeal} className="btn btn-success">
              Add Meal
            </button>
          </div>
        )}
      </div>
    );
  }
}