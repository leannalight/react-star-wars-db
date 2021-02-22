import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';

import './random-planet.css';

export default class RandomPlanet extends Component {
// запускаем код API
  swapiService = new SwapiService();
// что нужно этому компоненту
  state = {
    planet: {} // сделаем пустым объектом, чтобы код деструктуризации не ругался
  };
  // вызвать код updatePlanet в конструкторе
  constructor() {
    super();
    this.updatePlanet();
  }
// создадим ф-ю
  onPlanetLoaded = (planet) => {
    this.setState({planet});
  };

  updatePlanet() { // получаем данные из сервера
    // чтобы выбрать id случайной планеты
    const id = Math.floor(Math.random()*25) + 2; // id от 2 до 27 можем получать случайным образом
    // запрашиваем данные планеты
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded);
  }

  render() {
    // чтобы использовать эти значения в разетке
    const { planet: { id, name, population,
      rotationPeriod, diameter } } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        <img className="planet-image" alt=""
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>

    );
  }
}
