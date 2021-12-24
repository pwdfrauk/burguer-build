import classes from './button.module.css'
const Button =(props)=> (
    <Button onClick={props.clicked} className={[classes.Button, classes[props.btnType]].join(' ')}>
        {props.children}
    </Button>
)   
export default Button;