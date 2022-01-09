
import {MenuItem} from '../molecues/MenuItem';

export function Menu({collection, planetId, infoId, onInfoSelect}) {
        return (
            <div className="Menu">
                {
                    Object.keys(collection).map((key) => {
                    const data = collection[key];
                    return <MenuItem key={data.id} 
                                    name={key} 
                                    id={data.id}
                                    selected={infoId}
                                    onInfoSelect={onInfoSelect}
                                    planetId={planetId}/>

                    })
                }
            </div>
        )

  }