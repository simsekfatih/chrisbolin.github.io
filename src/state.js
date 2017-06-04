import Inferno from 'inferno';
import { limitUnit } from './utils';

const isMobile = () =>
  navigator.userAgent.match(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/);

const init = (state, setState) => {
  // backup for non-safari mobile browsers
  const handler = handleScroll.bind(null, state, setState);

  window.addEventListener('scroll', handler);
  window.addEventListener('resize', handler);
  window.addEventListener('touchmove', handler);
}

const handleScroll = function(state, setState){
  const x = limitUnit(window.scrollY / (
    window.innerHeight * (state.scrollLength - 1)
  ));
  setState({x});
  document.documentElement.style.backgroundColor = x < 0.5 ? null : "#240f1f";
}

export default (Component, domElement) => {
  let state = {
    x: 0,
    mounted: false,
    scrollLength: isMobile() ? 1.5 : 3,
  };
  const setState = (newState) => {
    Object.assign(state, newState);
    render();
  }
  const render = () =>
    Inferno.render(
      <Component state={state} setState={setState}/>,
      domElement
    );
  init(state, setState);
  render();
};
