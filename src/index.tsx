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

render(<Main />, document.getElementById('root')!);
