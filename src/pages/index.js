import {Planet} from '../components/templates/Planet';

export function Index({planet, info}) {
    console.log(planet, info)
    return <Planet planet={planet} info={info}></Planet>
}