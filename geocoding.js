function Append(){
    const data = null;
    const db = firebase.database();
      db.ref('results/q1').once('value')
        .then((snapshot) => {
        // snapshot of the data - request the return value for the data at the time of query...
        const data = snapshot.val();
        console.log('single data = ', data);
        GeoCode(data,store);
        })
        .catch((e) => {
        console.log('error returned - ', e);
        });
    }
function GeoCode(location,store)  {   
    const data = null;
    const key = "AIzaSyBn3PMPpjblLpWGNw4GCq-cZoqb2SeYWc8";
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        var json = JSON.parse(this.responseText);
        console.log(json["results"][0]["geometry"]["location"]);
        geocode = json["results"][0]["geometry"]["location"];
        store(json["results"][0]["geometry"]["location"]);
        // console.log(this.responseText);
        // return this.responseText;
        
      }
    });
    url ="https://maps.googleapis.com/maps/api/geocode/json?address=" + location +"&key=" + key;
    xhr.open("GET", url);
    xhr.send(data);
  };
function store(list){
    var x = list["lat"]
    var y = list["lng"]
    console.log(x + " " + y);
    restaurants(x,y);
    attractions(x,y);
}
function restaurants(lat , lng){
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
      var json = JSON.parse(this.response)
      console.log(json['data'][0]['name']);
      var output = document.getElementById("output");
      var rest = "<div><p>" + json['data'][0]['name'] + "</p>"
      rest += "<p>" +json['data'][0]['rating'] +"</p>"
      rest += "<p>" + json['data'][0]['ranking'] + "</p></div>"
      const parser = new DOMParser();
    //   output.append(parser.parseFromString(query, 'text/html').firstChild);
      output.append(parser.parseFromString(rest, 'text/html').firstChild)
    }
  });

  xhr.open("GET", "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=" + lat + "&longitude=" + lng +"&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US");
  xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "3b2fd2f1dbmsh5e3cd57f3775ac7p1cada7jsn3b71280bf6c5");

  xhr.send(data);
}
function attractions(lat , lng){
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
      var json = JSON.parse(this.response)
      console.log(json['data'][0]['name']);
      var output = document.getElementById("output");
    //   var query = "<img src='";
    //   query += json['data'][0]['photo']['images']['large']['url'];
    //   query += "'>"
      var rest = "<div><p>" + json['data'][0]['name'] + "</p>"
      rest += "<img src='";
        rest += json['data'][0]['photo']['images']['large']['url'];
        rest += "'></div>"
      const parser = new DOMParser();
    //   output.append(parser.parseFromString(query, 'text/html').firstChild);
      output.append(parser.parseFromString(rest, 'text/html').firstChild)
    }
  });

  xhr.open("GET", "https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng?longitude=" + lng + "&latitude=" + lat +"&lunit=km&currency=USD&lang=en_US");
  xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "3b2fd2f1dbmsh5e3cd57f3775ac7p1cada7jsn3b71280bf6c5");

  xhr.send(data);
}