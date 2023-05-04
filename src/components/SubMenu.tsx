import React from 'react';
import { styled } from '@mui/material/styles';
import { Theme, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Scrollbars } from 'react-custom-scrollbars-2';
import AutoSizer from 'react-virtualized-auto-sizer';

const PREFIX = 'SubMenu';

const classes = {
  root: `${PREFIX}-root`,
  content: `${PREFIX}-content`,
};

const Root = styled('div')(({ theme }: { theme: Theme }) => ({
  [`& .${classes.root}`]: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },

  [`& .${classes.content}`]: {
    height: '50vh',
    overflowY: 'hidden',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Root
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Root>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

interface SubMenuProps {
  tabs: {
    headers: string[];
    data: React.ReactNode[];
  };
}

export default function SubMenu(props: SubMenuProps) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          {props.tabs.headers.map((header) => (
            <Tab label={header} {...a11yProps(0)} />
          ))}
        </Tabs>
      </AppBar>
      <div className={classes.content}>
        <AutoSizer>
          {({ width, height }) => {
            return (
              <Scrollbars style={{ width, height }}>
                {props.tabs.data.map((tab, index) => {
                  return (
                    <TabPanel
                      key={index}
                      value={value}
                      index={index}
                      dir={theme.direction}
                    >
                      {tab}
                    </TabPanel>
                  );
                })}
              </Scrollbars>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
}
