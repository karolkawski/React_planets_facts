// import {Button} from '../atoms/Button';
import { connect } from 'react-redux';

export function MenuItem({id, name, selected, onInfoSelect}) {


    return (
        <div className={selected === id ? 'Menu__Tab Menu__Tab--Active' : 'Menu__Tab'}>
            <button name={name} onClick={e => {
                window.store.dispatch({type: 'CHANGE_INFO_ID', infoId: id});
                onInfoSelect(id)
                }}>{name}</button>
        </div>
    )
    
  }
  const mapStateToProps = (state) => {
    return {
      planets: state.planets,
      planetId: state.planetId,
      infoId: state.infoId
    };
  };


export default connect(mapStateToProps, {})(MenuItem);