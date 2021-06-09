import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import {
  Route, useHistory,
} from 'react-router-dom';
import StudentHome from './StudentHome';
import useStudentIndexStyles from '../../styles/studentComponentStyles/studentIndexStyle';
import ElevationScroll from '../shared/ElevationScroll';
import Exercise from './sExerciseComponents/Exercise';
import ExerciseHome from './sExerciseComponents/ExerciseHome';
import { STUDENT_LINKS } from '../../data/constants';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/loginActions';

export default function StudentIndex(props) {
  const classes = useStudentIndexStyles();
  const { match: { url, path } = {} } = props;
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDrawer = (isOpen) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(isOpen);
  };

  const handleMenuItemClicked = (linkData) => {
    const { label, path } = linkData;
    if (label === "Log out") {
      dispatch(logout());
      return;
    }
    history.push(`${url}/${path}`);
  }

  const drawerItemList = () => (
    <div
      className={classes.drawerList}
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
        {Object.values(STUDENT_LINKS).map((value) => (
          <ListItem button key={value.label} onClick={() => handleMenuItemClicked(value)}>
            <ListItemText primary={value.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.toolbarText} variant="h6" align="center">Hoc Tieng Anh app</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* put a Toolbar here to make sure the Container is below ElevationScroll */}
      <Toolbar />
      <Container className={classes.contentContainer}>
        <Route exact path={`${path}/home`} component={StudentHome} />
        <Route exact path={`${path}/exercise`} component={ExerciseHome} />
        <Route exact path={`${path}/difficulty/:difficultyLevel/exercise/:exerciseId`} component={Exercise} />
      </Container>
      <SwipeableDrawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {drawerItemList()}
      </SwipeableDrawer>

    </>
  );
}
