import { useMemo } from 'preact/hooks';
import { useComputed } from '@preact/signals';
import { css } from 'goober';

import { Scene } from '../scene';

const blob = (radius: number) => css`
  filter: blur(20px);
  width: ${radius * 2}px;
  height: ${radius * 2}px;
  position: absolute;
  border-radius: 50%;
  top: 0;
  left: 0;

  &:nth-child(5n + 1) {
    background: hsla(19, 52%, 69%, 0.16);
  }

  &:nth-child(5n + 2) {
    background: hsla(307, 11%, 70%, 0.16);
  }

  &:nth-child(5n + 3) {
    background: hsla(324, 56%, 69%, 0.16);
  }

  &:nth-child(5n + 4) {
    background: hsla(293, 46%, 71%, 0.16);
  }

  &:nth-child(5n) {
    background: hsla(281, 51%, 71%, 0.16);
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
    const deg = (circle.angle.value / Math.PI * 180).toFixed(1)
    const x = (circle.x.value - radius).toFixed(1);
    const y = (circle.y.value - radius).toFixed(1);
    return `
      transform: translate(${x}px, ${y}px) rotate(${deg}deg);
      transform-origin: ${radius}px ${radius}px;
    `;
  });

  return (
    <div
      style={transform}
      className={blob(radius)}
    />
  );
};
