import './styles/main.scss';
import {useState} from 'react'
import  {Index} from './pages/index';
import  {Index3D} from './pages/3d';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import data from './data/data.json'
import {Navigation} from './navigation/Navigation';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [planets, setPlanets] = useState([])
  const [planetId, setPlanetId] = useState(0);
  const [infoId, setInfoId] =  useState(0);
  const [isSystem, setIsSystem] = useState(false)
  
  useEffect(() => {
    planetsFetch();
  }, [])

  useEffect(() => {
  }, [isSystem]);

  const planetsFetch = () => {
    window.store.dispatch({type: 'FETCH_PLANET_DETAILS', planets: data, planetId: planetId, infoId: infoId})
    setPlanets(data)
  }

  const onPlanetSelect = (id) => {
    setPlanetId(id);
  }

  const onViewChange = (isSystem) => {
    setIsSystem(isSystem)
  }

  const onInfoSelect = (id) => {
    setInfoId(id)
  }

  return (
    <div className="App">
      <Router>
      <Navigation planetId={planetId} onPlanetSelect={onPlanetSelect} onViewChange={onViewChange}/>
      <main className={isSystem ? "App__Main App__Main--System" : "App__Main"} >
        <Routes>
          <Route path="/" exact element={<Index onInfoSelect={onInfoSelect}/>}></Route>
          <Route path="/solar-system" exact element={<Index3D />}></Route>
        </Routes>
        </main>
      </Router>
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
