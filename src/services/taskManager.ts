import type { Task } from '../types/taskTypes'
import { wrapInPromise } from '../utils/wrapInPromise'

export class TaskManager {
  private tasks: Task[] = [];
  private nextId = 1;

  async addTask(title: string, dueDate?: Date): Promise<Task> {
    const task: Task = { id: this.nextId++, title, completed: false, dueDate};
    this.tasks.push(task);
    return task;
  }
  async getTask(): Promise<Task[]> {
    return this.tasks
  }
  async updateTask(id: number, updates: Partial<Task>): Promise<Task | null> {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return null;
    this.tasks = this.tasks.map(t => t.id === id ? { ...t, ...updates } : t);
    return { ...task, ...updates };
  }
  async deleteTask(id: number): Promise<boolean> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return wrapInPromise(false);
    this.tasks.splice(index, 1);
    return wrapInPromise(true);
  }
}