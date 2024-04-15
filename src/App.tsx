import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import './base.styles.scss';
import { themeState } from './recoil/theme';
import BaseRoute from './routes/BaseRoute';

export default function App() {
  const dark = useRecoilValue(themeState);

  useEffect(() => {
    let html = document.querySelector('html');
    if (html) {
      html.dataset.theme = `theme-${dark ? 'dark' : 'light'}`;
    }
  }, [dark]);

  return (
    <div className="app__body">
      <BaseRoute />
    </div>
  );
}
