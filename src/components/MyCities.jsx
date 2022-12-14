import React from 'react'
import CityCard from "./CityCard"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import NavBar from './NavBar'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import myCitiesAction from '../redux/actions/myCitiesAction'
import axios from 'axios'
import { BASE_URL } from '../api/url'

export default function MyCities() {
    const filtrarCities = useSelector(store => store.myCitiesReducer.citiesFiltrados)
    const dispatch = useDispatch()
    const Swal = require('sweetalert2')
    const [addCity, setAddCity] = useState({
        "_id": "",
        "name": '',
        "continent": '',
        "photo": '',
        "population": '',
        "userId": '',

    })

    const readInput = (e) => {
        const value = e.target.value
        const prop = e.target.name
        setAddCity({
            ...addCity,
            [prop]: value
        })
    }

    useEffect(() => {
        dispatch(myCitiesAction.filtrarCities("636e63981471b35a5c064d4e"));
    }, []);
    console.log(filtrarCities)
    async function deleteCity(e) {
        dispatch(myCitiesAction.eliminarCities(e))
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'City Delete"',
            showConfirmButton: false,
            timer: 1500
          })
    

    }

    async function ValidateInfo(e) {
        e.preventDefault()
        await axios.put(`${BASE_URL}/api/cities/${addCity._id} `, { name: addCity.name, continent: addCity.continent, photo: addCity.photo, population: Number(addCity.population), userId: addCity.userId })
            .then(function (response){
                console.log(response.data)
                if(response.data.success){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'City Edit',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      window.location.reload()       

                }
                else{
                    Swal.fire({
                        title: 'Error!',
                        text: response.data.message.join("- - - - -"),
                        icon: 'error',
                        confirmButtonText: 'Cool'
                      })
                }
            })
            .catch(function (error) {
                console.log(error.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'The city was not edit',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
            })
        
    }
    return (
        <>
            <div className='image_back'>
            <div className='container'>
            <div className='container1'>
            <h1 className='h1_2'>Enter the City information</h1>
                <form action="">
                    <label htmlFor="">
                    </label>

                    <label className='.titulo' htmlFor="">Id</label>
                    <input className='input' name='_id' onChange={readInput} type="text" placeholder="_id" />

                    <label className='.titulo' htmlFor="">Name</label>
                    <input className='input' name='name' onChange={readInput} type="text" placeholder="Name" />

                    <label className='.titulo' htmlFor="">Continent</label>
                    <input className='input' name='continent' onChange={readInput} type="text" placeholder="Continent" />

                    <label className='.titulo' htmlFor="">Photo</label>
                    <input className='input' name='photo' onChange={readInput} type="text" placeholder="Photo" />

                    <label className='.titulo' htmlFor="">Population</label>
                    <input className='input' name='population' onChange={readInput} type="text" placeholder='Population' />

                    <label className='.titulo' htmlFor="">User Id</label>
                    <input className='input' name='userId' onChange={readInput} type="text" placeholder='UserAdmin' />

                    <div>
                        <button className='boton a send1' onClick={(e) => ValidateInfo(e)}>Edit City</button>
                    </div>
                </form>
            </div>
            <div> {filtrarCities.map((e, b, c) => (<>  <Link className='none' to={"/city/" + c[b]._id}><CityCard name={e.name} photo={e.photo} /></Link> <button name={e._id} onClick={e => deleteCity(e.target.name)} className='boton a send1'>Delete</button></>))} </div>
            </div>
            </div>
        </>
    )
}
