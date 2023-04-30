import './main.css';

import { css } from 'goober';
import { render } from 'preact';
import { Canvas } from './components/Canvas';
import { Backdrop } from './components/Backdrop';

const container = css`
  height: 720px;
  border-radius: 50px;
  background: #000;
  position: relative;
  overflow: hidden;

  > * {
    position: absolute;
    inset: 0;
  }
`;

const Main = () => (
  <>
    <div class={container}>
      <Backdrop />
      <Canvas />
    </div>

    <p>
      This is a small concept design for the Find N2
      cover screen.
    </p>

    <p>
      The design features circles and reacts to the
      accelerometer/orientation sensors of the device.
      (Not fully functional in all browsers in this demo)
    </p>

    <p>
      The design features fluid/variable typography and
      to make it feel active and alive, and the motion
      it features intends to ground and connect it to the
      real world, and the device’s form factor.
    </p>
  </>
);

render(<Main />, document.getElementById('root')!);
