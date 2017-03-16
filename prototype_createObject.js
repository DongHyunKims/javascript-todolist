

// function Todolist(key, todolist, name, date){
//   this.key = key === undefined ? defaultKey++ : key;
//   this.todolist = todolist;
//   this.name = name;
//   this.date = date;
// }
(function(){


    var todoPrototype = {
     getTodolist : function(){
        return this.tasks;
    },
    getState : function(){
        return this.state;
    },
    setState : function(state){
        this.state = state;
    },
   addTodolist : function(task){
        if(task === "") return this.tasks;
        return this.tasks.push(task);
    },
    deleteTodolist : function(task){
        if(this.tasks.indexOf(task) < 0){
            return this.tasks;
        }
        return this.tasks.splice(this.tasks.indexOf(task),1);
    },
    completeTodolist : function(){
        if(this.state === 0){
            return this.state = 1;
        }else{
            return this.state = 0;
        }
    },

    };

  function makeObject(property, proto){
        //프로토 타입에 넣을 메소드를 모두 지정한다
    var obj = Object.create(proto);
    Object.keys(property).forEach(function(val){
        //해당 프로퍼티가 없으면 만든후 할당하고 아니면 덮어쓴다
        obj[val] = property[val];
    });
    return obj;
  }



  function init(){
    let todolistProp = {
          todoKey : 0,
          tasks : [],
          state : 0
      };
    let todoList = makeObject(todolistProp,todoPrototype);
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

        let template = document.querySelector('#todoListTemplate');
        let todoListTemplate = template.innerText;
        todoListTemplate = todoListTemplate.replace("{complete}", state === 0 ||  tasks.indexOf(task) < 0 ? "Not complete!!!" : "Complete" );

        if(tasks.length !== 0){
            todoListTemplate = todoListTemplate.replace("{todoList}", tasks.map(function (val) {
                return (state === 1 && val === task ?  "<li class='list-group-item list-group-item-info' style='text-decoration: line-through'>"  : "<li class='list-group-item list-group-item-info'>") +  val + "</li>";
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







