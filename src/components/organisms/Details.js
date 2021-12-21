
import {DetailsRow} from '../molecues/DetailsRow';
import data from '../../data/data.json';

export function Details({planet, info}) {
    const currentPlanetData = data[planet];
    const keys = Object.keys(currentPlanetData).filter((key) => {
        return ['rotation', 'revolution', 'radius', 'temperature'].includes(key)
    });


        return (
            <div className="Details">
                {keys.map((key) => {
                    const content = currentPlanetData[key];
                    return <DetailsRow attribute={key} content={content}/>
                })}
            </div>
        )

  }
