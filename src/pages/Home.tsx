import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface HomeProps {
  setPageName: (name: string) => void;
}

export default function Home({ setPageName }: HomeProps) {
  useEffect(() => {
    setPageName('Home');
  });
  return (
    <Box>
      <Typography variant='h1' component='h2' gutterBottom>
        Hello, world!
      </Typography>
      <Typography variant='body1' gutterBottom>
        Welcome to your new single-page application, built with:
      </Typography>
      <ul>
        <li>
          <a href='https://get.asp.net/'>ASP.NET Core</a> and{' '}
          <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>
            C#
          </a>{' '}
          for cross-platform server-side code
        </li>
        <li>
          <a href='https://facebook.github.io/react/'>React</a> for client-side
          code
        </li>
        <li>
          <a href='http://getbootstrap.com/'>Bootstrap</a> for layout and
          styling
        </li>
      </ul>
      <Typography variant='body1' gutterBottom>
        To help you get started, we have also set up:
      </Typography>
      <ul>
        <li>
          <strong>Client-side navigation</strong>. For example, click{' '}
          <em>Counter</em> then <em>Back</em> to return here.
        </li>
        <li>
          <strong>Development server integration</strong>. In development mode,
          the development server from <code>create-react-app</code> runs in the
          background automatically, so your client-side resources are
          dynamically built on demand and the page refreshes when you modify any
          file.
        </li>
        <li>
          <strong>Efficient production builds</strong>. In production mode,
          development-time features are disabled, and your{' '}
          <code>dotnet publish</code> configuration produces minified,
          efficiently bundled JavaScript files.
        </li>
      </ul>
      <Typography variant='body1' gutterBottom>
        The <code>ClientApp</code> subdirectory is a standard React application
        based on the <code>create-react-app</code> template. If you open a
        command prompt in that directory, you can run <code>npm</code> commands
        such as <code>npm test</code> or <code>npm install</code>.
      </Typography>
    </Box>
  );
}
