let submitBtn = document.querySelector('.additem');
let inputTag = document.querySelector('.inputTag');
let taskList = document.querySelector('.taskList');
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
let id;
let LIST;

let data = localStorage.getItem('todo');

console.log(data);

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadToDo(LIST);
}
else{
    LIST = [];
    id=0;
}

function loadToDo(LIST){
    LIST.forEach(element => {
        addTodo(element.name,element.id,element.done,element.trash);
    });
}
submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(inputTag.value){
    let taskName = inputTag.value;
    console.log(taskName);
    
    addTodo(taskName,id,false,false);
    LIST.push(
        {
            name:taskName,
            id:id,
            done:false,
            trash:false
        }
    )
    }
    id++;
    inputTag.value= '';
})

taskList.addEventListener('click',function(event){
    let element = event.target;
    // console.log(element.attributes.job.nodeValue);
    // let JOB = element.attrubutes.job.nodeValue;
    console.log(element.attributes);
    if(element.attributes.job.nodeValue =='complete'){
        completeToDo(element);
    }
    if(element.attributes.job.nodeValue =='delete'){
        deleteToDo(element);
    }
});

function addTodo(todo,id,doneValue,trashValue){
    console.log(`ID VALUE IS.......${id}`);
    if(trashValue){
        return;
    }
    let doneFlag = doneValue?CHECK:UNCHECK;
    let lineFlag = doneValue?LINE_THROUGH:"";
    // console.log(`called ${todo}`);
    let text = `<div class="listRow">
    <i class="fa ${doneFlag}" job="complete" id="${id}" aria-hidden="true"></i>
    <text class="textClass ${lineFlag}">${todo}</text>
    <i class="fa fa-trash-o" job="delete" id="${id}" aria-hidden="true"></i>
    </div>`;
    // console.log(text);
    taskList.insertAdjacentHTML('beforeend',text);
    
    localStorage.setItem('todo',JSON.stringify(LIST));
    
console.log(LIST);
}

function completeToDo(element){
    // console.log(element.classList);
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.textClass').classList.toggle(LINE_THROUGH);
    if(LIST[element.id].done ==true){
        LIST[element.id].done = false;
    }
    else{
        LIST[element.id].done = true;
    }
    // LIST[element.id].done = LIST[element.id].done?false:true;
    console.log(LIST[element.id]);
    // localStorage.clear();
    // console.log(LIST[element]);
    // console.log(LIST);
    localStorage.setItem('todo',JSON.stringify(LIST));

}

function deleteToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash=true;
    localStorage.setItem('todo',JSON.stringify(LIST));
}

