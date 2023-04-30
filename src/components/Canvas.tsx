import { useEffect, useState } from 'preact/hooks';
import { signal, useComputed } from '@preact/signals';
import { css } from 'goober';

import { timeString } from '../utils/time';
import { dateString } from '../utils/date';
import { WIDTH, HEIGHT } from '../constants';
import { makeScene } from '../scene';

import { TextCircle } from './TextCircle';
import { TextBand } from './TextBand';
import { ColorBand } from './ColorBand';
import { ColorCircle } from './ColorCircle';
import { Star } from './Star';

const badge = css`
  font-family: var(--font-variable);
  text-transform: uppercase;
  letter-spacing: -0.2px;
  font-weight: 500;
  font-size: 26px;
  perspective: 1000px;
`;

export const Canvas = () => {
  const scene = useState(() => makeScene(1))[0];
  const date = useState(() => signal(new Date()))[0];

  const currentBattery = '78% Charging 78% Charging ';

  useEffect(() => scene.render(), [scene]);
  useEffect(() => scene.registerAcceleration(), [scene]);

  useEffect(() => {
    const id = setInterval(() => {
      date.value = new Date();
    }, 5000);
    return () => {
      clearInterval(id);
    };
  }, [date]);

  const currentDate = useComputed(() => dateString(date.value));
  const currentTime = useComputed(() => timeString(date.value));

  return (
    <svg className={badge} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      <TextBand
        cx={70}
        cy={70}
        radius={90}
        text={currentBattery}
        scene={scene}
      />
      <TextCircle
        cx={WIDTH / 2 - 70}
        cy={HEIGHT / 2 - 160}
        radius={80}
        text={currentDate}
        scene={scene}
      />
      <TextCircle
        cx={WIDTH / 2}
        cy={HEIGHT / 2}
        radius={95}
        text={currentTime}
        scene={scene}
      />
      <ColorBand
        cx={WIDTH - 160}
        cy={HEIGHT - 160}
        radius={65}
        width={22}
        scene={scene}
      />
      <ColorCircle
        cx={WIDTH - 110}
        cy={HEIGHT / 3}
        radius={50}
        scene={scene}
      />
      <ColorCircle
        cx={110}
        cy={HEIGHT - 110}
        radius={50}
        scene={scene}
      />
      <Star
        cx={WIDTH - 110}
        cy={120}
        scene={scene}
      />
      <Star
        cx={110}
        cy={HEIGHT / 2}
        scene={scene}
      />
    </svg>
  );
};
