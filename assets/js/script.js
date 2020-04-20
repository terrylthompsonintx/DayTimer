//on page load, load from local storage
//listen for click on time slot, edit 
//listen for click on save button
//on save btn write to local storage
//on load put date on jumbotron
// set interval to check time.  Color blocks that in the past grey.  Color future blocks gree,  Color actve red. 

//global variables
var tasks =[];
var today = '';
var dayStart =8;  //adjust for different time
var dayStop =17;




//functions begin

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
    tasks =[];
    var tasks =JSON.parse(localStorage.getItem('taskstore'));
    //console.log (tasks);
    if (tasks !== null){
        //console.log('tasks', tasks)
        for (x=0;x<tasks.length;x++){
            
            var storedTime = tasks[x].time;
            var storedTask = tasks[x].tasker;
            //console.log ('load task', tasks);


            $('#'+storedTime).children('.oldTask').append(storedTask);

        }
    }
}
//functions end
setInterval(function() {
    colorRows();
  }, (1000 * 60) * 30);

  //eventlisteners begin
$('.saveBtn').on('click', function(){

    event.preventDefault();
    var targetDiv =$(this).parent().children('.col-10').attr('id');
    var targetText =$('#'+targetDiv).children('.userTask').val();
    
    //if target element is a text area save it and convert to p
    if ($('#'+targetDiv).children().is('.userTask')){
        $('#'+targetDiv).html('<p class = "oldTask">'+ targetText +'</p>');

        //saveTasks(targetDiv,targetText);
        
        var newItem ={
            time: targetDiv,
            tasker: targetText
        }
        console.log(tasks);
        tasks.push(newItem);

        localStorage.setItem('taskstore',JSON.stringify(tasks));
    
    }
    else {
        alert('No changes to save.')
    }

})

$(".container").on("click",'.col-10',  function() {
    event.preventDefault();
    var oldtask = $(this).children('.oldTask').text();
    //console.log(oldtask);
    var textH = "<textarea  class ='userTask' rows='3' cols='50'>" + oldtask + "</textarea>";
    $(this).html(textH);
    $(this).find('.userTask').focus();
  
  });

  //eventlisteners end

colorRows();
updateDay();
loadTasks()

