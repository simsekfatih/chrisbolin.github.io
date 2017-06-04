import Inferno, { linkEvent } from 'inferno';
import styleSheet from "../style.css";
import { limitUnit } from './utils';

const ColorBar = ({x, width, left, color}) => {
  const height = limitUnit(x) * 100;
  return (
    <div style={{
      width,
      height: height + '%',
      backgroundColor: color,
      left,
      position: 'absolute',
      bottom: 0,
    }}/>
  );
}

const CardFront = ({x, mounted}) => {
  const zIndex = (x < 0.5) ? 1 : 0;
  if (!zIndex) return null;
  const scrollStyle = {
    opacity: (1 - 10 * x),
  };
  return (
    <div className='card-face front' style={{zIndex}}>
      <div className='title'>
        chris bolin
        <hr/>
      </div>
      <div className={`scroll ${mounted || 'hidden'}`} style={scrollStyle}>
        (scroll)
      </div>
      <ColorBar color="#EDC919" left="0%" width="20%" x={x*5.2}/>
      <ColorBar color="#76919A" left="20%" width="20%" x={x*4.7}/>
      <ColorBar color="#257A97" left="40%" width="20%" x={x*4.4}/>
      <ColorBar color="#7A486E" left="60%" width="20%" x={x*4}/>
      <ColorBar color="#FD556F" left="80%" width="20%" x={x*3.5}/>
    </div>
  );
}

const CardBack = ({x}) => {
  const zIndex = (x > 0.5) ? 1 : 0;
  const style = {
    zIndex,
    backgroundColor: '#240f1f',
  }

  if (!zIndex) return <div/>;
  return (
    <div className='card-face back' style={style}>
      <ColorBar color="#EDC919" width="10%" left="0%" x={2*(1-x)}/>
      <ColorBar color="#76919A" width="10%" left="10%" x={2.1*(1-x)}/>
      <ColorBar color="#257A97" width="10%" left="20%" x={2.2*(1-x)}/>
      <ColorBar color="#7A486E" width="10%" left="30%" x={2.3*(1-x)}/>
      <ColorBar color="#EDC919" width="10%" left="40%" x={2.4*(1-x)}/>
      <ColorBar color="#76919A" width="10%" left="50%" x={2.5*(1-x)}/>
      <ColorBar color="#257A97" width="10%" left="60%" x={2.6*(1-x)}/>
      <ColorBar color="#7A486E" width="10%" left="70%" x={2.7*(1-x)}/>
      <ColorBar color="#EDC919" width="10%" left="80%" x={2.8*(1-x)}/>
      <ColorBar color="#76919A" width="10%" left="90%" x={2.9*(1-x)}/>
    </div>
  );
}

const getStyle = ({x}) => {
  const rotateX = 180  * (
    (x < 0.5) ? x : limitUnit(x * 2 - 0.5)
  );
  const transform = `
    rotateZ(${90 * x}deg)
    rotateX(${rotateX}deg)
    translate3d(${-50 * x}px, 0, 0)
    scale(${1 + (x*x*x*x*10)})
  `;

  return {
    transform,
    WebkitTransform: transform,
  };
}
const CardPlane = (props) => {
  const zFront = props.x < 0.5 ? 1 : 0;
  const zBack = !zFront;
  return (
    <div style={getStyle(props)} className='card-plane'>
      <CardFront x={props.x} mounted={props.mounted}/>
      <CardBack x={props.x}/>
    </div>
  )
};

const Arrow = ({x}) => {
  const grey = Math.floor(255 * (1 - x));
  const transform = `translateY(${ 20 * x }px)`;
  const style = {
    transform,
    WebkitTransform: transform,
    color: `rgb(${grey},${grey},${grey})`,
    opacity: limitUnit(10 * (0.9 - x)),
  };
  return (
    <div className="arrow" style={style}>&darr;</div>
  );
};

const Line = ({children, x, show}) => (
  <div
    style={{
      opacity: (x > show) ? (x-show)/(1-show) : 0,
    }}
    className="line">
      {children}
  </div>
);

const Slash = props => <span>{' / '}</span>;

const A = ({children, href}) => <a href={href} target="_blank">
  {children}
</a>;

const BackText = ({x}) => {
  // Text does not show until x < 0.7
  const progress = (x < 0.7) ? 0 : (x - 0.7)/0.3;
  const display = progress ? 'inherit' : 'none';
  const shaddowOpacity = limitUnit((progress - 0.5)*2);
  const shaddowColor = `rgba(36,15,31,${shaddowOpacity})`;
  const textShadow = `
    ${shaddowColor} 0.5vmin 0 0,
    ${shaddowColor} 0.5vmin 0.5vmin 0,
    ${shaddowColor} 0.5vmin -0.5vmin 0,
    ${shaddowColor} -0.5vmin 0 0,
    ${shaddowColor} -0.5vmin 0.5vmin 0,
    ${shaddowColor} -0.5vmin -0.5vmin 0
  `;

  const style = {
    display,
    textShadow,
  };

  return (
    <div id="links" style={style}>
      <Line x={x} show={0.78}>chris bolin</Line>
      <Line x={x} show={0.83}>wannabe polymath</Line>
      <Line x={x} show={0.87}>
        <A href="https://www.formidable.com">formidable</A>
        <Slash/>
        <A href="https://rookievagabonds.tumblr.com">travels</A>
      </Line>
      <Line x={x} show={0.90}>
        <A href="/skycoins">skycoins</A>
        <Slash/>
        <A href="/tessellate">tessellate</A>
      </Line>
      <Line x={x} show={0.93}>
        <A href="https://codepen.io/chrisbolin">codepen</A>
        <Slash/>
        <A href="/enchiridion">enchiridion</A>
      </Line>
      <Line x={x} show={0.96}>
        <A href="https://twitter.com/bolinchris">twitter</A>
        <Slash/>
        <A href="https://www.instagram.com/bolinchris">instagram</A>
       </Line>
    </div>
  );
}

const App = function({ state, setState }) {
  const x = (state.x); // extra padding for slight scroll ups
  const planeX = limitUnit(x);
  const appStyle = {
    height: state.mounted ? `${state.scrollLength * 100}vh` : 'auto'
  };
  return (
    <div className='app' style={appStyle}>
      <div className='container'>
        <CardPlane x={planeX} mounted={state.mounted}/>
        <Arrow x={x}/>
        <BackText x={x}/>
      </div>
    </div>
  );
};

App.componentDidMount = ({ setState }) => {
  setState({
    mounted: true,
  });
};

export default function(props) {
  return (
    <App
      state={props.state}
      setState={props.setState}
      onComponentDidMount={() => App.componentDidMount(props)}
    />
  );
};
