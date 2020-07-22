"use strict"

let id=0;
let TaskList=[];
TaskList.TaskLeft=0;
class Task{
    constructor(idTask,taskName,state,element)
    {
        this.idTask=idTask;
        this.taskName=taskName;
        this.state=state;
        this.element=element;
    }
    
    //TaskLeft לא לשכוח את 
   ChangeState(){
        this.element.classList.toggle("middle_line");
        this.state=!this.state;
        ChangeTaskLeft();
        HaveTaskCompleted();
    }
}
TaskList.All=function(){
   TaskList.filter(item=>(item.element.classList.contains("liStyle")==false)).
   forEach(item=>item.element.classList.add("liStyle"));
};
TaskList.Active=function(){//state=false
    TaskList.All();
    TaskList.filter(item=>item.state==true).forEach((item)=>{item.element.classList.remove("liStyle");
    item.element.classList.add("liListNone")});
}
TaskList.Complete=function(){
    TaskList.All();
    TaskList.filter(item=>item.state==false).forEach((item)=>{item.element.classList.remove("liStyle");
    item.element.classList.add("liListNone")});
}
TaskList.ClearComplete=function(){
    TaskList.filter(item=>item.state==true).forEach(item=>item.element.remove());

}
function ChangeTaskLeft(){
    let numTask=TaskList.filter(task=>task.state==false).length;
    document.getElementById("NumTaskLeft").innerHTML=""+numTask+" item left";
}

function HaveTaskCompleted(){
     if(TaskList.some(item=>item.state==true))
     {
        document.getElementById("ClearCompleted").style.display="inline-block";  
     }
     else{
         document.getElementById("ClearCompleted").style.display="none";  
     }
}

 
//הפונקציה שמפעילה את יצירת המשימה בפעם הראשונה
document.querySelector("input").addEventListener('keyup',function(){
    if(event.key=="Enter")
    {
        CreateTask(event.target.value);
        event.target.value="";
    }
    
});
function CreateTask(taskName){

    var task=new Task(id,taskName,false);
    task.element=CreatTaskInHtml(task);
    
    id++;
    TaskList.push(task);
    
    task.element.addEventListener("onmouseenter",function(event){
        task.element.querySelector("#x").style.display="block"});
       task.element.addEventListener("mouseleave",function(event){
    task.element.querySelector("#x").style.display="none"});
        task.element.querySelector("#x").addEventListener("click",function(){
            let index=TaskList.indexOf(task);
            TaskList.splice(index,1);
            task.element.remove();
            ChangeTaskLeft();
        
    });
    ChangeTaskLeft();
   
}

function CreatTaskInHtml(task){
    let li=document.createElement('li');
    li.id=task.idTask;
    li.classList.add('liStyle')
    li.innerHTML+="<input type='checkbox' onchange='changeChecked(event)'>"+task.taskName+"<button id='x'>x</button>";
    document.getElementById("ul").appendChild(li);
    li.addEventListener("mouseover",()=>{
        li.querySelector("#x").style.display="inline-block";
        li.querySelector("#x").addEventListener("click",()=>{
            
        });
    });
    return li;
}
function changeChecked(event) {
    let task=TaskList.find(item=>item.idTask==event.target.parentNode.id);
    task.ChangeState();
    
}

