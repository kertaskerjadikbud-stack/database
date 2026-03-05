var API="https://script.google.com/macros/s/AKfycbwU-RQ8ebbommpLCQ2xnnr2LmpSZggXKxHAszqDXuW7Wv7Owv3-L0v94-1rCiUwDI680A/exec";

if(localStorage.getItem("login")){
load();
}

function login(){

var u=document.getElementById("user").value;
var p=document.getElementById("pass").value;

fetch(API+"?action=login&username="+u+"&password="+p)
.then(res=>res.json())
.then(d=>{

if(d.status=="success"){

localStorage.setItem("login",true);
window.location="dashboard.html";

}else{

document.getElementById("msg").innerHTML="Login gagal";

}

})

}

function logout(){

localStorage.clear();
window.location="index.html";

}

function load(){

fetch(API+"?action=getdata")
.then(res=>res.json())
.then(data=>{

window.dataGlobal=data;

render(data);

})

}

function render(data){

var html="";

data.forEach(d=>{

html+=`

<tr>

<td>${d.id}</td>
<td>${d.nama}</td>
<td>${d.alamat}</td>
<td>${d.hasil}</td>
<td>${d.keterangan}</td>

<td>
<button onclick="hapus(${d.id})">Hapus</button>
</td>

</tr>

`;

})

document.getElementById("data").innerHTML=html;

}

function add(){

var nama=document.getElementById("nama").value;
var alamat=document.getElementById("alamat").value;
var ket=document.getElementById("ket").value;

fetch(API+
"?action=add"+
"&nama="+nama+
"&alamat="+alamat+
"&hasil="+hasil+
"&keterangan="+ket)

.then(()=>load())

}

function hapus(id){

fetch(API+"?action=delete&id="+id)
.then(()=>load())

}

function search(){

var q=document.getElementById("search").value.toLowerCase();

var hasil=dataGlobal.filter(d=>

d.nama.toLowerCase().includes(q) ||
d.alamat.toLowerCase().includes(q)

)

render(hasil)

}
