import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <BrowserRouter basename={baseUrl}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
);

// registerServiceWorker();
