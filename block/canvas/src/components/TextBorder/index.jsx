import React from 'react';
import { Rect, Text, Group } from 'react-konva';
export default function TextBorder(props) {
  const { width, height, text, ...other } = props;
  const defaultOpt = { width, height };
  return (
    <Group {...defaultOpt} {...other}>
      <Rect {...defaultOpt} fill="rgba(0, 0, 0, 0.7)" stroke="red" strokeWidth={1} />
      <Text {...defaultOpt} text={text} padding={1} fontSize={height - 4} fill="#fff" />
    </Group>
  );
}
