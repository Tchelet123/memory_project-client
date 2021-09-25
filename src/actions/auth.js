import * as api from '../api/index.js';
import {AUTH,LOGOUT} from '../constants/actionTypes.js';

export const signin=(formData,history)=>async(dispatch)=>{
    try {
        const { data }=await api.signIn(formData);

        dispatch({type:AUTH, data }) ;
        history.push('/')
    } catch (error) {
        console.error(error);
    }

}
export const signup=(formData,history)=>async(dispatch)=>{
    try {
        const { data }=await api.signUp(formData);

        dispatch({type:AUTH, data }) ;
        history.push('/')
    } catch (error) {
        console.log("from here came the problem");
        console.error(error);
    }

}