const postsSchema = require("../models/postsModel");
const userModel = require("../models/userModel");


exports.checkName = async (req, res, next) =>{
  try{
    // console.log("check name ka call aaya");
    const {authorId} = req.body;
    // console.log(authorId);

    // console.log("ye author :"+req.body.authorId);


    const data = await userModel.findById(authorId);

    const name = data.name;


    res.status(200).json({
      name,
    })


  }
  catch(e){
    console.log(e);
  }
}

exports.deletePost = async (req, res, next)=>{
  try{

    const {id} = req.body;
    // console.log(id);
    console.log("is post ko delete karna hai "+id);

    const deletedPost = await postsSchema.findByIdAndDelete(id);

    if(!deletedPost){
      res.status(404).json({
        message:"Server side error when try to delete this post"
      })
    }

    res.status(200).json({
      deletedPost,
    })

  } catch(e){
    console.log(e);
  }
}
exports.newPost = async (req, res, next) => {
  try {
    const { title, content, date, display } = req.body; // Extract content from request body
    const { _id } = req.user; // Extract user ID from req.user

    // Create the new post with the provided data
    const post = await postsSchema.create({
      title,
      content, // Use the structured content array
      date,
      display,
      author: _id, // Set the author to the user's ID
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: "Server error hai to save nahi hua",
    });
  }
};
