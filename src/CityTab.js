import {useEffect, useState} from 'react';

const CityTab = (props) => {

    const [temperature, setTemperature] = useState([]);
    const [rain, setRain] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [pressure, setPressure] = useState([]);
    const [units, setUnits] = useState([]);
    const [indexes, setIndexes] = useState([1, 2 , 3]);

    useEffect(() => {

        async function getWeatherData() {
            console.log(props.source)
            await fetch((props.source), {
            }).then((response) => response.json()).then
                (json => {
                    setTemperature((json.hourly.temperature_2m).slice(0,4));
                    setRain((json.hourly.rain).slice(0,4));
                    setHumidity((json.hourly.relativehumidity_2m).slice(0,4));
                    setPressure((json.hourly.surface_pressure).slice(0,4));
                    setUnits((json.hourly_units));
                },
            );
        }

        getWeatherData();
    }, [props]);

    return (
        <div className="container--location">
            <div className="location">

                <div className="now">
                    <p className="title">TRENUTNE VREMENSKE RAZMERE</p>
                    <p className="time__now">Temperatura: {temperature[0]} {units["temperature_2m"]} </p>
                    <p className="time__1hour">Vlaga: {humidity[1]} {units["relativehumidity_2m"]}</p>
                    <p className="time__2hour">Dez: {rain[2]} {units["rain"]}</p>
                    <p className="time__3hour">Pritisk: {pressure[3]} {units["surface_pressure"]}</p>
                </div>

                <div className="forecast">
                    <p className="title">NAPOVED</p>
                    <div className="forecast__hours">
                    {
                    indexes.map( (index) => {
                        return (
                            <div className="forecast__hour">
                                <p className="title">Cez {index} uro</p>
                                <p className="time__now">Temperatura: {temperature[index]} {units["temperature_2m"]} </p>
                                <p className="time__1hour">Vlaga: {humidity[index]} {units["relativehumidity_2m"]}</p>
                                <p className="time__2hour">Dez: {rain[index]} {units["rain"]}</p>
                                <p className="time__3hour">Pritisk: {pressure[index]} {units["surface_pressure"]}</p>
                            </div>
                        )
                    })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CityTab;