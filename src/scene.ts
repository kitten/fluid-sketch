import { World, Body, Circle, Plane, Vec2 } from 'p2-es'
import { WIDTH, HEIGHT, PADDING } from './constants';
import { Signal, signal, batch } from '@preact/signals';
import devicemotion from '@ircam/devicemotion';

const permission$ = devicemotion.requestPermission();

export interface BodySignal {
  x: Signal<number>;
  y: Signal<number>;
  angle: Signal<number>;
  update(): void;
}

export type Scene = ReturnType<typeof makeScene>;

export function makeBodySignal(body: Body): BodySignal {
  const x = signal(body.interpolatedPosition[0]);
  const y = signal(body.interpolatedPosition[1]);
  const angle = signal(body.interpolatedAngle);
  return {
    x,
    y,
    angle,
    update() {
      x.value = body.interpolatedPosition[0];
      y.value = body.interpolatedPosition[1];
      angle.value = body.interpolatedAngle;
    },
  }
}

export function makeScene(speed: number) {
  const world = new World({
    gravity: [
      0 * speed,
      9 * speed
    ],
  });

  function addWall(position: Vec2, angle: number) {
    const body = new Body({
      type: Body.STATIC,
      mass: 0,
      position,
      angle,
    });
    body.addShape(new Plane());
    world.addBody(body);
  };

  addWall([0, 0], 0);
  addWall([0, 0], -Math.PI / 2);
  addWall([0, HEIGHT], Math.PI);
  addWall([WIDTH, 0], Math.PI / 2);

  const bodies: BodySignal[] = [];

  return {
    addCircle(opts: {
      position: [number, number],
      radius: number,
    }) {
      const body = new Body({
        angularVelocity: -0.15,
        angle: Math.random() * Math.PI,
        position: opts.position,
        mass: 5,
      });

      const shape = new Circle({
        radius: opts.radius + PADDING
      });

      body.addShape(shape);
      world.addBody(body);

      const bodySignal = makeBodySignal(body);
      bodies.push(bodySignal);
      return bodySignal;
    },

    registerAcceleration() {
      function onMotion(event: DeviceMotionEvent) {
        const vec = event.accelerationIncludingGravity;
        if (vec && vec.x != null && vec.y != null) {
          world.gravity[0] = vec.x * speed;
          world.gravity[1] = vec.y * speed;
        }
      }

      let ended = false;

      async function start() {
        const permission = await permission$;
        if (permission === 'granted') {
          devicemotion.addEventListener(onMotion);
        }
      }

      start();
      return () => {
        ended = true;
        devicemotion.removeEventListener(onMotion);
      };
    },

    render() {
      let lastTime = 0;
      let handle: null | number = requestAnimationFrame(animate);
      let running = true;

      function animate(time: DOMHighResTimeStamp) {
        if (!running) return;
        handle = requestAnimationFrame(animate);

        const delta = Math.min(1 / 10, lastTime ? (time - lastTime) / 1000 : 0);
        world.step(1 / 60, delta, 10);
        lastTime = time;

        batch(() => {
          for (const body of bodies) {
            body.update();
          }
        });
      }

      return () => {
        if (running) {
          if (handle) cancelAnimationFrame(handle);
          running = false;
        }
      };
    },
  };
}

export const scene = signal(makeScene());
