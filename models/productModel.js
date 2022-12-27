const mongoose=require ('mongoose')
var schema=mongoose.Schema
ProductSchema=new schema ({

userId:{type:String},
ProductName:{type:String},
ProductPrice:{type:String},
Quantity:{type:Number},
ProductPhoto:{type:String,required:false,default:""},
ProductDescription:{type:String},
DateAdd: { type: Date, required: false ,default:new Date().toDateString()}
})


var Product=mongoose.model('Products',ProductSchema)
module.exports = Product;
