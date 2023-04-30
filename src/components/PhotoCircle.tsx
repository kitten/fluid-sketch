import { useMemo } from 'preact/hooks';
import { useComputed } from '@preact/signals';

import { Scene } from '../scene';

interface PhotoCircleProps {
  scene: Scene;
  cx: number;
  cy: number;
  radius: number;
  href: string;
}

export const PhotoCircle = (props: PhotoCircleProps) => {
  const radius = props.radius || 26;

  const circle = useMemo(() => {
    return props.scene.addCircle({
      position: [props.cx, props.cy],
      radius: props.radius + 2,
    });
  }, [props.scene]);

  const transform = useComputed(() => {
    const deg = circle.angle.value / Math.PI * 180;
    return `transform: translate(${circle.x.value}px, ${circle.y.value}px) rotate(${deg}deg);`;
  });

  return (
    <image 
      href={props.href}
      height={radius * 2}
      width={radius * 2}
      style={transform}
    />
  );
};
