import React, { Component } from 'react';

import Spinner from '../spinner';

// вынесли всю логику в отдельный компонент, который не зависит от ItemList
const withData = (View) => {
  return class extends Component {

    state = {
      data: null
    };
  // если в нашем компоненте нужно вызвать API,
  // используйте componentDidMount()
    componentDidMount() {
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
