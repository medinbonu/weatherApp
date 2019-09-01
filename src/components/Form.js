import React from "react";

class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.getWeather}>
        <input
          type="text"
          name="city"
          placeholder="Type a city name..."
          value={this.props.inputCity}
          onChange={this.props.onCityChange}
        />
        <button>Search</button>
      </form>
    );
  }
}

export default Form;
