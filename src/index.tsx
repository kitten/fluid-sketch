import './main.css';

import { render } from 'preact';
import { Canvas } from './components/Canvas';
import { Backdrop } from './components/Backdrop';

const Main = () => (
  <>
    <Backdrop />
    <Canvas />
  </>
);

const root = document.getElementById('root')!;

root.addEventListener('click', async () => {
  try {
    await root.requestFullscreen();
    await screen.orientation.lock('portrait');
  } catch (error) {
    console.error(error);
  }
});

render(<Main />, root);
