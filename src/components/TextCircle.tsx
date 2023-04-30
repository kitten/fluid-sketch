import { useId, useMemo } from 'preact/hooks';
import { Signal, useComputed } from '@preact/signals';
import { css, keyframes } from 'goober';

import { Scene } from '../scene';

const path = (cx: number, cy: number, r: number) => `
  M ${cx}, ${cy}
  m ${r}, 0
  a ${r},${r} 0 1,0 -${r * 2},0
  a ${r},${r} 0 1,0 ${r * 2},0
`;

const text = (fontSize: number) => css`
  will-change: transform;
  font-size: ${fontSize}px;
  letter-spacing: 0.2ch;
  fill: white;
`;

const wdth = keyframes`
  0% {
    font-variation-settings: 'wdth' 60, 'opsz' 10;
  }

  100% {
    font-variation-settings: 'wdth' 150, 'opsz' 120;
  }
`;

const tspan = css`
  animation-name: ${wdth};
  animation-direction: alternate;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-play-state: running;
  /** Needed to interpolate font smoothly */
  animation-timing-function: steps(150, end);
`;

interface TextCircleProps {
  scene: Scene;
  cx: number;
  cy: number;
  radius: number;
  fontSize?: number;
  text: Signal<string>;
}

export const TextCircle = (props: TextCircleProps) => {
  const scene = props.scene;
  const fontSize = props.fontSize || 26;
  const radius = props.radius || 26;
  const id = useId();

  const circle = useMemo(() => {
    return scene.addCircle({
      position: [props.cx, props.cy],
      radius: props.radius + 2,
    });
  }, [scene]);

  const children = useMemo(() => {
    const chars = props.text.value.split('');
    return chars.map((x, i) => (
      <tspan
        key={i}
        className={tspan}
        style={{ animationDelay: `${((-5 / chars.length) * i).toFixed(2)}s` }}
      >
        {x}
      </tspan>
    ))
  }, [props.text.value]);
 
  const transform = useComputed(() => {
    const deg = (circle.angle.value / Math.PI * 180).toFixed(1);
    const x = circle.x.value.toFixed(1);
    const y = circle.y.value.toFixed(1);
    return `translate(${x} ${y}) rotate(${deg})`;
  });

  return (
    <>
      <defs>
        <path
          d={path(0, 0, radius)}
          id={id}
        />
      </defs>
      <text className={text(fontSize)} transform={transform}>
        <textPath
          href={`#${id}`}
          method="align"
          spacing="auto"
        >
          {children}
        </textPath>
      </text>
    </>
  );
};
