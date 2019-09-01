import React from "react";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Spinner from "./spinner/Spinner";

const API_KEY = "cd83ae86d98f6fde9e0360bd3895e720";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    loading: false,
    inputCity: ""
  };

  getWeather = async e => {
    this.setState({ loading: true });
    e.preventDefault();
    try {
      const city = this.state.inputCity;
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await api_call.json();

      if (data) {
        console.log(data);
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: "",
          loading: false,
          inputCity: ""
        });
      } 
    } catch (error) {
      return this.setState({
        temperature: undefined,
        city: undefined,
        humidity: undefined,
        description: undefined,
        error: "No results found!",
        loading: false
      });
    }
  };

  onCityChange = e => {
    this.setState({ inputCity: e.target.value });
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="main">
        <div className="form-container">
          <Form
            inputCity={this.state.inputCity}
            onCityChange={this.onCityChange}
            getWeather={this.getWeather}
          />
          {loading && <Spinner />}
          <Weather
            temperature={this.state.temperature}
            city={this.state.city}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
}

export default App;