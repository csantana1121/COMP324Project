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
    window.location.href = "results.html";
    console.log("pressed")
    const data = null;
};
// function Append(){
//     const xhr = new XMLHttpRequest();
//     xhr.withCredentials = false;

//     xhr.addEventListener("readystatechange", function () {
//     if (this.readyState === this.DONE) {
//       console.log(this.responseText);
//       var json = JSON.parse(this.response)
//       console.log(json['data'][0]['result_object']['photo']['images']['original']['url']);
//       var output = document.getElementById("output");
//       var $note ="<img src='https://media-cdn.tripadvisor.com/media/photo-o/1a/5b/4b/16/caption.jpg'>";
//       output.append($note);
//     //   output.append("<img src='https://media-cdn.tripadvisor.com/media/photo-o/1a/5b/4b/16/caption.jpg'>");
//     }
//   });

//   xhr.open("GET", "https://travel-advisor.p.rapidapi.com/locations/search?query=Chicago&lang=en_US&units=km");
//   xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
//   xhr.setRequestHeader("x-rapidapi-key", "3b2fd2f1dbmsh5e3cd57f3775ac7p1cada7jsn3b71280bf6c5");

//   xhr.send(data);
// }
