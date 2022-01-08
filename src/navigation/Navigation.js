import {useState} from 'react'
import iconHamburger from '../assets/icon-hamburger.svg'
import iconClose from '../assets/icon-close.svg'
import { v4 as uuidv4 } from 'uuid';


export function Navigation({planetId, onPlanetSelect}) {
  const planets = window.store.getState().planets.planets;
  const [isCollapsed, setCollapsed] = useState(true);

  const toggleMenu = () => {
    setCollapsed(!isCollapsed);
    }


    return (
        <header className="App__Header">
        <nav className={isCollapsed ? 'Navigation' : 'Navigation Navigation--Collapsed'}>
          <div className="Navigation__Title">THE PLANNETS</div>
          <ul className="Navigation__Menu">
          <button className= "Navigation__Item Navigation__Item--Yellow">Solar system 3D</button>
            {
              //style to li
              Object.keys(planets).map((key) => {
                const data = planets[key];
                return <button key={uuidv4()} className={Number.parseInt(key) === planetId ? "Navigation__Item Navigation__Item--Selected" : "Navigation__Item"} onClick={e => {
                  window.store.dispatch({type: 'CHANGE_PLANET_ID', planetId: Number.parseInt(key)})
                  onPlanetSelect(Number.parseInt(key));
                  if (!isCollapsed) {
                    toggleMenu();

                  }
                }}>{data.name}</button>
              })
            }
          </ul>
          
          <button className="Navigation__Toggle" onClick={toggleMenu}>
            {
              isCollapsed ? <img src={iconHamburger} alt=""/> : <img src={iconClose} alt=""/>

            }
          </button>
        </nav>
      </header>
    )

}