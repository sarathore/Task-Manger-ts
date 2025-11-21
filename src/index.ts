import { TaskManager } from './services/taskManager'

const manager = new TaskManager();

async function demo() {
  const task1 = await manager.addTask("Learn Typescript", new Date());
  const task2 = await manager.addTask("Build a Project");

  console.log(await manager.getTask());

  await manager.updateTask(task1.id, { completed: true });

  await manager.deleteTask(task2.id);

  console.log(await manager.getTask());
}

demo();