# react-star-wars-db

[приложение--->](https://leannalight.github.io/react-star-wars-d/)

- Axios
- Superagent
- Got
- Request
- Reqwest

Методы жизненного цикла React компонента

MOUNTING
--------
constructor() => render() => componentDidMount()

UPDATES
-------
New Props - пришли новые свойства
                => render() => componentDidUpdate(prevProps, prevState) - для обновленных свойств
setState() - или компонент вызвал setState() благодаря какому-то событию

UNMOUNTING
-----------
componentWillUnmount()

ERROR
------
componentDidCatch()
