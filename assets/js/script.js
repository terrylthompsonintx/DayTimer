//on page load, load from local storage
//listen for click on time slot, edit 
//listen for click on save button
//on save btn write to local storage
//on load put date on jumbotron
// set interval to check time.  Color blocks that in the past grey.  Color future blocks gree,  Color actve red. 


var tasks =[];
var today = '';
var dayStart =8;
var dayStop =17;

var loadTasks = function(){
    var tempdata =JSON.parse(localStorage.getItem('tasks'));
    
    if (tempdata !== null){
        
        tasks = tempdata.slice();
        
        for (i=0;i<tasks.length;i++){
           //load tasks into page
            
        }
    }
}
var saveTasks = function(time,ttext) {
    var taskTime = time;
    var taskText = ttext;
    var newItem ={
        time: taskTime,
        tasks:taskText
    }
    tasks.push(newItem);
    console.log (tasks);

    localStorage.setItem('tasks',JSON.stringify(tasks));

}



var updateDay = function(){
    var today = moment().format("dddd MMMM Do gggg"); 
    $('#currentDay').text(today);
    
}

var colorRows = function(){
    var thisHour = moment().format("H"); //gets the hour which is a char
    for (i=1;i<=24;i++){
        var rowNum = i.toString().trim(); //converts I to a char
        
        hourNum =parseInt(thisHour); //converts the hour to a number
        if (i<dayStart || i>dayStop){
            
            $('#'+rowNum).closest('.time-block').addClass('hide');
            
        }

       
       if (hourNum > i){ //compares the hournum which is now a number to i.  i is used to select the row. 
            
            $('#'+rowNum).addClass('past');
            $('#'+rowNum).removeClass('present');
            $('#'+rowNum).removeClass('future');
           
        };
        if (hourNum == i){
            $('#'+rowNum).addClass('present');
            $('#'+rowNum).removeClass('past');
            $('#'+rowNum).removeClass('future');
           
        }; 
        
        
    }
}

var loadTasks = function(){
    
    var tasks =JSON.parse(localStorage.getItem('tasks'));
    if (tasks !== null){
        //console.log('tasks', tasks)
        for (x=0;x<tasks.length;x++){
            
            storedTime = tasks[x].time;
            storedTask = tasks[x].tasks;
            

            $('#'+storedTime).children('.oldTask').append(storedTask);

        }
    }
}


setInterval(function() {
    colorRows();
  }, (1000 * 60) * 30);

$('.saveBtn').on('click', function(){
    //replace text area with p containing text area

    //save to tasks array 
    //save to local storage
    var targetDiv =$(this).parent().children('.col-10').attr('id');
    var targetText =$('#'+targetDiv).children('.userTask').val();
    
    //if target element is a text area save it and convert to p
    if ($('#'+targetDiv).children().is('.userTask')){
        $('#'+targetDiv).html('<p>'+ targetText +'</p>');
        saveTasks(targetDiv,targetText);
    console.log(tasks);
    }
    else {
        alert('No changes to save.')
    }

})

$(".container").on("click",'.col-10',  function() {
    
    var oldtask = $(this).children('p').text();
    var textH = "<textarea  class ='userTask' rows='4' cols='50'>" + oldtask + "</textarea>";
    $(this).html(textH);
    $(this).find('.userTask').focus();
  
  });

colorRows();
updateDay();
loadTasks()

