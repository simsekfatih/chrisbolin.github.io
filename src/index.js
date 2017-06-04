import Inferno from 'inferno';

import App from './app';
import renderWithState from './state';

const appElement = document.getElementById('app');

const greeting = `
 /88
| 88
| 8888888   /888888  /88   /88
| 88__  88 /88__  88| 88  | 88
| 88  \\ 88| 88888888| 88  | 88
| 88  | 88| 88_____/| 88  | 88
| 88  | 88|  8888888|  8888888
|__/  |__/ \\_______/ \\____  88
                    /88  | 88
                   |  888888/
                    \\______/

bolin.chris@gmail.com

source: https://github.com/chrisbolin/chrisbolin.github.io
`;

if (appElement) {
  renderWithState(App, appElement);
  console.log(greeting);
} else {
  global.App = App;
}
