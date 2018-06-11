import React from 'react';

import { Motion, spring } from 'react-motion'
import Gauge from './Gauge.js'

export default function AnimatedGauge({ min, max, value, format }) {
  return <Motion defaultStyle={{x: min}} style={{x: spring(value, {stiffness: 40, damping: 10})}}>{value => 
    <Gauge min={min} max={max} value={value.x} format={format} />
  }</Motion>
}

AnimatedGauge.propTypes = {
  ...Gauge.propTypes
};