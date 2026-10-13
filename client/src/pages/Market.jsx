import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import API from "../services/api";





function Market(){


    const navigate = useNavigate();


    const [stocks,setStocks]=useState([]);

    const [search,setSearch]=useState("");

    const [loading,setLoading]=useState(true);







    const loadStocks=async()=>{


        try{


            const response =
            await API.get(
                "/market/popular"
            );


            setStocks(
                response.data.stocks || []
            );


        }

        catch(error){

            console.log(error);

        }

        finally{

            setLoading(false);

        }


    };








    const searchStocks=async()=>{


        if(!search)
        {

            loadStocks();

            return;

        }



        try{


            const response =

            await API.get(

                `/market/search/${search}`

            );



            setStocks(

                response.data.stocks || []

            );


        }

        catch(error){

            console.log(error);

        }


    };








    useEffect(()=>{


        loadStocks();


    },[]);









    return(


        <DashboardLayout>


            <h1

            style={{

                fontSize:"34px",

                marginBottom:"10px"

            }}

            >

                Market

            </h1>





            <p

            style={{

                color:"#94A3B8",

                marginBottom:"25px"

            }}

            >

                Explore live market stocks.

            </p>








            <div

            style={{

                display:"flex",

                gap:"15px",

                marginBottom:"30px"

            }}

            >



                <input

                placeholder="Search stocks..."

                value={search}

                onChange={(e)=>

                    setSearch(e.target.value)

                }

                style={{

                    flex:1,

                    padding:"15px",

                    borderRadius:"12px",

                    background:"#111827",

                    border:

                    "1px solid #1E293B",

                    color:"white"

                }}

                />




                <button

                onClick={searchStocks}

                style={{

                    padding:"15px 25px",

                    borderRadius:"12px",

                    background:"#2563EB",

                    color:"white",

                    border:"none"

                }}

                >

                    Search

                </button>



            </div>









            {

            loading ?


            (

                <h3>
                    Loading stocks...
                </h3>

            )


            :


            <div

            style={{

                display:"grid",

                gridTemplateColumns:

                "repeat(3,1fr)",

                gap:"20px"

            }}

            >




            {

            stocks.map(stock=>(


                <div

                key={stock.symbol}

                onClick={()=>


                    navigate(

                        `/stock/${

                        stock.symbol

                        }`

                    )


                }

                style={{

                    background:"#111827",

                    padding:"25px",

                    borderRadius:"18px",

                    border:

                    "1px solid #1E293B",

                    cursor:"pointer"

                }}

                >



                    <h2>
                        {stock.symbol}
                    </h2>



                    <p

                    style={{

                        color:"#94A3B8"

                    }}

                    >

                        {stock.name}

                    </p>





                    {

                    stock.price &&


                    <h3>

                        ₹{stock.price}

                    </h3>


                    }





                </div>


            ))

            }




            </div>


            }





        </DashboardLayout>


    );


}



export default Market;