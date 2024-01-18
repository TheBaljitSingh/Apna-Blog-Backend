const postsSchema = require("../models/postsModel");
const userModel = require("../models/userModel");


exports.checkName = async (req, res, next) =>{
  try{
    const {author} = req.body;

    const data = await userModel.findById(author);

    const name = data.name;


    res.status(200).json({
      name,
    })


  }
  catch(e){
    console.log(e);
  }
}

exports.newPost = async (req, res, next) => {
  try {
    // console.log(req.body.date);
    

    const { title, description, date, display } = req.body;
    const {_id} = req.user;


    const post = await postsSchema.create({
      title,
      description,
      date,
      display,
      author:_id
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
