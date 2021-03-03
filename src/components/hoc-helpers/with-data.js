import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

// вынесли всю логику в отдельный компонент, который не зависит от ItemList
const withData = (View, getData) => {
  return class extends Component {

    state = {
      data: null
    };
  // если в нашем компоненте нужно вызвать API,
  // используйте componentDidMount()
    componentDidMount() {
      getData()
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
