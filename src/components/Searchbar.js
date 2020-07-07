import React, { Component } from "react";

class Searchbar extends Component {
  state = {
    query: "",
  };
  //Передает строку запроса в query во время изменения текстового поля
  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value });
  };
  //Передает значение query и ресетит query при сабмите формы
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.reset();
  };

  reset = () => {
    this.setState({
      query: "",
    });
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
