import WatchList from "../models/WatchList.js";

export const addWatchList = async (req, res) => {

try {

const {movieId} = req.body;

if(!movieId) {

return res.status(400).json({
message: "MovieId is missing"
})

}

const exists = await WatchList.findOne({
user: req.user._id,
movieId
})

if(exists) {

return res.status(400).json({
message: "Movie is already in watchList"
})

}

const watchList = await WatchList.create({

user: req.user._id,
movieId

})

res.status(201).json({
      success: true,
            watchList
})
    
} catch (error) {

  res.status(500).json({
            message: error.message
        });

}

}


export const getWatchList = async (req, res) => {

try {

const watchList = await WatchList.find({
user: req.user._id
})

res.status(200).json({

success: true,

count: watchList.length,

watchList
    
})
    
} catch (error) {

 res.status(500).json({

            message: error.message

        });

}

}


export const  deleteWatchList = async (req, res) => {

try {

const {movieId} = req.params;

const watchList = await WatchList.findOneAndDelete({
  user: req.user._id,

            movieId   
})

if (!watchList) {
return res.status(400).json({
   message: "Movie not found in WatchList"
})
}

res.status(201).json({
success: true,
message: "Removed from WatchList"
})
    
} catch (error) {

    res.status(500).json({

            message: error.message

        });
    
}

}