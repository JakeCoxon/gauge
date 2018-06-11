import React from 'react';
import ReactDOM from 'react-dom';
import Gauge from './Gauge.js';
import renderer from 'react-test-renderer';


const defaultFormat = x => x
const moneyFormat = x => `£${Math.floor(x)}`

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Gauge min={0} max={100} value={30} format={defaultFormat} />, div);
  ReactDOM.unmountComponentAtNode(div);
});


const testProps = [
  { min: 0, max: 100, value: 0, format: defaultFormat },
  { min: 0, max: 100, value: 30, format: defaultFormat },
  { min: 100, max: 200, value: 30, format: defaultFormat },
  { min: 0, max: 200, value: 300, format: defaultFormat },
  { min: 0, max: 200, value: 10, format: moneyFormat },
]

testProps.forEach(props => {
  it('renders props', () => {
    const tree = renderer
      .create(<Gauge {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})


