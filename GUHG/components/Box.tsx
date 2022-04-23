import React, {FC} from 'react';
import {View} from 'react-native';

type Props = {
  size: number[];
  color: string;
  body: {
    position: {x: number; y: number};
  };
};

const Box: FC<Props> = ({size, body, color}) => {
  const width = size[0];
  const height = size[1];
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;
  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: color || 'pink',
      }}
    />
  );
};

export default Box;
