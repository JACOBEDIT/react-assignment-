
import React, { useState, useEffect } from 'react';
import { Todo } from './types';
import Header from './components/Header';
import ToDoList from './components/ToDoList';

const App: React.FC = () => {
  // Initialize state from local storage or empty array
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('taskmaster_todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');

  // Persist state to local storage
  useEffect(() => {
    localStorage.setItem('taskmaster_todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: inputValue.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Header />

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8">
          {/* Add Todo Form */}
          <form onSubmit={handleAddTodo} className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-700"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center whitespace-nowrap"
            >
              Add Task
            </button>
          </form>

          {/* Stats Bar */}
          {todos.length > 0 && (
            <div className="mt-8 flex items-center justify-between text-sm font-medium text-slate-500 border-b border-slate-100 pb-4">
              <span>{todos.length} {todos.length === 1 ? 'Task' : 'Tasks'} Total</span>
              <div className="flex items-center space-x-3">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                  {completedCount} Completed
                </span>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs">
                  {todos.length - completedCount} Pending
                </span>
              </div>
            </div>
          )}

          {/* Todo List Component */}
          <ToDoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
            onEdit={handleEditTodo}
          />
        </div>

        {/* Quick Tips */}
        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>Tip: Click a task text to edit it, or use the edit icon.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
