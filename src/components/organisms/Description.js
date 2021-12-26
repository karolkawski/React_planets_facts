import {Label} from '../atoms/Label';
import data from '../../data/data.json';

export function Description({planetId, infoId}) {
    const currentPlanetData = data[planetId];
    let info = '';

    switch (infoId) {
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