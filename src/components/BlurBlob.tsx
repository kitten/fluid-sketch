import { useMemo } from 'preact/hooks';
import { useComputed } from '@preact/signals';
import { css } from 'goober';

import { Scene } from '../scene';

const blob = css`
  filter: blur(20px);

  &:nth-child(5n + 1) {
    fill: hsla(19, 52%, 69%, 0.16);
  }

  &:nth-child(5n + 2) {
    fill: hsla(307, 11%, 70%, 0.16);
  }

  &:nth-child(5n + 3) {
    fill: hsla(324, 56%, 69%, 0.16);
  }

  &:nth-child(5n + 4) {
    fill: hsla(293, 46%, 71%, 0.16);
  }

  &:nth-child(5n) {
    fill: hsla(281, 51%, 71%, 0.16);
  }
`;

interface BlurBlobProps {
  scene: Scene;
  cx: number;
  cy: number;
  radius?: number;
}

export const BlurBlob = (props: BlurBlobProps) => {
  const scene = props.scene;
  const radius = props.radius || 70;

  const circle = useMemo(() => {
    return scene.addCircle({
      position: [props.cx, props.cy],
      radius: radius,
    });
  }, [scene]);

  const transform = useComputed(() => {
    const deg = circle.angle.value / Math.PI * 180;
    const x = circle.x.value - radius;
    const y = circle.y.value - radius;
    return `
      transform: translate(${x}px, ${y}px) rotate(${deg}deg);
      transform-origin: ${radius}px ${radius}px;
    `;
  });

  return (
    <circle
      cx={radius}
      cy={radius}
      r={radius}
      style={transform}
      className={blob}
    />
  );
};
