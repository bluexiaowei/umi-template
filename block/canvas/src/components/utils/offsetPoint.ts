import _ from 'lodash';

interface offsetProps {
  points: number[];
  index: number;
  offset: { x: number; y: number };
  type?: string;
}

function rect({ positions, index, offset }) {
  switch (index) {
    case 0:
      positions[0] = positions[0].map((item, i) => item + offset[i]);
      positions[1][1] = positions[1][1] + offset[1];
      positions[3][0] = positions[3][0] + offset[0];
      break;
    case 1:
      positions[2] = positions[2].map((item, i) => item + offset[i]);
      positions[1][0] = positions[1][0] + offset[0];
      positions[3][1] = positions[3][1] + offset[1];
      break;

    default:
      break;
  }
  return positions;
}

function Polygon({ positions, index, offset }) {
  positions[index] = positions[index].map((item, i) => item + offset[i]);
  return positions;
}

function move({ positions, offset }) {
  positions.forEach((position, i, array) => {
    array[i] = position.map((item, i) => item + offset[i]);
  });
  return positions;
}

const offsetType = {
  rect,
  Polygon,
  move,
};

export default function({ points = [], index, offset, type = 'Polygon' }: offsetProps) {
  const length = points.length;
  const offsetPoint = [offset.x, offset.y];

  if (!length || length % 2 !== 0) {
    return points;
  }

  // 将一维坐标点转成二维的 [x1, y1, x2, y2] => [[x1, y1], [x2, y2]]
  let positions = new Array(length / 2).fill(1).map((item, i) => {
    const index = i * 2;
    return [points[index], points[index + 1]];
  });

  // _.flatten 反向操作上面的步骤 [[x1, y1], [x2, y2]] => [x1, y1, x2, y2]
  if (type in offsetType) {
    return _.flatten(offsetType[type]({ positions, points, index, offset: offsetPoint }));
  }

  return _.flatten(positions);
}
