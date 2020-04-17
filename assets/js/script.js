//on page load, load from local storage
//listen for click on time slot, edit 
//listen for click on save button
//on save btn write to local storage
//on load put date on jumbotron
// set interval to check time.  Color blocks that in the past grey.  Color future blocks gree,  Color actve red. 
var tasks =[];


var saveTasks = function() {
    var newScore = correctA.toString();
    var newinits = document.getElementById('savebox').value;
    var newItem ={
        time: newinits,
        tasks:newScore
    }
    tasks.push(newItem);

    localStorage.setItem('tasks',JSON.stringify(tasks));

}

var today = '';

var updateDay = function(){
    var today = moment().format("dddd MMMM Do gggg"); 
    $('#currentDay').text(today);
    console.log(today);
}

updateDay();

