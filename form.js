var submit = document.getElementById("submit");
function changeurl(){
    window.location.href = "results.html";
}
submit.onclick = function()  {  
    const db = firebase.database();
    var formdata = new FormData();
    var nights = document.getElementById("NumOfNights").value;
    // var loc = document.getElementById("location").value;
    // console.log(name);
    db.ref('results/q6').set(nights);
    var selectElement = document.querySelector('#loc');
    var output = selectElement.value;
    var option = document.getElementsByName("budget");
    console.log(output);
    var option2 = document.getElementsByName("SpendtheNight");
    var markedCheckbox = document.getElementsByName('food');
    var arr = []
    for (var checkbox of markedCheckbox) {  
        if (checkbox.checked)  
          arr.push(checkbox.value);
      }  
      db.ref('results/q2').set(arr);
    var markedCheckbox2 = document.getElementsByName('adventure');
    // console.log(markedCheckbox2)
    var arr2 = []
    for (var checkbox2 of markedCheckbox2) {  
        if (checkbox2.checked){ 
            console.log(checkbox2.value)
          arr2.push(checkbox2.value);
        }
      }  
      db.ref('results/q4').set(arr2);
    markedCheckbox = document.getElementsByName('transport');
    // console.log(markedCheckbox2)
    arr = []
    for (var checkbox3 of markedCheckbox) {  
        if (checkbox3.checked){ 
            console.log(checkbox3.value)
          arr.push(checkbox3.value);
        }
      }  
      db.ref('results/q7').set(arr);
    var comment = document.getElementById("comment").value;
    db.ref('results/q8').set(comment)
    // document.querySelector('meta[name="name"]').setAttribute("content",name)
    // document.querySelector('meta[name="name"]').content = name;
    // console.log(document.querySelector('meta[name="name"]').content)
    for(var i = 0; i < option.length; i++) {
        if(option[i].checked){
        console.log(option[i].value);
        db.ref('results/q3').set(option[i].value).then(() => {
            // log data set success to console
            console.log('data set...');
            // window.open( "results.html");
            })
            .catch((e) => {
            // catcg error from Firebase - error logged to console
            console.log('error returned', e);
            });
        }  
    }
    for(var i = 0; i < option2.length; i++) {
        if(option2[i].checked){
        console.log(option2[i].value);
        db.ref('results/q5').set(option2[i].value).then(() => {
            // log data set success to console
            console.log('data set...');
            // window.open( "results.html");
            })
            .catch((e) => {
            // catcg error from Firebase - error logged to console
            console.log('error returned', e);
            });
        }  
    }
    db.ref('results/q1').set(output).then(() => {
        // log data set success to console
        console.log('data set...');
        window.location.href = "results.html";
        })
        .catch((e) => {
        // catcg error from Firebase - error logged to console
        console.log('error returned', e);
        });
};