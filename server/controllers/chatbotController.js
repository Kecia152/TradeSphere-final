import dotenv from "dotenv";

dotenv.config();


import Groq from "groq-sdk";





const groq = new Groq({

    apiKey: process.env.GROQ_API_KEY

});








export const chatWithAI = async(req,res)=>{


try{


const {message}=req.body;




if(!message)

{

return res.status(400).json({

message:"Please enter a question"

});

}






const completion =

await groq.chat.completions.create({



messages:[


{

role:"system",

content:

"You are TradeSphere AI assistant. Help users with stock market concepts, portfolio analysis, investing education and financial information. Do not give guaranteed investment advice."

},


{

role:"user",

content:message

}



],



model:"llama-3.1-8b-instant",



});







res.json({


success:true,


reply:

completion.choices[0].message.content



});





}

catch(error){


console.log(error);



res.status(500).json({

success:false,

message:"AI service failed"

});


}



};