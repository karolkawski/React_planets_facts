
import {DetailsRow} from '../molecues/DetailsRow';
import data from '../../data/data.json';
import { v4 as uuidv4 } from 'uuid';

export function Details({planetId, infoId}) {
    const currentPlanetData = data[planetId];
    const keys = Object.keys(currentPlanetData).filter((key) => {
        return ['rotation', 'revolution', 'radius', 'temperature'].includes(key)
    });


        return (
            <div className="Details">
                {keys.map((key) => {
                    const content = currentPlanetData[key];
                    return <DetailsRow key={uuidv4()} attribute={key} content={content}/>
                })}
            </div>
        )

  }
