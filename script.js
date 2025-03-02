document.addEventListener('DOMContentLoaded',() => { 
    const todo= document.getElementById('todo');
    const addbtn=document.getElementById('addTask');
    const list=document.getElementById('tasklist'); 
    
    let tasks= JSON.parse(localStorage.getItem('tasks'))||[];  
    tasks.forEach((task)=>rendertasks(task));
    
    addbtn.addEventListener('click',() =>{ 
       const tasktext= todo.value.trim() 
       if(tasktext=== "") return; 
    
       const newtask={ 
        id:Date.now(), 
        text:tasktext, 
        completed:false
       } 
       tasks.push(newtask)  
       savetasks();  
       rendertasks(newtask);
       todo.value=""
    }) 
    
    
    function rendertasks(task){  
        // console.log(task.text); 
        const li=document.createElement("li"); 
        li.setAttribute("data-id",task.id);  
       if(task.completed) li.classList.add('completed')


        li.innerHTML=`<span>${task.text}</span><button class="delete-btn">Delete</button>`;  
        li.addEventListener('click',(e) => {  
            if(e.target.tagName==='BUTTON') return; 
            task.completed=!task.completed 
            li.classList.toggle('completed')
            savetasks();
        });  

        li.querySelector('button').addEventListener('click',(e) =>{ 
            e.stopPropagation();  //prevent toggle from firing 

            tasks=tasks.filter(t => t.id!= task.id) 
            li.remove(); 
            savetasks(); 
            rendertasks(newtask)
        })

        list.appendChild(li);
    
    }
    
    
    function savetasks(){ 
        localStorage.setItem('tasks',JSON.stringify(tasks));
    } 
    
})