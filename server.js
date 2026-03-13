const express=require("express")
const fs=require("fs")

const app=express()
app.use(express.json())

app.post("/save-score",(req,res)=>{

let scores=JSON.parse(fs.readFileSync("./database/scores.json"))
scores.push(req.body)

fs.writeFileSync("./database/scores.json",JSON.stringify(scores,null,2))

res.send("saved")

})

app.listen(3000,()=>{
console.log("Server running on port 3000")
})