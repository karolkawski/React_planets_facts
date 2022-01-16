
import {MenuItem} from '../molecues/MenuItem';
import {menu} from '../../data/menu'


export function Menu({ planetId, infoId, onInfoSelect}) {
        return (
            <div className="Menu">
                <div className="Menu__Wrapper">
                {
                    Object.keys(menu).map((key) => {
                    const data = menu[key];
                    return <MenuItem key={data.id} 
                                    name={key} 
                                    id={data.id}
                                    selected={infoId}
                                    onInfoSelect={onInfoSelect}
                                    planetId={planetId}/>

                    })
                }
                </div>
            </div>
        )

  }