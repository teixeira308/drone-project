import React, {useContext, useState} from 'react'
import {DroneContext} from '../store'

export default()=>{
    const idDrone = useFormInput("")
    const latitude = useFormInput("")
    const longitude = useFormInput("")
    const temperaturaAr = useFormInput("")
    const umidadeAr = useFormInput("")
    const ativarRastreamento = true
    // eslint-disable-next-line no-unused-vars
    const [state,dispatch] = useContext(DroneContext)

    const droneData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idDrone: idDrone.value, latitude: latitude.value, longitude: longitude.value
        , temperaturaAr: temperaturaAr.value, umidadeAr: umidadeAr.value })
    };

    const onSubmit = event =>{
        fetch('http://127.0.0.1:8080/drones', droneData)
        .then(response => response.json());
        event.preventDefault()
        dispatch({
            type: "ADD_DRONE",
            payload:{idDrone: idDrone.value, latitude: latitude.value, longitude:longitude.value, 
                temperaturaAr: temperaturaAr.value, umidadeAr: umidadeAr.value, ativarRastreamento:ativarRastreamento.value}
        })
    }

    return (
        <div id="drone-form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>ID Drone:</label>
                    <input {...idDrone} type="text" name="idDrone" placeholder="Id Drone" required autoFocus/>
                </div>
                <div className="form-group">
                    <label>Latitude:</label>
                    <input {...latitude} type="text" name="latitude" placeholder="Latitude" required />
                </div>
                <div className="form-group">
                    <label>Longitude:</label>
                    <input {...longitude} type="text" name="longitude" placeholder="Longitude" required />
                </div>
                <div className="form-group">
                    <label>Temperatura do Ar:</label>
                    <input {...temperaturaAr} type="text" name="temperaturaAr" placeholder="Temperatura do ar" required />
                </div>
                <div className="form-group">
                    <label>Umidade do Ar:</label>
                    <input {...umidadeAr} type="text" name="umidadeAr" placeholder="Umidade ar" required />
                </div>
                <div className="form-group">
                <label>Ativar rastreamento?</label>
                    <label>SIM</label>
                    <input type="radio" name="optionRastreamento" value="sim"/>
                    <label>NÃO</label>
                    <input type="radio" name="optionRastreamento" value="nao"/>
                    </div>
                <button>Enviar</button>
            </form>
        </div>
    )

}



function useFormInput(initialValue){
    const [value, setValue] = useState(initialValue)
    const handleChange = e =>{
        setValue(e.target.value)
    }
    return{
        value,
        onChange: handleChange
    }
}