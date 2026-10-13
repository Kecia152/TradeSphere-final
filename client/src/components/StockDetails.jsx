import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import StockChart from "../components/StockChart";
import CandleChart from "../components/CandleChart";

import API from "../services/api";

import {
    Building2
} from "lucide-react";





function StockDetails(){


const {symbol}=useParams();


const [stock,setStock]=useState(null);

const [quantity,setQuantity]=useState(1);








const fetchStock=async()=>{


try{


const response = await API.get(

`/market/price/${symbol}`

);



setStock(

response.data.stock

);



}

catch(error){

console.log(error);

}



};






useEffect(()=>{


fetchStock();


},[]);









const transaction=async(type)=>{


try{


const token =
localStorage.getItem("token");



await API.post(

"/transactions",

{

symbol:stock.symbol,

companyName:stock.symbol,

type,

quantity:Number(quantity),

price:Number(stock.price)

},


{

headers:{

Authorization:

`Bearer ${token}`

}

}

);



alert(

`${type} successful`

);



}

catch(error){


console.log(error);

alert(

"Transaction failed"

);


}


};









if(!stock)

return(

<DashboardLayout>

<h2>
Loading...
</h2>

</DashboardLayout>

);










return(


<DashboardLayout>




<h1

style={{

fontSize:"38px",

display:"flex",

alignItems:"center",

gap:"12px"

}}

>

<Building2/>

{stock.symbol}

</h1>





<p

style={{

color:"#94A3B8"

}}

>

Live stock information

</p>








<div

style={{

display:"grid",

gridTemplateColumns:

"repeat(3,1fr)",

gap:"20px",

marginTop:"30px"

}}

>


<Card

title="Current Price"

value={`₹${stock.price}`}

/>



<Card

title="Change"

value={stock.percent}

/>



<Card

title="Quantity"

value={quantity}

/>



</div>










<div

style={{

background:"#111827",

borderRadius:"20px",

padding:"30px",

marginTop:"30px"

}}

>


<h2>

Price Chart

</h2>



<StockChart

symbol={stock.symbol}

/>


<CandleChart

symbol={stock.symbol}

/>



</div>










<div

style={{

display:"flex",

gap:"15px",

marginTop:"30px"

}}

>


<input

type="number"

min="1"

value={quantity}

onChange={(e)=>

setQuantity(e.target.value)

}

style={{

width:"100px",

padding:"12px",

background:"#111827",

color:"white",

borderRadius:"10px",

border:"1px solid #334155"

}}

/>






<button

onClick={()=>transaction("BUY")}

style={{

background:"#22C55E",

color:"white",

padding:"15px 40px",

border:"none",

borderRadius:"12px"

}}

>

BUY

</button>






<button

onClick={()=>transaction("SELL")}

style={{

background:"#EF4444",

color:"white",

padding:"15px 40px",

border:"none",

borderRadius:"12px"

}}

>

SELL

</button>





</div>





</DashboardLayout>


);

}





function Card({title,value}){


return(

<div

style={{

background:"#111827",

padding:"25px",

borderRadius:"18px",

border:"1px solid #1E293B"

}}

>


<p

style={{

color:"#94A3B8"

}}

>

{title}

</p>


<h2>

{value}

</h2>


</div>

);


}



export default StockDetails;