import './styles/main.scss';
import {useState} from 'react'
import  {Index} from './pages/index';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import data from './data/data.json'
import {Navigation} from './navigation/Navigation';


function App() {
  const [planetId, setPlanetId] = useState(0);
  const [infoId, setInfoId] =  useState(0);

  useEffect(() => {
    planetsFetch();
  }, [])

  const planetsFetch = () => {
    window.store.dispatch({type: 'FETCH_PLANET_DETAILS', planets: data, planetId: planetId, infoId: infoId})
  }

  return (
    <div className="App">
      <Navigation planet={planetId}/>
      <main className="App__Main">
          <Index planetId={planetId} infoId={infoId}/>
      </main>
    </div>
  );
}



const mapStateToProps = (state) => {
  return {
    planets: state.planets, // (1)
    planetId: state.planetId,
    infoId: state.infoId
  };
};

export default connect(mapStateToProps, {})(App);
