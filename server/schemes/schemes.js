const mongoose = require("mongoose");
const { Schema, model } = mongoose;



const ReviewsSchema = new Schema({
  name: { type: String, required: true, trim: true ,unique: false },
  password: { type: String, trim:true , required: true },
  disc: { type: String, required: true, trim: true ,unique: false },
  createdAt: { type: Date, default: Date.now },
});




const ReviewsModel = model('reviews', ReviewsSchema)
module.exports.ReviewsModel = ReviewsModel;



