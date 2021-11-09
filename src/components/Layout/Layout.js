import Auxiliary  from "../../hoc/auxiliary";
import classes from './Layout.module.css'
const Layout = (props)=> {
    return(
    <Auxiliary>
        <div>Toolbar, BackDrawer, BackDrop</div>
        <main className = {classes.Content}>
            {props.children}
        </main>
   </Auxiliary>
    )
}
export default Layout; 