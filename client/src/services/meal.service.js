import http from "../http-common";

class MealDataService {

  search(date) {
    if (date) {
      return http.get(`/meals?date=${date}`);
    } else {
      return http.get(`/meals`);
    }
  }

  get(id) {
    return http.get(`/meals/${id}`);
  }

  create(data) {
    return http.post("/meals", data);
  }

  update(id, data) {
    console.log(id, data)
    return http.put(`/meals/${id}`, data);
  }
}

export default new MealDataService();