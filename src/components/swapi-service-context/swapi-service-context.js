import React from 'react';

const {
  Provider : SwapiServiceProvider,
  Consumer : SwapiServiceConsumer
} = React.createContext(); // используем специальную функцию

export {
  SwapiServiceProvider,
  SwapiServiceConsumer
};
