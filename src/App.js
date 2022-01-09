import './styles/main.scss';
import {useState} from 'react'
import  {Index} from './pages/index';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import data from './data/data.json'
import {Navigation} from './navigation/Navigation';

function App() {
  const [planets, setPlanets] = useState([])
  const [planetId, setPlanetId] = useState(0);
  const [infoId, setInfoId] =  useState(0);

  useEffect(() => {
    planetsFetch();
  }, [])

  const planetsFetch = () => {
    window.store.dispatch({type: 'FETCH_PLANET_DETAILS', planets: data, planetId: planetId, infoId: infoId})
    setPlanets(data)
  }

  const onPlanetSelect = (id) => {
    setPlanetId(id);
  }

  const onInfoSelect = (id) => {
    setInfoId(id)
  }

  return (
    <div className="App">
      <Navigation planetId={planetId} onPlanetSelect={onPlanetSelect}/>
      <main className="App__Main">
          <Index planetId={planetId} infoId={infoId} onInfoSelect={onInfoSelect}/>
      </main>
    </div>
  );
}



const mapStateToProps = (state) => {
  return {
    planets: state.planets,
    planetId: state.planetId,
    infoId: state.infoId,
    colors: state.colors
  };
};

export default connect(mapStateToProps, {})(App);
