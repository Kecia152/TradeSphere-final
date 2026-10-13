import API from "./api";


export const addStock = async(stock)=>{

    const token = localStorage.getItem("token");


    const response = await API.post(

        "/stocks",

        stock,

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );


    return response.data;

};



export const deleteStock = async(id)=>{

    const token = localStorage.getItem("token");


    const response = await API.delete(

        `/stocks/${id}`,

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );


    return response.data;

};