import { useMemo } from 'preact/hooks';
import { useComputed } from '@preact/signals';
import { css, keyframes } from 'goober';

import { Scene } from '../scene';

const rotate = keyframes`
  0% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(0deg);
  }
`;

const conical = css`
  animation-name: ${rotate};
  animation-duration: 30s;
  animation-iteration-count: infinite;
  animation-play-state: running;
  animation-timing-function: linear;

  border-radius: 50%;
  background-image: conic-gradient(
    from 270deg,
    hsla(19, 52%, 69%, 1) 0%,
    hsla(307, 11%, 70%, 1) 20%,
    hsla(324, 56%, 69%, 1) 40%,
    hsla(293, 46%, 71%, 1) 60%,
    hsla(281, 51%, 71%, 1) 90%
  );
`;

interface ColorCircleProps {
  scene: Scene;
  cx: number;
  cy: number;
  radius: number;
}

export const ColorCircle = (props: ColorCircleProps) => {
  const scene = props.scene;
  const radius = props.radius || 26;

  const circle = useMemo(() => {
    return scene.addCircle({
      position: [props.cx, props.cy],
      radius: props.radius + 2,
    });
  }, [scene]);

  const x = useComputed(() => (circle.x.value - radius).toFixed(1));
  const y = useComputed(() => (circle.y.value - radius).toFixed(1));

  return (
    <foreignObject
      x={x}
      y={y}
      width={radius * 2}
      height={radius * 2}
    >
      <div
        className={conical}
        style={{ width: radius * 2, height: radius * 2 }}
      />
    </foreignObject>
  );
};
