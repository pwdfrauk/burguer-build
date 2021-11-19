import classes from './button.module.css'
const button =(props)=> (
    <button onClick={props.clicked} className={[classes.Button, classes[props.btnType]].join(' ')}>
        {props.children}
    </button>
)   