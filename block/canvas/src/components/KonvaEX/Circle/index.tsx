// import _ from 'lodash';
import React from 'react';
import Konva from 'konva';
import { Circle } from 'react-konva';
import uuid from 'Utils/uuid';

class CircleEx extends React.PureComponent<Konva.CircleConfig> {
  static create: (
    pointPosition: { x: number; y: number },
    index: number
  ) => {
    name: string;
    index: number;
    x: number;
    y: number;
    radius: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    strokeScaleEnabled: boolean;
  };
  render() {
    return <Circle {...this.props} />;
  }
}

CircleEx.create = function(pointPosition: { x: number; y: number }, index: number) {
  // 画点
  const point = {
    // id: uuid(),
    name: 'point',
    index,
    x: pointPosition.x,
    y: pointPosition.y,
    radius: 5,
    fill: '#fff',
    stroke: 'red',
    strokeWidth: 1,
    strokeScaleEnabled: false,
  };

  return point;
};

export default CircleEx;
