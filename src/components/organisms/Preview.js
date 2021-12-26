import data from '../../data/data.json'

export function Preview({planetId, infoId}) {
    let url = '';

    const planetImages = data[planetId].images;

    switch (infoId) {
        case 0:
            url = planetImages.planet;
            break;
        case 1:
            url = planetImages.interval;
            break;
        case 2:
            url = planetImages.geology;
            break;
        default:
            url = planetImages.planet;

            break;

    }
        return (
            <div className="Preview">
                <figure>
                    <img src={url} alt="Eartch"/>
                </figure>
            </div>
        )

  }