import {Button} from '../atoms/Button';

export function MenuItem(props) {
    const {id, name, selected} = props;
    return (
        <div className={selected === id ? 'Menu__Tab Menu__Tab--Active' : 'Menu__Tab'}>
            <Button name={name}></Button>
        </div>
    )
  }