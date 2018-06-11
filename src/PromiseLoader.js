import React, { Component } from 'react';

export default class PromiseLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, result: null }
  }
  componentDidMount() {
    this.performUpdate();
  }
  performUpdate() {
    this.cancel && this.cancel();
    this.setState({ loading: true })

    let isCancelled = false;
    this.cancel = () => isCancelled = true;
    this.props.function(this.props.input).then(result => {
      if (!isCancelled) this.setState({ loading: false, result })
    }, err => {
      if (!isCancelled) this.setState({ loading: false })
    })
  }
  componentDidUpdate(oldProps) {
    if (this.props.input !== oldProps.input) {
      this.performUpdate()
    }
  }
  render() {
    return this.props.children(this.state.result, { isLoading: this.state.loading })
  }
}