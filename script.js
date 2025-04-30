// 獲取輸入框和任務列表
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// 從本地存儲加載任務
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 渲染任務列表
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (task.completed) {
            li.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(index));

        const span = document.createElement('span');
        span.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '刪除';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    // 保存到本地存儲
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 添加新任務
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({
            text: taskText,
            completed: false
        });
        taskInput.value = '';
        renderTasks();
    }
}

// 切換任務完成狀態
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// 刪除任務
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// 按 Enter 鍵添加任務
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// 初始渲染
renderTasks(); 