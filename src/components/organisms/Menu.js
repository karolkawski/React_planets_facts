
import {MenuItem} from '../molecues/MenuItem';

export function Menu(props) {
    const {collection, planetId, infoId} = props;
    console.log(planetId, infoId)
        return (
            <div className="Menu">
                {
                    Object.keys(collection).map((key) => {
                    const data = collection[key];
                    return <MenuItem key={data.id} 
                                    name={key} 
                                    id={data.id}
                                    selected={infoId}/>

                    })
                }
            </div>
        )

  }