import {Menu} from '../organisms/Menu';
import { Preview } from '../organisms/Preview';
import {Description} from '../organisms/Description';
import {Details} from '../organisms/Details';

import data from '../../data/data.json'
export function Planet({planet, info}) {
    const collection = {
        'OVERVIEW': {
            id: 1,
            name: 'overview'
        },
        'STRUCTURE': {
            id: 2,
            name: 'structure'
        },
        'SURFACE': {
            id: 3,
            name: 'surface'
        }
    }
    return (
        <>
            <Menu collection={collection} selected={planet}/>
            <Preview data={data} planet={planet} info={info}/>
            <Description data={data} planet={planet} info={info}/>
            <Details data={data} planet={planet} info={info}/>
        </>

    )
  }