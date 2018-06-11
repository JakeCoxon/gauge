
export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

// How to calculate the SVG Path for an arc (of a circle)
// https://stackoverflow.com/a/18473154/243444
export function describeArc({ x, y, radius, startAngle, endAngle, isClosed }){

  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
      "M", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      isClosed ? "Z" : ""
  ].join(" ");
}

export function lerp(x, a, b) {
  return a + x * (b - a);
}