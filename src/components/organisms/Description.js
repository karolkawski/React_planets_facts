import {Label} from '../atoms/Label';
import store from '../../store/store'

export function Description() {
    let currentPlanetData = {};
    let info = '';

    const nstore = store.getState().planets;
    if (nstore.planets.length > 0) {
        currentPlanetData = nstore.planets[nstore.planetId]

        switch (nstore.infoId) {
            case 0: //overview
                info = currentPlanetData.overview;
                break;
            case 1: //structure
                info = currentPlanetData.structure;
                break;
            case 2: //geology
                info = currentPlanetData.geology;
                break;
            default:
                info = currentPlanetData.overview
                break;
    
        }
    }else {
        info = currentPlanetData.overview
    }


        return (
            <div className="Description">
                <div className="Description__Title">
                    <Label text={currentPlanetData.name}/>
                </div>
                <div className="Description__Text">
                    <Label text={info.content}/>
                </div>
                <div className="Description__Source">
                    Source <a href={info.source}>Wikipedia</a>
                </div>
            </div>
        )

  }