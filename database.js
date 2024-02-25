import {getDatabase, ref, child, get, set, update, remove} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
const db=getDatabase(app);
let name  =document.querySelector("#name");
let number  =document.querySelector("#number");
let startdate  =document.querySelector("#startdate");
let enddate  =document.querySelector("#enddate");

let Addbtn =document.querySelector("#Addbtn");
let Retbtn =document.querySelector("#Retbtn");
let Updbtn =document.querySelector("#Updbtn");
let Delbtn =document.querySelector("#Delbtn");
function AddData(){
    set(ref(db, 'person/'+ number.value),{
        nameofperson:{pname:name.value,startdate:startdate.value,enddate:enddate.value},
    }).then(()=>{
        alert("data added successfully");
    })
    .catch((error)=>{
        alert("unsuccessful");
        console.log(error);
    })
}
function Retdata(){
    const dbRef= ref(db);
    get(child(dbRef,'person/'+ number.value )).then((snapshot)=>{
        if(snapshot.exists()){
            name.value=snapshot.val().nameofperson.pname;
            startdate.value=snapshot.val().nameofperson.startdate;
            enddate.value=snapshot.val().nameofperson.enddate;
        }
    })
    .catch((error)=>{
        alert("unsuccessful");
        console.log(error);
    })
    function updatedata(){
        update(ref(db, 'person/'+ number.value),{
            nameofperson:{pname:name.value,startdate:startdate.value,enddate:enddate.value},
        }).then(()=>{
            alert("data updated successfully");
        })
        .catch((error)=>{
            alert("unsuccessful");
            console.log(error);
        })
    }
    function Deletedata(){
        remove(ref(db, 'person/'+ number.value))
        .then(()=>{
            alert("data updated successfully");
        })
        .catch((error)=>{
            alert("unsuccessful");
            console.log(error);
        })
    }
    Addbtn.addEventListener('click',AddData);
    Retbtn.addEventListener('click',Retdata);
    Updbtn.addEventListener('click',updatedata);
    Delbtn.addEventListener('click',Deletedata);
}