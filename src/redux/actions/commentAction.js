import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/url";
import axios from "axios";

let getComment = createAsyncThunk("getComment", async (data) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/comments?showId=${data}`)
        return {
            success: res.data.success,
            response: res.data.response,
            message: res.data.message
        }

    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            response: [],
            message: error.response.data
        }
    }
})
const postComment = createAsyncThunk("postComment", async (idCity) => {
    let url = `${BASE_URL}/api/comments`;
    let headers = { headers: { 'Authorization': `Bearer ${idCity.token}` } }
    try {
        const res = await axios.post(url,idCity.data , headers);
        return {
            success: true,
        };
    } catch (error) {
        console.log(error);
        return {
            error: true,
        };
    }
});
const deletComment = createAsyncThunk("deletComment", async (idCity) => {
    let url = `${BASE_URL}/api/comments/${idCity.id}`;
    let headers = { headers: { 'Authorization': `Bearer ${idCity.token}` } }
    try {
        const res = await axios.delete(url, headers);
        return {
            success: true,
        };
    } catch (error) {
        console.log(error);
        return {
            error: true,
        };
    }
});
const putComment = createAsyncThunk("putComment", async (idCity) => {
    let url = `${BASE_URL}/api/comments/${idCity.id}`;
    let headers = { headers: { 'Authorization': `Bearer ${idCity.token}` } }
    try {
        const res = await axios.put(url,{comment:idCity.comment} , headers);
        console.log(res, idCity.comment)
        return {
            success: true,
        };
    } catch (error) {
        console.log(error);
        return {
            error: true,
        };
    }
});
const commentAction = {
    getComment,
    postComment,
    deletComment,
    putComment
}

export default commentAction;
