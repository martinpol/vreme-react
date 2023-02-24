import {useEffect, useState} from "react";
import CityTab from "./CityTab";

const View = () => {

    const [locations, setLocations] = useState([]);
    const [strings, setStrings] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(-1); //ID kraja
    const [meteoLink, setMeteoLink] = useState(null);

    useEffect(() => {
        getLocations();
        getStrings();
        console.log(strings);
    }, []);

    async function getLocations() {
        await fetch(('http://localhost:8000/locations'), {
        }).then((response) => response.json()).then
            (json => {
                setLocations(json);
            });
    }

    async function getStrings() {
        await fetch(('http://localhost:8000/strings'), {
        }).then((response) => response.json()).then
            (json => {
                //console.log(json);
                setStrings(json);
            });
    }

    return (
        <div className="container__app">
            { locations.length > 0 &&
                <div className="choose-location">
                    {locations.map(function (location) {
                        return (
                            <p className="city"><a key={location.city}
                                onClick={() => {setCurrentLocation(location.id); setMeteoLink(location.source);}}>{location.city}
                            </a></p>
                        )
                    })}
                </div>
            }

        {
            <CityTab city={currentLocation} source={meteoLink} strings={strings}/>
        }

        </div>
    )
}
export default View;