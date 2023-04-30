import { useId, useMemo } from 'preact/hooks';
import { useComputed } from '@preact/signals';

import { Scene } from '../scene';

const path = (r: number) => `
  M 0,0
  m ${r},0
  a ${r},${r} 0 1,0 -${r * 2},0
  a ${r - 20},${r - 20} 0 1,0 ${r * 2 - 20},0
`;

interface ColorBandProps {
  scene: Scene;
  cx: number;
  cy: number;
  radius: number;
  width: number;
}

export const ColorBand = (props: ColorBandProps) => {
  const scene = props.scene;
  const width = props.width || 12;
  const radius = props.radius || 26;
  const id = useId();

  const circle = useMemo(() => {
    return scene.addCircle({
      position: [props.cx, props.cy],
      radius: props.radius + 2,
    });
  }, [scene]);

  const transform = useComputed(() => {
    const deg = (circle.angle.value / Math.PI * 180).toFixed(1);
    const x = circle.x.value.toFixed(1);
    const y = circle.y.value.toFixed(1);
    return `translate(${x} ${y}) rotate(${deg})`;
  });

  return (
    <g transform={transform}>
      <path
        d={path(radius - 2)}
        fill="none"
        stroke={`url(#${id})`}
        stroke-width={`${width}px`}
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
      />
      <defs>
        <linearGradient id={id}>
          <stop offset="20%" stop-color="hsla(19, 52%, 69%, 1)" />
          <stop offset="45%" stop-color="hsla(307, 11%, 70%, 1)" />
          <stop offset="75%" stop-color="hsla(324, 56%, 69%, 1)" />
          <stop offset="95%" stop-color="hsla(293, 46%, 71%, 1)" />
          <stop offset="100%" stop-color="hsla(281, 51%, 71%, 1)" />
        </linearGradient>
      </defs>
    </g>
  );
};
