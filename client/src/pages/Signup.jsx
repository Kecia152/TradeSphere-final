import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import supabase from "../services/supabase";

import {
  UserPlus,
  User,
  Mail,
  Lock
} from "lucide-react";



function Signup(){



const navigate = useNavigate();



const [form,setForm]=useState({

name:"",
email:"",
password:""

});



const [loading,setLoading]=useState(false);







const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const handleSubmit=async(e)=>{


e.preventDefault();



try{


setLoading(true);



const name = form.name.trim();

const email = form.email.trim().toLowerCase();

const password = form.password;



if(!name){

alert("Please enter your name.");

return;

}



if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){

alert("Please enter a valid email address.");

return;

}



if(password.length < 8){

alert("Password must be at least 8 characters.");

return;

}



const { error } = await supabase.auth.signUp({

email,

password,

options: {

data: {

name

}

}

});



if(error){

throw error;

}



alert(
"Please check your email and verify your account before logging in."
);


navigate("/login");



}

catch(error){


alert(

error.message ||

"Signup failed"

);


}

finally{


setLoading(false);


}



};








return(


<div

style={{

minHeight:"100vh",

background:"#020617",

display:"flex",

justifyContent:"center",

alignItems:"center",

color:"white"

}}

>




<div

style={{

width:"430px",

background:"#111827",

border:"1px solid #1E293B",

borderRadius:"22px",

padding:"40px"

}}

>





<h1

style={{

fontSize:"34px",

textAlign:"center"

}}

>


TradeSphere


</h1>




<p

style={{

textAlign:"center",

color:"#94A3B8",

marginBottom:"35px"

}}

>


Create your investment account


</p>









<form onSubmit={handleSubmit}>





<Input

icon={<User/>}

name="name"

type="text"

placeholder="Full Name"

value={form.name}

onChange={handleChange}

/>








<Input

icon={<Mail/>}

name="email"

type="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

/>









<Input

icon={<Lock/>}

name="password"

type="password"

placeholder="Password"

value={form.password}

onChange={handleChange}

/>








<button

disabled={loading}

style={{

width:"100%",

marginTop:"20px",

padding:"15px",

background:"#2563EB",

border:"none",

borderRadius:"12px",

color:"white",

fontWeight:"600",

fontSize:"16px",

cursor:"pointer",

display:"flex",

justifyContent:"center",

alignItems:"center",

gap:"10px"

}}

>


<UserPlus size={18}/>


{

loading

?

"Creating Account..."

:

"Create Account"

}


</button>






</form>







<p

style={{

textAlign:"center",

marginTop:"25px",

color:"#94A3B8"

}}

>


Already have an account?


<Link

to="/login"

style={{

color:"#60A5FA",

marginLeft:"6px"

}}

>

Login

</Link>


</p>






</div>





</div>


);


}









function Input({

icon,

name,

type,

placeholder,

value,

onChange

}){


return(


<div

style={{

display:"flex",

alignItems:"center",

background:"#0F172A",

border:"1px solid #1E293B",

borderRadius:"12px",

padding:"12px 15px",

marginBottom:"18px"

}}

>


<span

style={{

color:"#64748B"

}}

>

{icon}

</span>





<input

name={name}

type={type}

placeholder={placeholder}

value={value}

onChange={onChange}

style={{

flex:1,

marginLeft:"12px",

background:"transparent",

border:"none",

outline:"none",

color:"white",

fontSize:"15px"

}}

/>



</div>


);


}



export default Signup;