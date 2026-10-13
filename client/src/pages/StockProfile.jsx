import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { useNavigate } from "react-router-dom";

import API from "../services/api";





function StockProfile(){


const [symbol,setSymbol]=useState("");

const [results,setResults]=useState([]);


const navigate=useNavigate();







const searchStock=async()=>{


try{


const response = await API.get(

    `/market/search/${symbol}`

);



setResults(

    response.data.stocks || []

);



}

catch(error){

console.log(error);

}



};









return(


<DashboardLayout>



<h1

style={{

fontSize:"34px"

}}

>

Stock Search

</h1>





<div

style={{

display:"flex",

gap:"15px",

marginTop:"25px"

}}

>


<input

placeholder="Search stock..."

value={symbol}

onChange={(e)=>

setSymbol(e.target.value)

}

style={{

flex:1,

padding:"15px",

background:"#111827",

border:"1px solid #334155",

borderRadius:"10px",

color:"white"

}}

/>





<button

onClick={searchStock}

style={{

background:"#2563EB",

color:"white",

padding:"15px 30px",

border:"none",

borderRadius:"10px"

}}

>

Search

</button>




</div>










<div

style={{

marginTop:"30px"

}}

>


{

results.map(stock=>(


<div

key={stock.symbol}

onClick={()=>


navigate(

`/stock/${stock.symbol}`

)


}

style={{

background:"#111827",

padding:"20px",

borderRadius:"15px",

marginBottom:"15px",

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



</div>



))

}



</div>





</DashboardLayout>


);


}



export default StockProfile;