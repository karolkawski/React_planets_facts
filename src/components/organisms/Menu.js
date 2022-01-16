
import {MenuItem} from '../molecues/MenuItem';
import {menu} from '../../data/menu'
import store from '../../store/store'


export function Menu({ onInfoSelect}) {
    const nstore = store.getState().planets;

        return (
            <div className="Menu">
                <div className="Menu__Wrapper">
                {
                    Object.keys(menu).map((key) => {
                    const data = menu[key];
                    return <MenuItem key={data.id} 
                                    name={key} 
                                    id={data.id}
                                    selected={nstore.infoId}
                                    onInfoSelect={onInfoSelect}
                                    planetId={nstore.planetId}/>

                    })
                }
                </div>
            </div>
        )

  }