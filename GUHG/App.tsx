import {GameEngine} from 'react-native-game-engine';
import React, {useRef} from 'react';
import Constants from './Constants';
import {Dimensions, StyleSheet, View} from 'react-native';
import Head from './components/Head';
import Matter from 'matter-js';
import Box from './components/Box';

const Physics = (entities: any, {time}: any) => {
  let engine = entities['physics'].engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default function App() {
  const {width, height} = Dimensions.get('screen');
  const boxSize = Math.trunc(Math.max(width, height) * 0.075);
  const initialBox = Matter.Bodies.rectangle(
    width / 2,
    height / 2,
    boxSize,
    boxSize,
  );
  const floor = Matter.Bodies.rectangle(
    width / 2,
    height - boxSize / 2,
    width,
    boxSize,
    {isStatic: true},
  );
  const engine = Matter.Engine.create({enableSleeping: false});
  const world = engine.world;
  Matter.World.add(world, [initialBox, floor]);
  return (
    <View style={styles.canvas}>
      <GameEngine
        systems={[Physics]}
        entities={{
          physics: {
            engine: engine,
            world: world,
          },
          initialBox: {
            body: initialBox,
            size: [boxSize, boxSize],
            color: 'red',
            renderer: Box,
          },
          floor: {
            body: floor,
            size: [width, boxSize],
            color: 'green',
            renderer: Box,
          },
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  canvas: {
    // flex: 1,
    // backgroundColor: '#000000',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
