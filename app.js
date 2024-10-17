let tasks=[];

const addTask = ()=> {
    const taskInput = document.getElementById('taskInput')
    const text = taskInput.value.trim()

    if(text){
        tasks.push({text:text,completed: false});
        taskInput.value="";
        updateTaskList();
        updateStats();
    }    
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
};

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTaskList();
    updateStats();

};

const editTask = (index) =>{
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text

    tasks.splice(index,1);
    updateTaskList();
    updateStats();
};

const updateStats = ()=>{
    const completeTasks = tasks.filter(task=> task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks/totalTasks)*100;
    const progressBar = document.getElementById('progress');

    progressBar.style.width = '${progress}%';
    document.getElementById('numbers').innerText = '${completedTasks}/ ${totalTasks}';
}

const updateTaskList = ()=> {
    const taskList = document.getElementById('task-list')
    taskList.innerHTML = ''

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed':''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskComplete(${index})"/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="path/to/adhaar_card.jpeg" onclick="editTask(${index})" />
                <img src="path/to/Resume_sindhu.pdf" onclick="deleteTask(${index})"/>
            </div>
        </div>
        `;

        listItem.addEventListener('change', ()=> toggleTaskComplete(index))
        taskList.append(listItem);
        
    });
};
document.getElementById('newTask').addEventListener('click',function(e){
    e.preventDefault();

    addTask();
});