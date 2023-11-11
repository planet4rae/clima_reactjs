import React, { useState } from "react";
import logo from "../assets/logo.png";
import busqueda from "../assets/busqueda.png"
import sun from "../assets/sun.png"
import cloud from "../assets/cloud.png"
import rain from "../assets/rain.png"
import storm from "../assets/storm.png"
import wind from "../assets/wind.png"
import snow from "../assets/snow.png"
import styled from "styled-components";
import axios from "axios";

const Navbar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #316496;
    gap: 30px;
    
    
`;

const MainLogo = styled.img`
    width: 110px;
    height: 110px;
`;

const Formulario = styled.input`
    width: 40%;
    padding: 20px 0;
    border: none;
    border-radius: 20px;
    font-size: 1.5em;
    text-align: center;
`;

const Busqueda = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    background-color: #316496;
`;
const Lupa = styled.img`
    width: 40px;
    height: 40px;
    
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 99vw;
    height: 100vh;
`;
    
const Containerwhite = styled.div`   
    width: 800px;
    height:700px;
    
    background-color: rgba(237,239,243, .8);
    border-radius: 30px;
`;

const Weather = styled.div`
    display: flex;
    justify-content:center;
`;

const IconoClima = styled.img`
    width: 300px;
    height: 300px;
`;

const Temperatura = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 600;
    font-size: 70px;
    color: #306497;
`;

const Ubicacion = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 25px;
    color: #306497;
`;

const Detalles = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 55px;
    color: #306497;
 `;

const Elemento = styled.div`
    display: flex;
    align-items: flex-start;
    margin: auto;
    gap: 10px;
`;

const Datos = styled.div`
    font-weight: 400;
    font-size: 30px;
    text-align: center;

`;
const IconoMini = styled.img`
    width: 100px;
    height: 100px;
`;
const PorcentajeHumedad = styled.div`
`;
const PorcentajeViento = styled.div`
`;
const Texto = styled.div`
    font-weight: 300;
    font-size: 20px;
`;
const Error = styled.p`
    color: red;
    font-size: 30px;
    font-weight: 400;
    text-align: center
`;

function Clima () {
    const [data, setData] = useState({
        celcius: '0',
        name: '',
        humidity: '0',
        speed: '0',
        image:sun
    })
    const [nombre, setNombre] = useState('');
    const [msjerror, setMsjerror] = useState('');
    

        const handleClick = () => {
            if(nombre !== "") {
                const API_URL =`https://api.openweathermap.org/data/2.5/weather?q=${nombre}&appid=e7da61707bcabca266fc9d980c56fb37&units=metric&lang=es`;
                axios.get(API_URL)
                .then(res => {
                    let imagePath = '';
                    if(res.data.weather[0].main == "Clouds"){
                        imagePath = cloud
                    } else if(res.data.weather[0].main == "Clear"){
                        imagePath = sun
                    } else if(res.data.weather[0].main == "Rain"){
                        imagePath = rain
                    } else if(res.data.weather[0].main == "Thunderstorm"){
                        imagePath = storm
                    } else if(res.data.weather[0].main == "Snow"){
                        imagePath = snow
                    } else {
                        imagePath = cloud
                    }
                    setData({...data, celcius: res.data.main.temp, name: res.data.name, 
                        humidity: res.data.main.humidity, speed: res.data.wind.speed, 
                        image: imagePath })
                        setMsjerror('');
                })
                .catch( error => {
                    if(error.response.status == 404){
                        setMsjerror("No encontramos ese lugar")
                    }else{
                        setMsjerror('');
                    }
                    console.log(error)
                });
            }            
        }

    return (    
        <div>
            
            <Navbar>
                <MainLogo src={logo} />
                <Formulario type="text" className="ciudad" placeholder='Buscar ubicación...' onChange={e => setNombre(e.target.value) }/>
                <Busqueda><Lupa src={busqueda} alt="botón de búsqueda" onClick={handleClick}/></Busqueda>
            </Navbar>
               
            <Container>
                <Containerwhite>
                <Error>
                    {msjerror}
                </Error>
                    <Weather><IconoClima src={data.image} alt=""/></Weather>
                    <Temperatura>{Math.round(data.celcius)} °C</Temperatura>
                    <Ubicacion>{data.name}</Ubicacion>
                    <Detalles>
                        <Elemento>
                            <IconoMini src={cloud} alt="Icono de Nubes"/>
                            <Datos>
                                <PorcentajeHumedad>{Math.round(data.humidity)}%</PorcentajeHumedad>
                                <Texto>Humedad</Texto>
                            </Datos>
                        </Elemento>

                        <Elemento>
                            <IconoMini src={wind} alt="Icono de Viento"/>
                            <Datos>
                                <PorcentajeViento>{Math.round(data.speed)} km/h</PorcentajeViento>
                                <Texto>Viento</Texto>
                            </Datos>
                        </Elemento>
                    </Detalles>
                </Containerwhite>
            </Container>
       </div>
    );
}

export default Clima;