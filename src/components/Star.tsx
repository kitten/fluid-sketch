import { useMemo } from 'preact/hooks';
import { useComputed } from '@preact/signals';

import { Scene } from '../scene';

interface StarProps {
  scene: Scene;
  cx: number;
  cy: number;
}

export const Star = (props: StarProps) => {
  const circle = useMemo(() => {
    return props.scene.addCircle({
      position: [props.cx, props.cy],
      radius: 40,
    });
  }, [props.scene]);

  const transform = useComputed(() => {
    const deg = (circle.angle.value / Math.PI * 180).toFixed(1);
    const x = circle.x.value.toFixed(1);
    const y = circle.y.value.toFixed(1);
    return `translate(${x} ${y}) rotate(${deg})`;
  });

  return (
    <g transform={transform}>
      <path
        transform="translate(-40 -40)"
        d="M3.5 57.4019L33.641 40H0V37H34.4449L5 20L6.5 17.4019L35.1244 33.9282L19 6L21.5981 4.5L38 32.909V0H41V32.6269L57.4019 4.21797L60 5.71797L43.4904 34.3135L72.782 17.4019L74.282 20L44.8372 37H80V40H45.641L75.782 57.4019L74.282 60L43.3205 42.1244L61.5981 73.782L59 75.282L41 44.1051V80H38V43.8231L20 75L17.4019 73.5L35.2942 42.5096L5 60L3.5 57.4019Z"
        fillRule="evenodd" 
        clipRule="evenodd" 
        fill="white"
      />
    </g>
  );
};
