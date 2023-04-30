import { useMemo } from 'preact/hooks';
import { useComputed } from '@preact/signals';
import { css, keyframes } from 'goober';

import { Scene } from '../scene';

const group = css`
  fill: white;
`;

const tspan = css`
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  transform-style: preserve-3d;
  transform-origin: center;
  text-align: center;
  width: 1ch;
`;

const rotate = keyframes`
  0% {
    transform: rotateY(360deg) rotateX(15deg) rotateZ(0deg);
  }

  50% {
    transform: rotateY(180deg) rotateX(40deg) rotateZ(20deg);
  }

  100% {
    transform: rotateY(0deg) rotateX(15deg) rotateZ(0deg);
  }
`;

const animate = css`
  animation-name: ${rotate};
  animation-duration: 60s;
  animation-iteration-count: infinite;
  animation-play-state: running;
  animation-timing-function: linear;
  transform-style: preserve-3d;

  width: 180px;
  height: 180px;
  color: white;
`;

interface TextBandProps {
  scene: Scene;
  cx: number;
  cy: number;
  radius: number;
  text: string;
}

export const TextBand = (props: TextBandProps) => {
  const scene = props.scene;
  const radius = props.radius || 26;

  const children = useMemo(() => {
    const chars = props.text.split('');
    return chars.map((x, i) => {
      const transform = `rotateY(${(i * (360 / chars.length)).toFixed(2)}deg) translateZ(${radius}px)`;
      return (
        <span
          key={i}
          className={tspan}
          style={{ transform }}
        >
          {x}
        </span>
      );
    });
  }, [props.text]);

  const circle = useMemo(() => {
    return scene.addCircle({
      position: [props.cx, props.cy],
      radius: props.radius + 2,
    });
  }, [scene]);

  const transform = useComputed(() => {
    // Limit to +/- 45 for readability
    const deg = Math.max(-45, Math.min(45, circle.angle.value / Math.PI * 180));
    const x = circle.x.value - radius;
    const y = circle.y.value - radius;
    return `
      transform: translate(${x}px, ${y}px) rotate(${deg}deg);
      transform-style: preserve-3d;
      transform-origin: ${radius}px ${radius}px;
    `;
  });

  return (
    <foreignObject width={radius * 2} height={radius * 2} className={group} style={transform}>
      <div className={animate}>
        {children}
      </div>
    </foreignObject>
  );
};
