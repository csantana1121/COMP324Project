var startButton = document.getElementById('travel');
var dict = {};
startButton.onclick = function()  {   
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
      var json = JSON.parse(this.response)
      console.log(json['data'][0]['result_object']['photo']['images']['original']['url']);
    }
  });

  xhr.open("GET", "https://travel-advisor.p.rapidapi.com/locations/search?query=Chicago&lang=en_US&units=km");
  xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "3b2fd2f1dbmsh5e3cd57f3775ac7p1cada7jsn3b71280bf6c5");

  xhr.send(data);
};