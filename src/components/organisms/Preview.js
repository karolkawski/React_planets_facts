
import store from '../../store/store'

export function Preview() {
    let url = '';
    let id = 0;
    let planetImages = [];


    const nstore = store.getState().planets;
    if (nstore.planets.length > 0) {
        const currentPlanetData = nstore.planets[nstore.planetId]
        planetImages = currentPlanetData.images;

        id = nstore.infoId

    switch (id) {
        case 0:
            url = planetImages.planet;
            break;
        case 1:
            url = planetImages.internal;
            break;
        case 2:
            url = planetImages.planet;
            break;
        default:
            url = planetImages.planet;

            break;

    }
}
    
        return (
            <div className="Preview">
                <figure className="Preview__Image Preview__Image--First">
                    <img src={url} alt=""/>

                </figure>
                {
                    id === 2 ?  <figure className="Preview__Image Preview__Image--Second"><img src={planetImages.geology}/></figure> : ``
                }
            </div>
        )

  }