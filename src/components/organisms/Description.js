import {Label} from '../atoms/Label';
import data from '../../data/data.json';

export function Description({planet, info}) {
        const currentPlanetData = data[planet];

        return (
            <div className="Description">
                <div className="Description__Title">
                    <Label text={currentPlanetData.name}/>
                </div>
                <div className="Description__Text">
                    <Label text={currentPlanetData.overview.content}/>
                </div>
                <div className="Description__Source">
                    Source <a href={currentPlanetData.overview.source}>Wikipedia</a>
                </div>
            </div>
        )

  }