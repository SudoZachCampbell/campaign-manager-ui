import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Scrollbars } from 'react-custom-scrollbars-2';
import AutoSizer from 'react-virtualized-auto-sizer';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
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
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  content: {
    height: '50vh',
    overflowY: 'hidden',
  },
}));

interface SubMenuProps {
  tabs: {
    headers: string[];
    data: React.ReactNode[];
  };
}

export default function SubMenu(props: SubMenuProps) {
  const classes = useStyles();
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
            console.log(`Width: ${width}, Height: ${height}`);
            return (
              <Scrollbars style={{ width, height }}>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                  style={{ position: 'relative' }}
                >
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
                </SwipeableViews>
              </Scrollbars>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
}
