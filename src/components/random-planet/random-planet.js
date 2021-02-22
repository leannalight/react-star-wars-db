import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './random-planet.css';

export default class RandomPlanet extends Component {
// запускаем код API
  swapiService = new SwapiService();
// что нужно этому компоненту
  state = {
    planet: {}, // сделаем пустым объектом, чтобы код деструктуризации не ругался
    loading: true
  };
  // вызвать код updatePlanet в конструкторе
  constructor() {
    super();
    this.updatePlanet();
  }
// создадим ф-ю
  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    });
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
    // чтобы использовать эти значения в разметке
    const { planet, loading } = this.state; // деструктуризация state

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
      </div>

    );
  }
}
// занимается исключительно отображением данных
const PlanetView = ({ planet }) => {

  const { id, name, population,
    rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
