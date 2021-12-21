import './styles/main.scss';
import {useState} from 'react'
import  {Index} from './pages/index';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { planetsFetched } from './actions';
import data from './data/data.json'
import {Navigation} from './navigation/Navigation';

function App() {
  const [planetId, setPlanetId] = useState(0);
  const [infoId, setInfoId] =  useState(0);

  useEffect(() => {
    planetsFetched(data)
    return () => {
      
    }
  }, [0])

  return (
    <div className="App">
      <Navigation planet={planetId}/>
      <main className="App__Main">
          <Index planet={planetId} info={infoId}/>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    planets: state.planets, // (1)
  };
};
const mapDispatchToProps = { planetsFetched }; // (2)

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
