import { makeStyles } from '@material-ui/core/styles';

const DRAWER_WITH = 150;
const TOOLBAR_HEIGHT = 50;
const useStudentIndexStyles = makeStyles((theme) => ({
  drawerList: {
    width: DRAWER_WITH,
  },
  drawerHeader: {
    height: TOOLBAR_HEIGHT + theme.spacing(1) * 2 - 3,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    height: TOOLBAR_HEIGHT,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  toolbarText: {
    lineHeight: '48px',
  },
  contentContainer: {
    color: 'black',
    fontSize: '14px',
    flexGrow: 1,
    marginTop: 20,
  },
}));

export default useStudentIndexStyles;
