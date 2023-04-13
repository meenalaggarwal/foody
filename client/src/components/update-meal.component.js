import React, { Component } from "react";
import MealDataService from "../services/meal.service";
import { withRouter } from '../common/with-router';

class Meal extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.getMeal = this.getMeal.bind(this);
    this.updateMeal = this.updateMeal.bind(this);

    this.state = {
      currentMeal: {
        id: null,
        name: "",
        date: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMeal(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMeal: {
          ...prevState.currentMeal,
          name: name
        }
      };
    });
  }

  onChangeDate(e) {
    const date = e.target.value;
    
    this.setState(prevState => ({
      currentMeal: {
        ...prevState.currentMeal,
        date: date
      }
    }));
  }

  getMeal(id) {
    MealDataService.get(id)
      .then(response => {
        this.setState({
          currentMeal: response.data[0]
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMeal() {
    console.log(this.state.currentMeal)
    MealDataService.update(
      this.state.currentMeal.id,
      this.state.currentMeal
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Meal was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMeal } = this.state;

    return (
      <div>
        <div className="edit-form">
          <h4>Update Meal</h4>
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={currentMeal.name}
                onChange={this.onChangeName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={currentMeal.date}
                onChange={this.onChangeDate}
                disabled
              />
            </div>
            <button onClick={this.updateMeal} className="btn btn-success">
              Update Meal
            </button>
            <p>{this.state.message}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Meal);