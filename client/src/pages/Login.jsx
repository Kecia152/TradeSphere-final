import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../services/supabase";

import useAuth from "../hooks/useAuth";

import {
  LogIn,
  Mail,
  Lock
} from "lucide-react";



function Login(){


const navigate = useNavigate();

const { login } = useAuth();



const [form,setForm]=useState({

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



await login({

email:form.email.trim().toLowerCase(),

password:form.password

});



navigate("/dashboard");



}

catch(error){


alert(

error.message ||

"Login failed"

);


}

finally{


setLoading(false);


}



};





const handleForgotPassword = async () => {

const email = form.email.trim().toLowerCase();


if(!email){

alert("Please enter your email address first.");

return;

}


try{

setLoading(true);


const { error } = await supabase.auth.resetPasswordForEmail(

email,

{

redirectTo:"http://localhost:5173/reset-password"

}

);


if(error){

throw error;

}


alert(

"If this email is registered, you will receive a password reset link."

);


}

catch(error){

alert(

error.message ||

"Unable to send password reset email."

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

alignItems:"center",

justifyContent:"center",

color:"white"

}}

>






<div

style={{

width:"420px",

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


Login to your investment dashboard


</p>









<form onSubmit={handleSubmit}>




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





<p

style={{

textAlign:"right",

marginTop:"-8px",

marginBottom:"5px"

}}

>

<button

type="button"

onClick={handleForgotPassword}

disabled={loading}

style={{

background:"none",

border:"none",

color:"#60A5FA",

cursor:"pointer",

fontSize:"14px"

}}

>

Forgot Password?

</button>

</p>









<button

disabled={loading}

style={{

width:"100%",

marginTop:"25px",

padding:"15px",

background:"#2563EB",

border:"none",

borderRadius:"12px",

color:"white",

fontSize:"16px",

fontWeight:"600",

cursor:"pointer",

display:"flex",

justifyContent:"center",

alignItems:"center",

gap:"10px"

}}

>


<LogIn size={18}/>

{

loading

?

"Logging in..."

:

"Login"

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


Don't have an account?


<Link

to="/signup"

style={{

color:"#60A5FA",

marginLeft:"6px"

}}

>


Signup


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



export default Login;