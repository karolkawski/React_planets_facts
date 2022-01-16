import {Menu} from '../organisms/Menu';
import { Preview } from '../organisms/Preview';
import {Description} from '../organisms/Description';
import {Details} from '../organisms/Details';
import { useEffect } from 'react';
export function Planet({planetId, infoId, onInfoSelect}) {

    useEffect(() => {
      document.querySelector('.scrollbar-container').classList.add('ps', 'ps--active-y');
    }, [])

    return (
        <>
            <Menu planetId={planetId} infoId={infoId} onInfoSelect={onInfoSelect}/>
            <Preview />
            <Description />
            <Details />
        </>

    )
  }