var axios = require('../apiService/connexion.js');

const relatedProduct =async (req,res) => {
  let id = req.params.id
  try {
      let response =await axios.get("/products/"+id+"/related")
      let relatedProductId=response.data
      let responses=await Promise.all(relatedProductId.map((id)=>axios.get("/products/"+id))
      )
      let relatedProduct=responses.map((response)=>response.data)
      res.send(relatedProduct)
  } catch (error) {
      console.log(error)
      res.send(error)
  }
}


const product = async (req,res)=>{
  let id = req.params.id
  try{
let prod= await axios.get("/products/"+id)


res.send(prod.data)
} catch (error) {
console.log(error)
res.send(error)
}

}

// const imageProduct= async (req,res)=>{
//   let id = req.params.id
//   try{
// let image= await axios.get("/products/"+id+"/images")


// res.send(image.data.result[0].photos[0].thumbnail_url)
// } catch (error) {
// console.log(error)
// res.send(error)
// }



const styleProduct =async (req,res) => {
  let id = req.params.id
  
  try {
      let response =await axios.get("/products/"+id+"/styles")
  
      res.send(response.data.results[0].photos[0].thumbnail_url)
  } catch (error) {
      console.log(error)
      res.send(error)
  }
}


const getReviews = async (req,res)=>{
  let id = req.params.id
  try{
let reviews= await axios.get("/reviews/meta?product_id="+id)
res.send(reviews.data)
} catch (error) {
console.log(error)
res.send(error)
}

}

module.exports = {relatedProduct,styleProduct,product,getReviews}