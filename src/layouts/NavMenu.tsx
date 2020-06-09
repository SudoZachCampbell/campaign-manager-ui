import React from 'react';
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
    Backdrop
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, Theme } from '@material-ui/core/styles';

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
        backgroundImage: (props: any) => `url(https://ddimagecollection.s3-eu-west-1.amazonaws.com/${props.pageBanner})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 25%',
        backgroundSize: 'cover',
        backgroundColor: '#FFFFFF'
    },
    backDrop: {
        justifyContent: 'left',
        background: 'rgba(255,255,255,0.6)'
    },
    title: {
        lineHeight: 'normal',
        color: '#000000'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
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
    list: {
        width: drawerWidth
    },
}));

export default function NavMenu(props) {
    const classes = useStyles(props);
    const [open, setOpen] = React.useState(false);

    const handleDrawer = (state: boolean) => {
        setOpen(state);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="static"
                className={classes.appBar}
            >
                <Backdrop open={true} className={classes.backDrop} transitionDuration={0}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => handleDrawer(true)}
                            edge="start"
                            className={classes.menuButton}
                        >
                            <MenuIcon className={classes.menuIcon} />
                        </IconButton>
                        <Typography className={classes.title} variant="h2" noWrap>
                            {props.pageName}
                        </Typography>
                    </Toolbar>
                </Backdrop>
            </AppBar>
            <TemporaryDrawer open={open} toggle={handleDrawer} />
        </div >
    )
}

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

function TemporaryDrawer(props: { open: boolean, toggle: Function }) {
    const classes = useStyles();
    console.log("Open State: ", props.open)

    const toggleDrawer = (toggleState: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        props.toggle(false);
    };

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={toggleDrawer(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItemLink href='/'>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItemLink>
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
        </div>
    );

    return (
        <Drawer anchor='left' open={props.open} onClose={toggleDrawer(false)}>
            {list()}
        </Drawer>
    );
}