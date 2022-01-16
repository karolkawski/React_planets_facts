import { connect } from 'react-redux';
import { colors } from '../../data/colors';

export function MenuItem({id, name, selected, onInfoSelect, planetId}) {
  const activeClass = `Menu__Tab  Menu__Tab--Active Menu__Tab--${colors[Object.keys(colors)[planetId]].class}`;


    return (
        <div className={selected === id ? activeClass : 'Menu__Tab'}>
            <span className='Menu__No'>{'0' + (id + 1)}</span>
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