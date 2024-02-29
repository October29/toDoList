const taskList = [];    //lista de tareas
const taskButton = document.getElementById('taskButton');   //Boton agregar tarea
const taskContainer = document.getElementById('taskContainer'); //Contenedor de tarjetas de tareas
const time = document.getElementById('time');   //Hora de tarea
const date = document.getElementById('date');   //Fecha de tarea
const priority = document.getElementsByName('priority');    //Prioridad de tarea
let taskdescription = document.getElementById('toDoContent'); //Descripcion de tarea
let priorityColor = ''; //Color de prioridad


taskButton.addEventListener('click',addTask);   //evento click, agregar tarea

//iniciar proceso
function addTask(e){
    e.preventDefault();
        SetPriorityTask();  //designar prioridad de la tarea
        addTaskData();      //agregar tarea al array de lista de tareas (taskList)
        taskList.sort(comparatorTask);  //ordenar tareas por prioridad
        createTaskCard();   //crear tarjeta de tarea
        clearTextArea();    //limpiar campos
        console.log(taskList);
}; 

//designar prioridad de la tarea
function SetPriorityTask() {
    for (const radio of priority){
        if (radio.checked){
            switch (radio.value) {
                case 'blue':
                    priorityColor = radio.value;                 
                    break;
                case 'green':           
                    priorityColor = radio.value;
                    break;
                case 'yellow':              
                    priorityColor = radio.value; 
                    break;
                case 'orange':              
                    priorityColor = radio.value;
                    break;
                case 'red':     
                    priorityColor = radio.value;          
                    break;
                default:
                    break;
            };
        };
    };
};

//comparador de tareas por prioridad
function comparatorTask(a,b) {
    const prioridadA = a.priorityColorCard.toLowerCase();
    const prioridadB = b.priorityColorCard.toLowerCase();

    if (prioridadA === 'red') {
        return -1;
    } else if (prioridadB === 'red') {
        return 1;
    } else if (prioridadA === 'orange') {
        return -1;
    } else if (prioridadB === 'orange') {
        return 1;
    } else if (prioridadA === 'yellow') {
        return -1;
    } else if (prioridadB === 'yellow') {
        return 1;
    } else if (prioridadA === 'green') {
        return -1;
    } else if (prioridadB === 'green') {
        return 1;
    } else if (prioridadA === 'blue') {
        return -1;
    } else if (prioridadB === 'blue') {
        return 1;
    } else {
        return 0;
    };
};

//agregar datos de la tarea al objeto taskList
function addTaskData() {
    taskList.push({
        descriptionCard : taskdescription.value,
        dateCard : date.value,
        timeCard : time.value});
        taskList[taskList.length -1].priorityColorCard = priorityColor;   
return
};

//crear tarjeta
function createTaskCard() {
    if (taskdescription.value != '') {

        const taskCard = document.createElement('div'); //Contenedor de la tarjeta
        taskCard.className = 'taskStyle';
        taskContainer.appendChild(taskCard);

        const taskTextContainer = document.createElement('div');//Contenedor de texto tarjeta
        taskTextContainer.className = 'taskTextContainer';
        taskCard.appendChild(taskTextContainer);

        const taskText = document.createElement('h2');  //Contenido de la tarjeta
        taskText.textContent = taskdescription.value;
        taskText.className = 'taskDescription';
        taskTextContainer.appendChild(taskText);

        const taskDate = document.createElement('p');   //Fecha de creacion de la tarjeta
        taskDate.textContent = date.value;
        taskDate.className = 'taskDate';
        taskTextContainer.appendChild(taskDate);

        const taskTime = document.createElement('p');   //Hora de creacion de la tartjeta
        taskTime.textContent = time.value;
        taskTime.className = 'taskTime';
        taskTextContainer.appendChild(taskTime);

        const tagPriority = document.createElement('div'); //Etiqueta de prioridad
        tagPriority.className = 'tagPriority';
        taskCard.appendChild(tagPriority);

        const eliminateTag = document.createElement('button');//Boton para eliminar tarjeta
        eliminateTag.className = 'eliminateTag';
        tagPriority.appendChild(eliminateTag);

        eliminateTag.onclick = function deleteTag() {          //funcion para eliminar tarea
            taskCard.classList.add('animationEliminateTag');
            setTimeout(function() {   //Eliminar la tarjeta despues de 0.2s
                taskCard.remove();
            }, 200);
            taskList.pop();
        }
        //asignar color de etiqueta de prioridad
        if (priorityColor === 'blue') {
            taskCard.classList.add('blueCard');
            tagPriority.classList.add('bluePriority');
        } else if (priorityColor === 'green') {
            taskCard.classList.add('greenCard');
            tagPriority.classList.add('greenPriority');
        } else if (priorityColor === 'yellow') {
            taskCard.classList.add('yellowCard');
            tagPriority.classList.add('yellowPriority');
        } else if (priorityColor === 'orange') {
            taskCard.classList.add('orangeCard');
            tagPriority.classList.add('orangePriority');
        } else if (priorityColor === 'red') {
            taskCard.classList.add('redCard');
            tagPriority.classList.add('redPriority');
        } else {
            return; 
        };
    } else {
    alert('asigna una tarea!'); 
    };
};

//limpiar campos
function clearTextArea(){
    taskdescription.value = '';
    time.value = '';
    date.value = '';
};

function reloadTask() {
    for (const task of taskList) {
        if (task.priorityColorCard === 'red') {
            addTask();
        } else if (task.priorityColorCard === 'orange') {
            addTask();
        } else {
            return;
        };
    };
};