import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Myweather.css";

const api = {
    key: "3265874a2c77ae4a04bb96236a642d2f",
    base: "http://api.openweathermap.org/data/2.5/"
}


const Mainwhether = () => {



    const [city, setcity] = useState("");
    const [weather, setWeather] = useState({});
    const [celcius, setcelcius] = useState();

 


    const cel = (weather) => {

        const temp = weather.data.main.temp;
        const cel = (temp - 273.15).toFixed(2);
        return (cel);

    }


    const dateBuilder = (d) => {
        console.log(d);

        let months = ["january", "february", "march", "april", "may", "june", "jully", "august", "september", "october", "november", "december"];
        let days = ["sunday", "monday", "tuesday", "wednesday", "thrusday", "friday", "saturday"];
        console.log(d.getDate());
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;

    }

    const search = evt => {
        if (evt.key == "Enter") {
            axios.get(`${api.base}weather?q=${city}&APPID=${api.key}`, { origin: "cors" })
                .then((result) => {
                    console.log(result)
                    setWeather(result);

                })
                .catch((err) => {
                    console.log(err);
                })
            // setDate(new Date());
        }
    }
    return (
        <>
            <div className="app">

                <div className="main">
                    <div className="search-box">
                        <input type="text"
                            className="search-bar"
                            placeholder="Search"
                            onChange={(e) => { setcity(e.target.value) }}
                            value={city}
                            onKeyUp={search}
                        />
                    </div>
                    {
                        (typeof weather.data != "undefined") ? (
                       








                            <div class="container">
                                <div class="widget">
                                    <div class="details">
                                        <div class="temperature">{cel(weather)}°</div>
                                        <div class="summary">
                                            <p class="summaryText">{weather.data.name} , {weather.data.sys.country}</p>
                                        </div>

                                        {/* <div className="precipitation">{weather.data.sys.country}</div> */}

                                        <div class="precipitation">{dateBuilder(new Date())}</div>
                                        <div class="wind">{weather.data.wind.speed}</div>

                                    </div>
                                    <div class="pictoBackdrop"></div>
                                    <div class="pictoFrame"></div>
                                    <div class="pictoCloudBig"></div>
                                    <div class="pictoCloudFill"></div>
                                    <div class="pictoCloudSmall"></div>
                                    <div class="iconCloudBig"></div>
                                    <div class="iconCloudFill"></div>
                                    <div class="iconCloudSmall"></div>
                                </div>
                            </div>
                          
                        ) : ("")
                    }
                </div>
            </div>

        </>
    );
}
export default Mainwhether;