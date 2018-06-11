import React, { Component } from 'react';
import './App.css';


import AnimatedGauge from './AnimatedGauge.js'
import PromiseLoader from './PromiseLoader.js'

const formats = {
  default: x => x,
  currency: {
    GBP: (x) => `£${Math.floor(x)}`,
    USD: (x) => `$${Math.floor(x)}`
  }
}

const dataFetcher = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      "value": Math.random() * 200,
      "min": 0,
      "max": 200,
      "format": "currency",
      "unit": "GBP"
    })
  }, 300)
})


class App extends Component {
  state = { fetchIncrement: 0 }

  nextRequest = () => this.setState({ fetchIncrement: this.state.fetchIncrement + 1 });

  render() {

    return (
      <div className="App" style={{marginTop: 100}}>
        <PromiseLoader function={dataFetcher} input={this.state.fetchIncrement}>{(result, { isLoading }) => 
          <div>

            {result ? 
              <AnimatedGauge min={result.min} max={result.max} value={result.value} format={formats[result.format][result.unit]} />
              : <AnimatedGauge min={0} max={100} value={0} format={formats.default} />} 

            <div style={{margin:'auto'}}>
              {isLoading ? 
                <button disabled={isLoading}>Loading...</button>
                : <button onClick={this.nextRequest} disabled={isLoading}>Load data</button>}

            </div>
          </div>
        }</PromiseLoader>
      </div>
    );
  }
}



export default App;
