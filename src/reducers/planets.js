const initialState = {
  planets: [],
  planetId: 0,
  infoId: 0
}

export const planets = (state = initialState, action) => {

    switch (action.type) {
      case 'FETCH_PLANET_DETAILS':
        return {...state, planets: [...action.planets]};
      case 'CHANGE_PLANET_ID':
        return {...state, planetId: action.planetId};
      case 'CHANGE_INFO_ID':
        return {...state, infoId: action.infoId};
      default:
        return state;
    }
  };