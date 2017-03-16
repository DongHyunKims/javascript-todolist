

// function Todolist(key, todolist, name, date){
//   this.key = key === undefined ? defaultKey++ : key;
//   this.todolist = todolist;
//   this.name = name;
//   this.date = date;
// }
(function(){
    class Todolist{

        constructor(){
            this.todoKey = 0;
            this.tasks =[];
            this.state = 0;

        }

        getTodolist(){
        return this.tasks;
        }
        getState(){
        return this.state;
        }
        setState(state){
        this.state = state;
        }
        addTodolist(task){
        if(task === "") return this.tasks;
        return this.tasks.push(task);
        }
        deleteTodolist(task){
        if(this.tasks.indexOf(task) < 0){
            return this.tasks;
        }
        return this.tasks.splice(this.tasks.indexOf(task),1);
        }
        completeTodolist(){
        if(this.state === 0){
            return this.state = 1;
        }else{
            return this.state = 0;
        }
        }


    }





  function init(){





    let todoList = new Todolist();
    debugger;
    console.log(todoList);

    replaceList(todoList,todoList.getState());

     var addbuttonDom = document.querySelector("#addBtn");
     addbuttonDom.addEventListener('click',addTaskHandler.bind(null,todoList));

     var deletebuttonDom = document.querySelector("#deleteBtn");
     deletebuttonDom.addEventListener('click',deleteTaskHandler.bind(null,todoList));

     var completebuttonDom = document.querySelector("#completeBtn");
     completebuttonDom.addEventListener('click',completeTaskHandler.bind(null,todoList));

  }


    function replaceList(todoList,state){

        let tasks = todoList.getTodolist();

        let task = document.querySelector('#task').value;

        document.getElementById("task").value = "";
        let liStringLine = "<li class='list-group-item list-group-item-info' style='text-decoration: line-through'>";
        let liString ="<li class='list-group-item list-group-item-info'>";
        let template = document.querySelector('#todoListTemplate');
        let todoListTemplate = template.innerText;
        todoListTemplate = todoListTemplate.replace("{complete}", state === 0 ||  tasks.indexOf(task) < 0 ? "Not complete!!!" : "Complete" );

        if(tasks.length !== 0){
            todoListTemplate = todoListTemplate.replace("{todoList}", tasks.map(function (val) {
                return (state === 1 && val === task ?  liStringLine  : liString)  +  val + "</li>";
            }).join(""));
        }else{
            todoListTemplate = "";
        }

        var contentDom = document.querySelector(".todolist");
        contentDom.innerHTML = todoListTemplate;
    }

    function addTaskHandler(todoList){
        let task = document.querySelector('#task').value;
        todoList.addTodolist(task);
        document.getElementById("task").value = "";

        replaceList(todoList,todoList.getState());
    }


    function deleteTaskHandler(todoList){
        let task = document.querySelector('#task').value;
        todoList.deleteTodolist(task);
        document.getElementById("task").value = "";
        replaceList(todoList,todoList.getState());
    }


    function completeTaskHandler(todoList){
        todoList.completeTodolist();
        let state = todoList.getState();


        replaceList(todoList,state);
    }

    init();
})();







