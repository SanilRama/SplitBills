import React, { Component } from "react";

class Splitter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      value: true,
      payments: {
        ana: 91.55,
        diogo: 12,
        fabio: 0,
        joao: 36.98,
        lourenco: 49.44,
        sanil: 0,
        sofia: 0,
      },
      persons: [{ name: "", value: "" }],
    };

    // Binding
    this.addPerson = this.addPerson.bind(this);
    this.removePerson = this.removePerson.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeSubmit = this.changeSubmit.bind(this);
  }

  splitPayments() {
    var object = this.state.persons.reduce(
      (obj, item) =>
        Object.assign(obj, { [item.name]: parseFloat(item.value, 10) }),
      {}
    );

    console.log("object", object);
    console.log("object payments", this.state.payments);

    const people = Object.keys(object);
    const valuesPaid = Object.values(object);
    const sum = valuesPaid.reduce((acc, curr) => curr + acc);
    const mean = sum / people.length;
    const sortedPeople = people.sort(
      (personA, personB) => object[personA] - object[personB]
    );
    const sortedValuesPaid = sortedPeople.map(
      (person) => object[person] - mean
    );

    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;
    let resultString1 = [];
    let resultString2 = [];
    let resultString = [];

    while (i < j) {
      debt = Math.min(-sortedValuesPaid[i], sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;
      console.log(
        `${sortedPeople[i]} owes ${sortedPeople[j]} ${debt.toFixed(2)} €`
      );

      resultString1[i] = `${sortedPeople[i]} owes ${
        sortedPeople[j]
      } ${debt.toFixed(2)} €`;
      resultString2[j] = `${sortedPeople[i]} owes ${
        sortedPeople[j]
      } ${debt.toFixed(2)} €`;

      if (sortedValuesPaid[i] === 0) {
        i++;
      }
      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }

    var concatResultString = resultString1.concat(resultString2);
    resultString = [...new Set(concatResultString)]; // concatunates arrays from both sides to cover every transaction possible
    var result = resultString.filter((n) => n); // filters undefined values if they exist

    console.log("result string", resultString);
    console.log("result result string", result);

    const listItems = result.sort().map((number, i) => (
      <li style={{ listStyleType: "none" }} key={i}>
        {number}
      </li>
    ));

    return (
      <div className="result-display">
        <img
          src="./money-black.svg"
          alt="Money exchange logo"
          style={{ width: "35px", marginBottom: "10px" }}
        />
        {listItems}
      </div>
    );
  }

  /**
   * Handles change on user input
   *
   * @param {*} e
   */
  handleChange = (e) => {
    if (["name", "value"].includes(e.target.className)) {
      let persons = [...this.state.persons];
      persons[e.target.dataset.id][e.target.className] =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
      this.setState({ persons }, () => console.log(this.state.persons));
    } else {
      this.setState({
        [e.target.name]:
          e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
      });
    }
  };

  /**
   * Adds person with button click
   *
   */
  addPerson = (e) => {
    this.setState((prevState) => ({
      persons: [...prevState.persons, { name: "", value: "" }],
    }));
  };

  /**
   *
   * Removes person with button click
   */
  removePerson(idx) {
    let someArray = this.state.persons;
    someArray.splice(idx, 1);
    this.setState({ person: someArray });
  }

  /**
   * Stops our form from automatically reloading the page
   *
   * @param {*} e
   */
  handleSubmit = (e) => {
    e.preventDefault();
  };

  /**
   * Changes submit to true or false
   */
  changeSubmit = (e) => {
    console.log("submit", this.state.submit);
    e.preventDefault();
    this.setState({
      submit: !this.state.submit,
      value: false,
    });
  };

  render() {
    let { persons } = this.state;
    return (
      <React.Fragment>
        <div className="maincard">
          {/* Forms */}
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <button
              className="add-user-button"
              disabled={!this.state.value}
              onClick={this.addPerson}
            >
              <span>
                <img
                  src="./add-user-button.svg"
                  alt="Add Person"
                  style={{ width: "25px" }}
                />
              </span>{" "}
              <span>Add new person</span>
            </button>
            {persons.map((val, idx) => {
              let personId = `person-${idx}`,
                valueId = `value-${idx}`;
              return (
                <div key={idx}>
                  <label htmlFor={personId}>{`Person #${idx + 1}`}</label>
                  <input
                    type="text"
                    name={personId}
                    data-id={idx}
                    id={personId}
                    value={persons[idx].name}
                    className="name"
                    style={{ paddingLeft: "8px" }}
                  />
                  <label htmlFor={valueId}>Value</label>
                  <input
                    type="text"
                    name={valueId}
                    data-id={idx}
                    id={valueId}
                    value={persons[idx].value}
                    className="value"
                    style={{ paddingLeft: "8px" }}
                  />
                  {idx > 0 && (
                    <button
                      className="remove-user-button"
                      onClick={() => this.removePerson(idx)}
                    >
                      Remove person
                    </button>
                  )}
                </div>
              );
            })}
            <input
              className="submit-button"
              type="submit"
              value="Submit"
              onClick={this.changeSubmit}
            />
          </form>

          {/* Split part */}
          {this.state.submit === true && this.splitPayments()}
        </div>
      </React.Fragment>
    );
  }
}

export default Splitter;
