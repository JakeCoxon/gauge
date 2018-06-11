import React, { Component } from 'react';

import { describeArc, polarToCartesian, lerp } from './util.js'

const width = 500;
const height = 300;
const centerX = width / 2;
const centerY = height * 2/3;
const arcRadius = 130;
const lineRadius = arcRadius + 20;
const labelRadius = lineRadius + 20;
const minMaxLabelRadius = lineRadius + 10;
const minLabelPosition = polarToCartesian(centerX, centerY, minMaxLabelRadius, -90);
const maxLabelPosition = polarToCartesian(centerX, centerY, minMaxLabelRadius, 90);

export default function Gauge({ min, max, value, format }) {
  const clampedValue = Math.min(Math.max(value, min), max)
  const t = (clampedValue - min) / (max - min);
  const endLine = polarToCartesian(centerX, centerY, lineRadius, lerp(t, -90, 90))
  const endText = polarToCartesian(centerX, centerY, labelRadius, lerp(t, -90, 90))

  return <svg style={{ width, height }} viewBox={`0 0 ${width} ${height}`}>
    <path {...Gauge.attributes.arc} d={describeArc({ x: centerX, y: centerY + 1, radius: arcRadius, startAngle: 270, endAngle: 90 })} />
    <line x1={centerX} y1={centerY} x2={endLine.x} y2={endLine.y} stroke="black" />
    <text {...Gauge.attributes.textLabel} {...polarToCartesian(centerX, centerY, labelRadius, lerp(t, -90, 90))}>{format(value)}</text>
    <text {...Gauge.attributes.textLabel} {...minLabelPosition}>{format(min)}</text>
    <text {...Gauge.attributes.textLabel} {...maxLabelPosition}>{format(max)}</text>
  </svg>
}
Gauge.attributes = {
  textLabel: {
    fill: "rgba(0,0,0,0.7)",
    style: { fontFamily: 'Roboto, sans-serif' },
    textAnchor: "middle"
  },
  arc: {
    fill: "rgba(0,0,0,0.35)",
    stroke: "rgba(0,0,0,0.8)",
    strokeWidth: "4"
  }
}


