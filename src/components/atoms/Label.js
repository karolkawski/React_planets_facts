export function Label(props) {
    const {size} = props;
    
    return (
        <p className={size} >{props.text}</p>
    )
  }