export const planets = (state = [], action) => {
    console.log(action)
    switch (action.type) {
      case 'FETCH_PLANET_DETAILS':
          console.log(true)
        return [...action.planets];
      default:
        return state;
    }
  };