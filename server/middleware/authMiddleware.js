import supabase from "../config/supabase.js";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if(
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ){
      return res.status(401).json({
        message:"Authentication required"
      });
    }

    const token = authHeader.split(" ")[1];

    const {
      data: {
        user: supabaseUser
      },
      error
    } = await supabase.auth.getUser(token);

    if(error || !supabaseUser){
      return res.status(401).json({
        message:"Invalid or expired authentication token"
      });
    }

    /*
      Find the MongoDB user connected to
      this Supabase account.
    */

    let user = await User.findOne({
      supabaseId: supabaseUser.id
    });

    /*
      Existing MongoDB users created before
      Supabase migration won't have supabaseId.

      For those users, temporarily match by
      verified email and attach the Supabase ID.
    */

    if(!user){

      user = await User.findOne({
        email: supabaseUser.email?.toLowerCase()
      });

      if(user){

        user.supabaseId = supabaseUser.id;

        await user.save();

      }
    }

    /*
      New Supabase users won't exist in MongoDB yet.
      Create their MongoDB profile automatically.
    */

    if(!user){

      const name =
        supabaseUser.user_metadata?.name ||
        supabaseUser.email?.split("@")[0] ||
        "User";

      user = await User.create({
        supabaseId: supabaseUser.id,
        name,
        email: supabaseUser.email.toLowerCase()
      });

    }

    req.user = user;

    req.supabaseUser = supabaseUser;

    next();

  }
  catch(error){

    console.error(
      "Authentication middleware error:",
      error
    );

    return res.status(401).json({
      message:"Authentication failed"
    });

  }

};

export default authMiddleware;