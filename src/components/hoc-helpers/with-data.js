import React, { Component } from 'react';

import Spinner from '../spinner';

// вынесли всю логику в отдельный компонент, который не зависит от ItemList
const withData = (View) => {
  return class extends Component {

    state = {
      data: null
    };
    // когда мы получили обновление компонента
    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update();
      }
    }

    // если в нашем компоненте нужно вызвать API,
    // используйте componentDidMount()
    componentDidMount() {
      this.update();
    }
    // вынесли код, который обновляет состояние в функцию
    update() {
      this.props.getData()
        .then((data) => {
          this.setState({
            data
          });
        });
    }

    render() {
      const { data } = this.state;

      if (!data) {
        return <Spinner />
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;
