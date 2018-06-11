import React from 'react'
import PropTypes from 'prop-types'

// PromiseLoader takes an input and a function that returns a promise
// and executes the function with the input whenever the input changes
// The result of the promise and the loading state is passed to the
// children of the component as a function
// This lets a component reactively handle async behaviour inline and
// without having to manage state changes itself
// The input is compared to with ===

export default class PromiseLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, result: null }
  }
  componentDidMount() {
    this.performUpdate();
  }
  performUpdate() {
    // If the input changes then the promise resolver should
    // be cancelled so that no overlapping async effects happen
    this.cancel && this.cancel();
    this.setState({ loading: true })

    let isCancelled = false;
    this.cancel = () => isCancelled = true;
    this.props.function(this.props.input).then(result => {
      if (!isCancelled) this.setState({ loading: false, result });
    }, err => {
      if (!isCancelled) this.setState({ loading: false });
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

PromiseLoader.propTypes = {
  function: PropTypes.func.isRequired, // function that takes input and returns a promise
  input: PropTypes.any, // any input 
}