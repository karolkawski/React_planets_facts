import {Planet} from '../components/templates/Planet';

export function Index({planetId, infoId, onInfoSelect}) {
    return <Planet planetId={planetId} infoId={infoId} onInfoSelect={onInfoSelect}></Planet>
}