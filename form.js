var submit = document.getElementById("submit");
function changeurl(){
    window.location.href = "results.html";
}
submit.onclick = function()  {  
    const db = firebase.database();
    var formdata = new FormData();
    var name = document.getElementById("name").value;
    var loc = document.getElementById("location").value;
    console.log(name);
    db.ref('results/q1').set(name);
    var option = document.getElementsByName("recommed");
    // document.querySelector('meta[name="name"]').setAttribute("content",name)
    // document.querySelector('meta[name="name"]').content = name;
    // console.log(document.querySelector('meta[name="name"]').content)
    for(var i = 0; i < option.length; i++) {
        if(option[i].checked){
        console.log(option[i].value);
        db.ref('results/q2').set(option[i].value).then(() => {
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
    db.ref('results/q3').set(loc).then(() => {
        // log data set success to console
        console.log('data set...');
        window.location.href = "results.html";
        })
        .catch((e) => {
        // catcg error from Firebase - error logged to console
        console.log('error returned', e);
        });
        // window.close();
    // window.location.replace("results.html");    
    // setTimeout(function () {
    //     console.log("Hi 5 seconds laters");
    // }, 5000);
    // window.location.href = "results.html";
};
