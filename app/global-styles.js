import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:900|Playfair+Display:400italic);
html {
  background-color: #f9f9f9;
}

body {
  margin: 0;
  overflow-x: hidden;
}
body ::-moz-selection {
  background: rgba(255, 255, 255, 0.3);
}
body ::selection {
  background: rgba(255, 255, 255, 0.3);
}

.app {
  background-color: #f9f9f9;
}

.container {
  position: fixed;
  width: 100%;
}

.card-plane {
  position: absolute;
  width: 182.85714px;
  height: 320px;
  margin: 50px calc(50vw -  91.42857px);
}
.card-plane .card-face {
  width: 100%;
  height: 100%;
  position: absolute;
}
.card-plane .card-face.front {
  background-color: #240f1f;
  color: white;
  font-style: italic;
  font-family: 'Playfair Display', Serif;
}
.card-plane .card-face.front .title {
  font-size: 21px;
  padding: 22px 22px;
}
.card-plane .card-face.front .title hr {
  border-style: solid;
  margin: 7px 0;
  color: inherit;
}
.card-plane .card-face.front .scroll {
  position: absolute;
  text-align: center;
  width: 100%;
  color: #7D7D7D;
  bottom: -30px;
  font-size: 12px;
}
.card-plane .card-face.back {
  /* reversed for the back of the card */
  width: 320px;
  height: 182.85714px;
  -webkit-transform: rotateZ(90deg) rotateX(180deg) translate3d(68.57143px, -68.57143px, 0px);
          transform: rotateZ(90deg) rotateX(180deg) translate3d(68.57143px, -68.57143px, 0px);
}

.arrow {
  font-size: 24px;
  font-family: 'Times New Roman', serif;
  position: fixed;
  text-align: center;
  width: 100%;
  top: 320px;
}

#links {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 9vmin;
  padding: 4vmin;
  font-weight: 900;
  width: 100vmin;
  margin: auto;
  position: relative;
}
#links .line {
  line-height: 7.5vmin;
  margin-bottom: 2.5vmin;
}
#links .line:nth-of-type(5n+1) {
  color: #FD556F;
}
#links .line:nth-of-type(5n+2) {
  color: #EDC919;
}
#links .line:nth-of-type(5n+3) {
  color: #76919A;
}
#links .line:nth-of-type(5n+4) {
  color: #257A97;
}
#links .line:nth-of-type(5n+5) {
  color: #7A486E;
}
#links a {
  border-bottom: 0.7vmin solid white;
  margin-bottom: -0.7vmin;
  padding-bottom: 0.6vmin;
  text-decoration: none;
  display: inline-block;
  color: inherit;
  border-color: inherit;
  -webkit-transition: color 500ms ease-out, border-color 500ms ease-out;
  transition: color 500ms ease-out, border-color 500ms ease-out;
}
#links a:hover {
  color: #bbb;
  border-color: #bbb;
}
`;
