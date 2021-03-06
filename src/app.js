import React from "react";
import styleSheet from "../style.css";

const fx = {
  limitUnit(x) {
    return (x < 0) ? 0 : (
      (x < 1) ? x : 1
    );
  },
  isMobile() {
    return navigator.userAgent.match(
      /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/
    );
  },
  enableMobileInteraction() {
    const ua = navigator.userAgent;
    return (ua.match(/Safari/) && !ua.match(/CriOS|Chrome/))
      || ua.match(/Android/);
  },
};

const ColorBar = ({x, width, left, color}) => {
  const height = fx.limitUnit(x) * 100;
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

class CardPlane extends React.Component {
  getStyle() {
    const x = this.props.x;
    const rotateX = 180  * (
      (x < 0.5) ? x : fx.limitUnit(x * 2 - 0.5)
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
  render() {
    const zFront = this.props.x < 0.5 ? 1 : 0;
    const zBack = !zFront;
    return (
      <div style={this.getStyle()} className='card-plane'>
        <CardFront x={this.props.x} mounted={this.props.mounted}/>
        <CardBack x={this.props.x}/>
      </div>
    )
  }
}

const Arrow = ({x}) => {
  const grey = Math.floor(255 * (1 - x));
  const transform = `translateY(${ 20 * x }px)`;
  const style = {
    transform,
    WebkitTransform: transform,
    color: `rgb(${grey},${grey},${grey})`,
    opacity: fx.limitUnit(10 * (0.9 - x)),
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

const A = ({children, href, sameWindow}) => (
	<a
		href={href}
		target={sameWindow ? '_self' : '_blank'}
		rel="noopener noreferrer"
	>
	  {children}
	</a>
);

const BackText = ({x}) => {
  // Text does not show until x < 0.7
  const progress = (x < 0.7) ? 0 : (x - 0.7)/0.3;
  const display = progress ? 'inherit' : 'none';
  const shaddowOpacity = fx.limitUnit((progress - 0.5)*2);
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
      <Line x={x} show={0.82}>wannabe polymath</Line>
      <Line x={x} show={0.85}>
        <A href="https://www.formidable.com">formidable</A>
        <Slash/>
        <A href="/offline/">offline</A>
      </Line>
      <Line x={x} show={0.87}>
				<A href="/skycoins/">skycoins</A>
        <Slash/>
        <A href="https://rookievagabonds.tumblr.com">travels</A>
      </Line>
      <Line x={x} show={0.90}>
				<A href="/tessellate/">tessellate</A>
        <Slash/>
				<A href="/words/">words</A>
      </Line>
      <Line x={x} show={0.93}>
				<A href="https://twitter.com/bolinchris">twitter</A>
				<Slash/>
				<A href="https://www.instagram.com/bolinchris">instagram</A>
      </Line>
      <Line x={x} show={0.96}>
        <A href="/enchiridion/">enchiridion</A>
        <Slash/>
				<A href="/about/" sameWindow>about</A>
       </Line>
    </div>
  );
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      mounted: false,
    };
    // longer scroll for desktop users
    this.scrollLength = (fx.isMobile() ? 1.5 : 3);
  }
  handleScroll(e) {
    const x = fx.limitUnit(window.scrollY / (
      window.innerHeight * (this.scrollLength - 1)
    ));
    this.setState({x});
    document.documentElement.style.backgroundColor = x < 0.5 ? null : "#240f1f";
  }

  handleLegacyScroll(e) {
    // handling for non-iOS mobile devices, until they allow painting while scrolling
    // this creates a non-interactive animation instead :/

    let x = this.state.x;
    const interval = 10; // update in ms
    const totalTime = 1000; // ms

    e.preventDefault();

    // don't queue up anything in the middle of animation
    if (x !== 1 && x !== 0) return;

    // 'scroll' up when at the bottom
    const increment = interval / totalTime * ((x === 1) ? -1 : 1);
    const intervalId = setInterval(() => {
      x = fx.limitUnit(x + increment);
      this.setState({x});
      if (x === 0 || x === 1) {
        clearInterval(intervalId);
      }
    }, interval);

  }
  componentDidMount() {
    this.container = document.getElementsByClassName('main');
    // backup for non-safari mobile browsers
    const handler = (fx.isMobile() && !fx.enableMobileInteraction()) ?
      this.handleLegacyScroll.bind(this) : this.handleScroll.bind(this);

    window.addEventListener('scroll', handler);
    window.addEventListener('resize', handler);
    window.addEventListener('touchmove', handler);

    this.setState({ mounted: true });
  }
  render() {
    const x = (this.state.x); // extra padding for slight scroll ups
    const planeX = fx.limitUnit(x);
    const appStyle = {
      height: this.state.mounted ? `${this.scrollLength * 100}vh` : 'auto'
    };
    return (
      <div className='app' style={appStyle}>
        <div className='container'>
          <CardPlane x={planeX} mounted={this.state.mounted}/>
          <Arrow x={x}/>
          <BackText x={x}/>
        </div>
      </div>
    );
  }
};
