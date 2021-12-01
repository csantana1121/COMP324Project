var submit = document.getElementById("submit");
submit.onclick = function()  {  
    var formdata = new FormData();
    var name = document.getElementById("name").value;
    console.log(name);
    var option = document.getElementsByName("recommed");
    for(var i = 0; i < option.length; i++) {
        if(option[i].checked)
        console.log(option[i].value);
    }
    window.location.href = "index.html";
    console.log("pressed")
};