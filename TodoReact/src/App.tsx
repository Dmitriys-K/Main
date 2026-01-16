import { useState } from 'react'
import DatePicker from 'react-datepicker';
import { subDays } from 'date-fns';
import {ru} from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';
import './App.css'

export interface Todo {
  id: string
  text: string
  completed: boolean
  date?: Date | null
}

function App() {

  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const raw = localStorage.getItem('todos');
      if (!raw) return [];
      const parsed = JSON.parse(raw, (key, value) => key === 'date' && value ? new Date(value) : value);
      if (!Array.isArray(parsed)) return [];
      return parsed as Todo[];
    } catch {
      return [];
    }
  })
  const [text, setText] = useState<string>('')
  const [date, setDate] = useState<string>(new Date().toISOString())
  // const[calendarOpen, setCalendarOpen] = useState<boolean>(false);
  

  const addTodoHandler = () => {
    if (text.trim() === '') return;


    const dateObj = date ? new Date(date) : null;
    if (date && (isNaN(dateObj!.getTime()))) {
      console.error('Invalid date state:', date);
      alert('Неправильная дата. Выберите дату заново.');
      return;
    }

    const newTodo: Todo = {
      id: uuidv4(),
      text: text.trim(),
      completed: false,
      date: dateObj
    };

    const newTodos = [...todos, newTodo];
    try {
      localStorage.setItem('todos', JSON.stringify(newTodos));
      setTodos(newTodos);
      setText('');

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      alert(message);
      console.error('Ошибка при сохранении в localStorage', err);

    }
  }



  const removeTodoHandler = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    localStorage.setItem('todos', JSON.stringify(todos.filter(todo => todo.id !== id)));

  }

  const toggleTodoHandler = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    localStorage.setItem('todos', JSON.stringify(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)));

  }


  const groupedTodos = todos.reduce<Record<string, Todo[]>>((acc, todo) => {
    const key = todo.date ? todo.date.toLocaleDateString().slice(0, 10) : 'no-date';

    if (!acc[key]) acc[key] = [];
    acc[key].push(todo);

    return acc;
  }, {});

  const sortedGroupedTodos = Object.keys(groupedTodos).sort().reduce<Record<string, Todo[]>>((acc, key) => {
    acc[key] = groupedTodos[key];
    return acc;
  }, {});



  return (
    <div className="TodoApp">
      <h1>Список дел</h1>
      <div className='todoInputContainer'>
        <DatePicker
       
          selected={date ? new Date(date) : null}
          onChange={(date) => setDate(date ? date.toISOString() : '')}
          className='datePicker'
          placeholderText='Выберите дату'
          showTimeSelect
          timeCaption="Время"
           locale={ru}
          timeIntervals={15}
          showIcon
          dateFormat="dd/MM/yyyy HH:mm"
          timeFormat='HH:mm'
          minDate={subDays(new Date(), 0)}
          calendarClassName='large-calendar'
          //  inputProps={{ readOnly: true, inputMode: 'none' }}
          customInputRef=''
/>

        <input
          className='todoInput'
          placeholder='Введите текст вашего дела'
          name='todoInput'
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className='AddTodoButton' type='button'


          onClick={() => {

            setTimeout(() => {
              addTodoHandler();
            }, 0);
          }}

        >
          Добавить
        </button>
      </div>
      <ul>
        {Object.entries(sortedGroupedTodos).map(([date, todos]) => (
          <li key={date}>
            <h3 className='title-h3'>{date}</h3>
            <ul className='todoList'>
              {todos.map((todo) => (

                <li className={`todoItem ${todo.completed ? 'completed' : ''}`} key={todo.id}>
                  <span className='todoDate'>{todo.date ? `${todo.date.getHours() < 10 ? `0${todo.date.getHours()}` : todo.date.getHours()}:${todo.date.getMinutes() < 10 ? `0${todo.date.getMinutes()}` : todo.date.getMinutes()}` : 'no time'}</span>
                  <input className="todoCheckbox" type="checkbox" checked={todo.completed} onChange={() => toggleTodoHandler(todo.id)} />
                  <span className={`todoText ${todo.completed ? 'completed' : ''}`}>{todo.text}</span>
                  <span style={{ color: 'red', cursor: 'pointer', fontSize: '32px' }} onClick={() => removeTodoHandler(todo.id)}>&times;</span>
                </li>
              ))}
            </ul>

          </li>
        ))}
      </ul>
      {todos.length === 0 && <p>Список дел пуст. Добавьте новое дело!</p>}
    </div>

  )
}

export default App
