var submit = document.getElementById("submit");
submit.onclick = function()  {  
    const db = firebase.database();
    var formdata = new FormData();
    var name = document.getElementById("name").value;
    var loc = document.getElementById("location").value;
    console.log(name);
    db.ref('results/q1').set(name);
    db.ref('results/q3').set(loc);
    var option = document.getElementsByName("recommed");
    // document.querySelector('meta[name="name"]').setAttribute("content",name)
    // document.querySelector('meta[name="name"]').content = name;
    // console.log(document.querySelector('meta[name="name"]').content)
    for(var i = 0; i < option.length; i++) {
        if(option[i].checked)
        console.log(option[i].value);
        db.ref('results/q2').set(option[i].value);
    }
    window.location.href = "results.html";

};