const express = require('express');
const mongoose = require('mongoose')
const app = express()
const port = 3000

app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/1283", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.error("MongoDB Connection Error:", err.message));

const userschema={
    name:String,
    email:String,
    password:String
}
const usermodel=mongoose.model("user",userschema);

const productSchema = {
    name: String,
    price: Number,
    description: String
    }
    const productModel = mongoose.model("product", productSchema);

   

        app.get("/api" ,(req,res)=>{
            productModel.find().then((products)=>{
                res.json(products);
                }).catch((err)=>{
                    res.status(500).json({message:err.message});
                    });
        })
app.get("/api/products/:id",(req,res)=>{
            productModel.findById(req.params.id).then((product)=>{
                res.json(product);
                }).catch((err)=>{
                    res.status(500).json({message:err.message});
                    });
        })
        app.post("api/products", (req, res) => {
            try {
                if (!req.body.name || !req.body.price) {
                    return res.status(400).json({message: "Name and price are required"});
                }
                const product = new productModel({
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description || ""
                });
                product.save()
                    .then((savedProduct) => {
                        res.status(201).json(savedProduct);
                    })
                    .catch((err) => {
                        console.error("Database save error:", err);
                        res.status(500).json({message: "Failed to save product"});
                    });
            } catch (err) {
                console.error("Server error:", err);
                res.status(500).json({message: "Internal server error"});
            }
        })
app.put("/api/products/:id",(req,res)=>{
            productModel.findByIdAndUpdate(req.params.id,req.body).then((product)=>{
                res.json(product);
                }).catch((err)=>{
                    res.status(500).json({message:err.message});
                    });
        })
app.delete("/api/products/:id",(req,res)=>{
            productModel.findByIdAndRemove(req.params.id).then((product)=>{
                res.json(product);
                }).catch((err)=>{
                    res.status(500).json({message:err.message});
                    });
        })
app.listen(2000 , () => {
    console.log("Server is running on port 2000");
    });


        