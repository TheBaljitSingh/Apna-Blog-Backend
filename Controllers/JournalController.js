const mongoose = require("mongoose");

const post = require("../models/postsModel");


exports.getAllBlogs = async (req, res) => {
  try {
    console.log(req.url);
    const page = parseInt(req.query.page) || 1; // Current page
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const skip = (page - 1) * limit; // Number of items to skip

    // Fetch paginated blogs, sorted by latest first
    const blogs = await post.find()
      .sort({ createdAt: -1 }) // Sort by 'createdAt' in descending order
      .skip(skip)
      .limit(limit);
      
    const totalBlogs = await post.countDocuments();

    res.json({
      blogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getSingleBlog = async (req, res) => {
    try {
      const { blogId } = req.params; // Get slug from route parameters
      console.log(blogId);
      const posts = await post.findById(blogId); // Find post by slug
  
      if (!posts) {
        return res.status(404).json({
          success: false,
          error: 'Blog post not found',
        });
      }
  
      res.status(200).json({
        success: true,
        posts,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        success: false,
        error: 'Server error while fetching the blog post',
      });
    }
  };
  



exports.Journal= async (req, res) =>{

    try{
        
            // const filter = {display: public};
            const allData = await post.find({display: "public"})

            return res.json(allData, );

    }
    catch (error){
        
        console.log(error.message);

    }
};

exports.userJournal = async (req, res) =>{
    try{
        // console.log("printing koun sa use hai "+req.authUser);
        const {user} = req; 

        console.log("user Journal wala user"+user.name);
        // console.log(`user id is ${user.id}`);
        // console.log(_id);


        // const allUserData =   await post.find({author: user}).populate('author')
        const allUserData = await post.find({author: user.id})

        console.log(`ye 0 hona chiyea = ${allUserData.length}`)

        if(allUserData.length!=0){
            console.log(`user ka data ${allUserData}`);
            res.status(200).json({
                success: true,
                user,
                allUserData,
              });
        }else{
            res.status(201).json({
                success:true,
                user,
            })
        }
        


       

    }
    catch(error){
        console.log(error.message);

    }
}

exports.searchBlog = async (req, res)=>{
  const query = req.query.q;

  if (!query) {
      return res.status(400).json({ message: 'No search query provided' });
  }

  try {
      const results = await post.find({
          $or: [
              { title: new RegExp(query, 'i') }, // Case-insensitive search in title
              { 'content.content': new RegExp(query, 'i') }, // Search in content blocks
              { 'content.items': new RegExp(query, 'i') }, // Search in list items
          ]
      }).populate('author', 'name'); // Adjust population as necessary

      if (results.length > 0) {
          res.json(results);
      } else {
          res.status(404).json({ message: 'No blogs found matching your query' });
      }
  } catch (error) {
      console.error('Error searching blogs:', error);
      res.status(500).json({ message: 'Server error' });
  }
}


