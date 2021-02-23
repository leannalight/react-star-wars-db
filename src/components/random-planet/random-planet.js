import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
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
  // вызвать код updatePlanet в componentDidMount()
  componentDidMount() {
    this.updatePlanet();
    // сохранить id интервала
    this.interval = setInterval(this.updatePlanet, 10000);
    // clearInterval(this.interval);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount()');
  }
// создадим ф-ю
  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePlanet = () => { // получаем данные из сервера
    console.log('update');
    // чтобы выбрать id случайной планеты
    const id = Math.floor(Math.random()*25) + 3; // id от 3 до 27 можем получать случайным образом
   // запрашиваем данные планеты
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    console.log('render()');
    // чтобы использовать эти значения в разметке
    const { planet, loading, error } = this.state; // деструктуризация state
    // у нас есть данные, когда нет ни загрузки, ни ошибки
    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
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
