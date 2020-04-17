//on page load, load from local storage
//listen for click on time slot, edit 
//listen for click on save button
//on save btn write to local storage
//on load put date on jumbotron
// set interval to check time.  Color blocks that in the past grey.  Color future blocks gree,  Color actve red. 
var tasks =[];

var loadTasks = function(){
    var tempdata =JSON.parse(localStorage.getItem('tasks'));
    
    if (tempdata != null){
        
        tasks = tempdata.slice();
        
        for (i=0;i<tasks.length;i++){
           //load tasks into page
            
        }
    }
}
var saveTasks = function() {
    var taskTime = correctA.toString();
    var taskText = document.getElementById('savebox').value;
    var newItem ={
        time: taskTime,
        tasks:taskText
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

var colorRows = function(){
    var thisHour = moment().format("H");
    for (i=8;i<=17;i++){
        var rowNum = i.toString().trim(); 
        
        hourNum =parseInt(thisHour);
        var whatIsIt = $('#'+rowNum).html()
        
        if (hourNum > i){
            console.log (hourNum, i);
            $('#'+rowNum).addClass('past');
        };
        if (hourNum == i){
            $('#'+rowNum).addClass('present');
        };
        if (thisHour < rowNum){
            $('#'+rowNum).addClass('future');

        };

    }
}


setInterval(function() {
    colorRows();
  }, (1000 * 60) * 5);


colorRows();
updateDay();

