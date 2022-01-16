
import {DetailsRow} from '../molecues/DetailsRow';
import store from '../../store/store'
import { v4 as uuidv4 } from 'uuid';

export function Details() {
    let currentPlanetData = {'rotation': 0, 'revolution': 0, 'radius': 0, 'temperature': 0}

    const nstore = store.getState().planets;
    if (nstore.planets.length > 0) {
        currentPlanetData = nstore.planets[nstore.planetId]
    }

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
