import konva from 'konva';
import KonvaEX from '../KonvaEX';
import Konva from 'konva';
export default function darwPoints(points: number[]): any[] {
  // 将一维坐标点转成二维的 [x1, y1, x2, y2] => [[x1, y1], [x2, y2]]
  let positions = new Array(points.length / 2).fill(1).map((item: number, i: number) => {
    const index = i * 2;
    return { x: points[index], y: points[index + 1] };
  });
  return positions.map((pointion: { x: number; y: number }, i: number) => {
    return new Konva.Circle(KonvaEX.Circle.create(pointion, i));
  });
}
