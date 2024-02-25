firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }else{
        document.getElementById("user").innerHTML = "Hello, "+user.email
    }
})

var fileText =document.querySelector(".fileText");
var uploadPercentage=document.querySelector(".uploadPercentage");
var progress =document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
function getFile(e){
    fileItem=e.target.files[0];
    fileName=fileItem.name;
    fileText.innerHTML=fileName;
}
function uploadImage(){
    let storageRef= firebase.storage().ref("image/"+fileName);
    let uploadTask=storageRef.put(fileItem);
    
    uploadTask.on("state_changed",(snapshot)=>{
        console.log(snapshot);
        percentVal=Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        console.log(percentVal);
        uploadPercentage.innerHTML=percentVal+"%";
        progress.style.width=percentVal+"%";
    },(error)=>{
        console.log("Error is ", error);
    },()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log("URL",url);
        })
    })
}

function logout(){
    firebase.auth().signOut()
}
