import React from 'react';
import clsx from 'clsx';
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemProps,
    ListItemText,
    Toolbar,
    Typography,
    Box,
    Backdrop
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        height: '10%',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundImage: (props: any) => `url(https://ddimagecollection.s3-eu-west-1.amazonaws.com/npc/${props.pageBanner})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 25%',
        backgroundSize: 'cover',
        backgroundColor: '#FFFFFF'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    backDrop: {
        justifyContent: 'left',
        background: 'rgba(255,255,255,0.6)'
    },
    title: {
        lineHeight: 'normal',
        color: '#000000'
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    menuIcon: {
        fontSize: '150%',
        color: '#000000'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function NavMenu(props) {
    const classes = useStyles(props);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="static"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Backdrop open={true} className={classes.backDrop} transitionDuration={0}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon className={classes.menuIcon} />
                        </IconButton>
                        <Typography className={classes.title} variant="h2" noWrap>
                            {props.pageName}
                        </Typography>
                    </Toolbar>
                </Backdrop>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                {/* 
                TODO: Added Recently Visited Pages (linked to user)
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}
                {/* <Divider /> */}
                <List>
                    <ListItemLink href='/players'>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary='Players' />
                    </ListItemLink>
                    <ListItemLink href='/npcs'>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary='Npcs' />
                    </ListItemLink>
                    <ListItemLink href='/monsters'>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary='Monsters' />
                    </ListItemLink>
                    <ListItemLink href='/places'>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary='Places' />
                    </ListItemLink>
                </List>
            </Drawer>
        </div >
    )
}

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}
