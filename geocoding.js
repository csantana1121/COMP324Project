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

  function ReverseGeoCode(lat,lng)  {   
    const data = null;
    const key = "AIzaSyBn3PMPpjblLpWGNw4GCq-cZoqb2SeYWc8";
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        var json = JSON.parse(this.responseText);
        console.log(json["results"][0]["formatted_address"]);
        var address = json["results"][0]["formatted_address"];
        const db = firebase.database();
        db.ref('results/q9').set(address).then(() => {
            // log data set success to console
            console.log('data set...');
            // window.open( "results.html");
            })
            .catch((e) => {
            // catcg error from Firebase - error logged to console
            console.log('error returned', e);
            });
        // console.log(this.responseText);
        // return this.responseText;
        
      }
    });
    url ="https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +","+lng+"&key=" + key;
    xhr.open("GET", url);
    xhr.send(data);
  };
  
function store(list){
    var x = list["lat"]
    var y = list["lng"]
    console.log(x + " " + y);
    hotels(x,y);
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
      var count = 0;
      var i = 0;
      var titleoutput = document.getElementById("output");
      var title = "<div class='row'><h2 style='text-align:center'>Restaurants</h2>";
      const parser = new DOMParser();
      titleoutput.append(parser.parseFromString(title, 'text/html').firstChild)
      while(count<3){
        var url = json['data'][i]['photo'];
        if(typeof url != 'undefined'){ 
        var output = document.getElementById("output");
        var rest = "<div class='column' style='padding-bottom:100px'><div class='card'> <p>" + json['data'][i]['name'] + "</p>"
        rest += "<img src='";
        rest += json['data'][i]['photo']['images']['large']['url'];
        rest += "'style='width:100%'>"
        if(typeof json['data'][i]['rating'] != 'undefined'){
            rest += "<p>Rating: " +json['data'][i]['rating'] +"/5.0</p>"
        } else{
            rest += "<p> <br> </p>"
        }
        if(typeof json['data'][i]['ranking'] != 'undefined'){
            rest += "<p>Ranking: " + json['data'][i]['ranking'] + "</p>"
        } else{
            rest += "<p> <br> </p>"
        }
        if(typeof json['data'][i]['phone'] != 'undefined'){
            rest += "<p>Phone #" + json['data'][i]['phone'] + "</p>"
        } else{
            rest += "<p> <br> </p>"
        }
        if(typeof json['data'][i]['address'] != 'undefined'){
            rest += "<p>Address: " + json['data'][i]['address'] + "</p>"
        } else{
            rest += "<p> <br> </p>"
        }
        rest += "<a href='" + json['data'][i]['website']+ "'><button class='button'>Website</button></a>"
        rest += "<a href='mailto: " + json['data'][i]['email'] + "'><button class='button'>Contact</button><div><div>"
    //   output.append(parser.parseFromString(query, 'text/html').firstChild);
        output.append(parser.parseFromString(rest, 'text/html').firstChild)
        count++;
        } 
        i++;
      }
      var end = "<div>"
      titleoutput.append(parser.parseFromString(end, 'text/html').firstChild)
      console.log(json['data'][0]['name']);
    }
  });
  const db = firebase.database();
      db.ref('results/q3').once('value')
        .then((snapshot) => {
        // snapshot of the data - request the return value for the data at the time of query...
        const data = snapshot.val();
        console.log('single data = ', data);
        xhr.open("GET", "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=" + lat + "&longitude=" + lng +"&limit=30&currency=USD&prices_restaurants=" + data +"&distance=2&open_now=false&lunit=km&lang=en_US");
        xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "b02794cbb5mshf78817f1118c6eap1bece0jsnfef52dd73e23");

        xhr.send(data);
        })
        .catch((e) => {
        console.log('error returned - ', e);
        });
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
      var count = 0;
      var i = 0;
      var titleoutput = document.getElementById("output");
      var title = "<div class='row'><h2 style='text-align:center'>Attractions</h2>";
      const parser = new DOMParser();
      titleoutput.append(parser.parseFromString(title, 'text/html').firstChild)
      while(count<3){
        var url = json['data'][i]['photo'];
        var web = json['data'][i]['website']
        if(typeof url != 'undefined' && typeof web != 'undefined'){ 
        var output = document.getElementById("output");
        var rest = "<div class='column' style='padding-bottom:100px'><div class='card'> <p>" + json['data'][i]['name'] + "</p>"
        rest += "<img src='";
        rest += json['data'][i]['photo']['images']['large']['url'];
        rest += "'style='width:100%'>"
        if(typeof json['data'][i]['rating'] != 'undefined'){
            rest += "<p>Rating: " +json['data'][i]['rating'] +"/5.0</p>"
        } else{
            rest += "<p> <br> </p>"
        }
        if(typeof json['data'][i]['ranking'] != 'undefined'){
            rest += "<p>Ranking: " + json['data'][i]['ranking'] + "</p>"
        } else{
            rest += "<p> <br> </p>"
        }
        if(typeof json['data'][i]['phone'] != 'undefined'){
            rest += "<p>Phone #" + json['data'][i]['phone'] + "</p>"
        } else{
            rest += "<p> <br> </p>"
        }
        if(typeof json['data'][i]['address'] != 'undefined'){
            rest += "<p>Address: " + json['data'][i]['address'] + "</p>"
        } else{
            rest += "<p> <br> </p>"
        }
        rest += "<a href='" + json['data'][i]['website']+ "'><button class='button'>Website</button></a>"
        rest += "<a href='mailto: " + json['data'][i]['email'] + "'><button class='button'>Contact</button><div><div>"
    //   output.append(parser.parseFromString(query, 'text/html').firstChild);
        output.append(parser.parseFromString(rest, 'text/html').firstChild)
        count++;
        } 
        i++;
    }
    }
  });

  const db = firebase.database();
  db.ref('results/q1').once('value')
    .then((snapshot) => {
    // snapshot of the data - request the return value for the data at the time of query...
    const data = snapshot.val();
    console.log('single data = ', data);
    xhr.open("GET", "https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng?longitude=" + lng + "&latitude=" + lat +"&lunit=km&currency=USD&lang=en_US");
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "b02794cbb5mshf78817f1118c6eap1bece0jsnfef52dd73e23");

    xhr.send(data);
    })
    .catch((e) => {
    console.log('error returned - ', e);
    });
}
function hotels(lat,lng){
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
      var json = JSON.parse(this.response)
      console.log(json['data'][0]['name']);
      var output = document.getElementById("output");
      var count = 0;
      var i = 0;
      var titleoutput = document.getElementById("output");
      var title = "<div class='row'><h2 style='text-align:center'>Hotels</h2>";
      const parser = new DOMParser();
      titleoutput.append(parser.parseFromString(title, 'text/html').firstChild)
      while(count<3){
        var url = json['data'][i]['photo'];
        var web = json['data'][i]['business_listings']['mobile_contacts']
        if(typeof url != 'undefined' && typeof web != 'undefined'){
        // ReverseGeoCode(json['data'][i]['latitude'],json['data'][i]['longitude'])
        var output = document.getElementById("output");
        var rest = "<div class='column' style='padding-bottom:100px'><div class='card'> <p>" + json['data'][i]['name'] + "</p>"
        rest += "<img src='";
        rest += json['data'][i]['photo']['images']['large']['url'];
        rest += "'style='width:100%'>"
        if(typeof json['data'][i]['rating'] != 'undefined'){
            rest += "<p>Rating: " +json['data'][i]['rating'] +"/5.0</p>"
        } else{
            rest += "<p><br></p>"
        }
        if(typeof json['data'][i]['ranking'] != 'undefined'){
            rest += "<p>Ranking: " + json['data'][i]['ranking'] + "</p>"
        } else{
            rest +="<p><br></p>"
        }
        if(typeof json['data'][i]['price'] != 'undefined'){
            rest += "<p>Price per night: " + json['data'][i]['price'] + "</p>"
        } else{
            rest +="<p><br></p>"
        }
        if(typeof json['data'][i]['neighborhood_info'] != 'undefined'){
            rest += "<p>Location: " + json['data'][i]['neighborhood_info'][0]['name'] + "</p>"
        } else{
            rest += "<p><br></p>"
        }
        if(typeof json['data'][i]['business_listings']['mobile_contacts'][0] != 'undefined'){
            rest += "<a href='" + json['data'][i]['business_listings']['mobile_contacts'][0]['value'] + "'><button class='button'>Website</button></a>"
        }else{
            rest += "<button class='button'>Website</button>"
        }
        rest += "<a href='mailto: " + json['data'][i]['email']+ "'><button class='button'>Contact</button><div><div>"
    //   output.append(parser.parseFromString(query, 'text/html').firstChild);
        output.append(parser.parseFromString(rest, 'text/html').firstChild)
        count++;
        } 
        i++;
    }
    }
  });

    const db = firebase.database();
    db.ref('results/q5').once('value')
    .then((snapshot) => {
    // snapshot of the data - request the return value for the data at the time of query...
    const data = snapshot.val();
    console.log('single data = ', data);
    if(data == 'Yes'){
    db.ref('results/q6').once('value')
    .then((snapshot) => {
    // snapshot of the data - request the return value for the data at the time of query...
    const dat = snapshot.val();
    console.log('single data = ', dat);
    xhr.open("GET", "https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng?latitude=" + lat + "&longitude=" + lng + "&lang=en_US&hotel_class=3&limit=30&adults=1&rooms=1&currency=USD&nights=" + dat);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "b02794cbb5mshf78817f1118c6eap1bece0jsnfef52dd73e23");

    xhr.send(data);
    })
    .catch((e) => {
    console.log('error returned - ', e);
    });
    } else{
        xhr.open("GET", "https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng?latitude=" + lat + "&longitude=" + lng + "&lang=en_US&hotel_class=1,2,3&limit=30&adults=1&rooms=1&currency=USD");
        xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "b02794cbb5mshf78817f1118c6eap1bece0jsnfef52dd73e23");
    
        xhr.send(data);    
    }
    })
    .catch((e) => {
    console.log('error returned - ', e);
    });
}