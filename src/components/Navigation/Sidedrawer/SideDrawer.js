import Logo from "../../Logo/Logo";
import NavigaitionItems from "../NavigationItems/NavigationItems";
import classes from "./sideDrawer.module.css";
import Backdrop from "../../Ui/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/auxiliary";
const SideDrawer = (props) => {
  let attachCalsses =[classes.SideDrawer, classes.Close]
  if(props.open) {
    attachCalsses =[classes.SideDrawer, classes.Open]
  }
  return (
    <Auxiliary>
      <Backdrop show={props.open} clicked={props.closeSideDrawer} />
      <div className={attachCalsses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigaitionItems />
        </nav>
      </div>
    </Auxiliary>
  );
};
export default SideDrawer;
