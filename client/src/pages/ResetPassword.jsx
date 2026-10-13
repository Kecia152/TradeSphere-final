import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import supabase from "../services/supabase";

import {
  Lock
} from "lucide-react";

function ResetPassword(){
const navigate = useNavigate();

const [password,setPassword]=useState("");
const [loading,setLoading]=useState(false);
const [sessionReady,setSessionReady]=useState(false);

useEffect(()=>{
let mounted = true;

const initializeRecovery = async () => {

  const {
    data: {
      session
    }
  } = await supabase.auth.getSession();

  if(session && mounted){
    setSessionReady(true);
  }
};

initializeRecovery();

const {
  data: {
    subscription
  }
} = supabase.auth.onAuthStateChange(
(event, session)=>{

  if(
    (event === "PASSWORD_RECOVERY" ||
     event === "SIGNED_IN") &&
    session
  ){
    if(mounted){
      setSessionReady(true);
    }
  }

});

return ()=>{
  mounted = false;
  subscription.unsubscribe();
};

},[]);

const handleSubmit=async(e)=>{
e.preventDefault();

if(password.length < 8){
alert("Password must be at least 8 characters.");
return;
}

try{
setLoading(true);

/*
  Check the CURRENT recovery session immediately
  before attempting to update the password.
*/
const {
  data: {
    session
  }
} = await supabase.auth.getSession();

if(!session){
alert(
"Your password reset link has expired or is no longer valid. Please request a new password reset link."
);
return;
}

const {
  error
} = await supabase.auth.updateUser({
  password: password
});

if(error){
throw error;
}

alert(
"Password updated successfully. Please login."
);

await supabase.auth.signOut();

navigate("/login");

}
catch(error){

console.error("Password reset error:", error);

alert(
error.message ||
"Password reset failed."
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
Create a new password
</p>

<form onSubmit={handleSubmit}>

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
<Lock/>
</span>

<input
type="password"
placeholder="New Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
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
fontSize:"16px",
fontWeight:"600",
cursor:"pointer"
}}
>
{
loading
?
"Updating..."
:
"Update Password"
}
</button>

</form>

</div>
</div>
);
}

export default ResetPassword;