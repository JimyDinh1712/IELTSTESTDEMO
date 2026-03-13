function login(){

let user=document.getElementById("username").value
let pass=document.getElementById("password").value

if(user==="student" && pass==="1234"){
localStorage.setItem("user",user)
window.location="dashboard.html"
}
else{
document.getElementById("msg").innerText="Wrong login"
}

}

function submitTest(){

let score=0

if(document.getElementById("q1").value!=="") score++
if(document.getElementById("q2").value!=="") score++

document.getElementById("result").innerText="Score: "+score+"/2"

saveScore(score)

}

function saveScore(score){

let data={
user:localStorage.getItem("user"),
score:score,
date:new Date().toISOString()
}

fetch("/save-score",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
})

}