import data from '../../data/data.json'

export function Preview({planetId, infoId}) {
    let url = '';

    const planetImages = data[planetId].images;

    switch (infoId) {
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
        return (
            <div className="Preview">
                <figure className="Preview__Image Preview__Image--First">
                    <img src={url} alt=""/>

                </figure>
                {
                    infoId === 2 ?  <figure className="Preview__Image Preview__Image--Second"><img src={planetImages.geology}/></figure> : ``
                }
            </div>
        )

  }