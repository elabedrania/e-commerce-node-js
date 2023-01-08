const Product = require('../Models/productModel');
const User = require('../Models/UserModel');
const auth = require('../VTOKEN');
const router = require('express').Router();

//  add new product
router.post('/addProduct',(req, res) => {
    
        let product = new Product({...req.body })
        product.save()
        res.send({ msg: "success", data: product })
    
        res.send({ message: "This is an administrator's secure route, verify your information and try again " })
    

})



//get all products{} les produits lkoll
router.get('/allProducts',  (req, res) => {
    Product.find({}, (err, data) => {
        if (err) {
            res.send(err)
        }
        res.send(data)
    })
})


//Get Product by ID
router.get('/allProducts/:id',  (req, res) => {
    let id = req.params.id
    Product.findOne({ _id: id }, (err, data) => {
        if (err) {
            res.send(err)
        }
        res.send(data)
    })
})


//get admin products by AdminID

router.get('/allProductslist/:adminId', (req, res) => {
   
        let adminId = req.params.adminId
        Product.find({ userId: adminId }, (err, data) => {
            if (err) {
                res.send(err)
            }
            res.send(data)
        })
    
        res.send({ message: "This is an administrator's secure route, verify your information and try again " })
    

})

//Edit Product By ID
router.put('/edit/product/:id', async(req, res) => {
       
            let id = req.params.id
            await Product.findOneAndUpdate({ _id: id }, {...req.body }, function(err, result) {
                if (err) console.log(err)
            })
            Product.find({}, (err, data) => {
                res.send(data)
            })

        
    })
    //delete product


router.delete("/verif/database", (req, res) => {

    product.deleteOne({ verifiedEmail: false }, (err, data) => {
        if (err) console.log(err)
        else {
            res.send("deleted")
        }
    })
})
module.exports = router;