import React from 'react';

import ItemList from '../item-list';
import { withData } from '../hoc-helpers';
import SwapiService from '../../services/swapi-service';

const swapiService = new SwapiService();

const {
  getAllPeople,
  getAllStarships,
  getAllPlanets
} = swapiService;
// эта ф-я умеет брать любой реакт-компонент и устанавливать ему
// в качестве children заданную ф-ию
const withChildFunction = (Wrapped, fn) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    );
  }
};

const renderName = ({ name }) => <span>{name}</span>
const renderModelAndName = ({ model, name }) => <span>{name} ({model})</span>;
// это ItemList, у которого будут данные из ф-ии getAllPeople
const PersonList = withData(
                      withChildFunction(ItemList, renderName),
                      getAllPeople);

const PlanetList = withData(
                      withChildFunction(ItemList, renderName),
                      getAllPlanets);

const StarshipList = withData(
                        withChildFunction(ItemList, renderModelAndName),
                        getAllStarships);

export {
  PersonList,
  PlanetList,
  StarshipList
};
