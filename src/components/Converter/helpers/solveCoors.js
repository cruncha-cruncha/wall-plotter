// eyeToEye = sqrt(leftLength^2 - y^2) + (toolOffsetX * 2) + sqrt(rightLength^2 - y^2)
// solve for y

export default function solveCoors({ eyeToEye, toolOffsetX, toolOffsetY, leftLength, rightLength }) {
  if (eyeToEye <= 0 || toolOffsetX < 0 || toolOffsetY < 0 || leftLength < 0 || rightLength < 0) {
    return null;
  }

  const n1 = eyeToEye - (toolOffsetX * 2);
  const n2 = Math.pow(rightLength, 2) - Math.pow(leftLength, 2) - Math.pow(n1, 2);

  const a = 4 * Math.pow(n1, 2);
  // b is always zero
  const c = -4 * Math.pow(n1, 2) * Math.pow(leftLength, 2) + Math.pow(n2, 2);

  const leftY2 = Math.sqrt(-4 * a * c) / (2 * a);
  const leftX2 = Math.sqrt(Math.pow(leftLength, 2) - Math.pow(leftY2, 2));

  return {
    x: leftX2 + toolOffsetX,
    y: leftY2 + toolOffsetY
  };
}