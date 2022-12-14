import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/url";
import axios from "axios";

const getReaction = createAsyncThunk("getReaction", async (data) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/reactions?itineraryId=${data}`)
        return {
            success: res.data.success,
            response: res.data.data,
            message: res.data.message
        }
    
    }
    catch(error){
        console.log(error)
        return { 
            success: false,
            response: [],
            message: error.response.data
        }
    }
})

const postearReaction = createAsyncThunk("postearReaction", async (data) => {
    try {
        let headers = {headers: {'Authorization': `Bearer ${data.token}`}}
        const res = await axios.put(`${BASE_URL}/api/reactions?name=${data.name}&itineraryId=${data.itineraryId}`,null,headers )

        return {
            success: res.data.success,
            response: res.data.data,
            message: res.data.message
        }
    
    }
    catch(error){
        return { 
            success: false,
            response: [],
            message: error.response.data
        }
    }
})

const eliminarReaction = createAsyncThunk("eliminarReaction", async (data) => {
    try {
        let headers = {headers: {'Authorization': `Bearer ${data.token}`}}
        const res = await axios.put(`${BASE_URL}/api/reactions/${data._id}`,null,headers )
        console.log(res)
        return {
            success: res.data.success,
            response: res.data.data,
            message: res.data.message
        }
    
    }
    catch(error){
        return { 
            success: false,
            response: [],
            message: error.response.data
        }
    }
})

const getReactionUser = createAsyncThunk("getReactionUser", async (data) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/reactions?userId=${data}`)
        return {
            success: res.data.success,
            response: res.data.data,
            message: res.data.message
        }
    
    }
    catch(error){
        console.log(error)
        return { 
            success: false,
            response: [],
            message: error
        }
    }
})


const reactionAction = {
    getReaction,
    postearReaction,
    eliminarReaction,
    getReactionUser
}

export default reactionAction;