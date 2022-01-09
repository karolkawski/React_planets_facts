import {Menu} from '../organisms/Menu';
import { Preview } from '../organisms/Preview';
import {Description} from '../organisms/Description';
import {Details} from '../organisms/Details';

import data from '../../data/data.json'
export function Planet({planetId, infoId, onInfoSelect}) {
    const collection = {
        'OVERVIEW': {
            id: 0,
            name: 'overview'
        },
        'STRUCTURE': {
            id: 1,
            name: 'structure'
        },
        'SURFACE': {
            id: 2,
            name: 'surface'
        }
    }
    return (
        <>
            <Menu collection={collection} planetId={planetId} infoId={infoId} onInfoSelect={onInfoSelect}/>
            <Preview data={data} planetId={planetId} infoId={infoId}/>
            <Description data={data} planetId={planetId} infoId={infoId}/>
            <Details data={data} planetId={planetId} infoId={infoId}/>
        </>

    )
  }