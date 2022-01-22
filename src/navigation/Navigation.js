import {useState} from 'react'
import iconHamburger from '../assets/icon-hamburger.svg'
import iconClose from '../assets/icon-close.svg'
import { v4 as uuidv4 } from 'uuid';
import {
  Link
} from "react-router-dom";

export function Navigation({planetId, onPlanetSelect}) {
  const planets = window.store.getState().planets.planets;
  const [isCollapsed, setCollapsed] = useState(true);

  const toggleMenu = () => {
    setCollapsed(!isCollapsed);
    }

    const checkIsMobie = () => {
      return Number.parseInt(window.innerWidth) < 768
    };


    return (
        <header className="App__Header">
        <nav className={isCollapsed ? 'Navigation' : 'Navigation Navigation--Collapsed'}>
          <div className="Navigation__Title">THE PLANNETS</div>
          <ul className="Navigation__Menu">
          <Link to="/solar-system" className="Navigation__Item Navigation__Item--Yellow Navigation__Item--Not-Selectable" onClick={() => {
            if(checkIsMobie()) {
               toggleMenu();
            }
          }} >Solar system 3D</Link>
            {
              Object.keys(planets).map((key) => {
                const data = planets[key];
                return <Link to="/" key={uuidv4()} className={Number.parseInt(key) === planetId ? "Navigation__Item Navigation__Item--Selected" : "Navigation__Item"} onClick={e => {
                  window.store.dispatch({type: 'CHANGE_PLANET_ID', planetId: Number.parseInt(key)})
                  onPlanetSelect(Number.parseInt(key));
                  if (!isCollapsed) {
                    toggleMenu();

                  }
                }}>
                    <div className={"Navigation__Dot Navigation__Dot--" + data.name.toLowerCase() }></div>
                    <p className="Navigation__Name">{data.name}</p>
                    <div className="Navigation__Chevron"></div>
                  </Link>
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