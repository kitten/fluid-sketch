import { useEffect, useState } from 'preact/hooks';
import { css } from 'goober';

import { WIDTH, HEIGHT } from '../constants';
import { makeScene } from '../scene';

import { BlurBlob } from './BlurBlob';

const backdrop = css`
  position: relative;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
`;

export const Backdrop = () => {
  const scene = useState(() => makeScene(0.6))[0];

  useEffect(() => scene.render(), [scene]);
  useEffect(() => scene.registerAcceleration(), [scene]);

  return (
    <div className={backdrop}>
      <BlurBlob
        cx={170}
        cy={200}
        radius={70}
        scene={scene}
      />
      <BlurBlob
        cx={WIDTH - 170}
        cy={300}
        radius={60}
        scene={scene}
      />
      <BlurBlob
        cx={WIDTH / 2}
        cy={500}
        radius={60}
        scene={scene}
      />
      <BlurBlob
        cx={370}
        cy={HEIGHT - 210}
        radius={70}
        scene={scene}
      />
      <BlurBlob
        cx={WIDTH - 170}
        cy={HEIGHT - 200}
        radius={80}
        scene={scene}
      />
    </div>
  );
};
