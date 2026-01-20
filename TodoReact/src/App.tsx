import { useState } from 'react'
import DatePicker from 'react-datepicker';
import { subDays } from 'date-fns';
import {ru} from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

import { v4 as uuidv4 } from 'uuid';
import './App.css'
import {SelectComponent} from './componenets/Select/Select';
import type { Option } from './componenets/Select/Select';

export interface Todo {
  id: string
  text: string
  priority: Option | null
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
  const options: Option[] = [
    { value: 'Макияж', label: 'Макияж' },
    { value: 'Макияж и укладка', label: 'Макияж и укладка' },
    { value: 'Брови', label: 'Брови' },
    { value: 'Брови и ресницы', label: 'Брови и ресницы' },
    { value: 'Ресницы', label: 'Ресницы' },
  ];

  const [text, setText] = useState<string>('')
  const [date, setDate] = useState<string>(new Date().toISOString())
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);


  
 
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
      priority: selectedOption,
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


  // const sortedGroupedTodos = Object.keys(groupedTodos).sort((a, b) => {

  //   const dateA = a === 'no-date' ? new Date(0) : new Date(a.split('.').reverse().join(','));
  //   const dateB = b === 'no-date' ? new Date(0) : new Date(b.split('.').reverse().join(','));
   
  //   return dateA.getTime() - dateB.getTime();
  // }).reduce<Record<string, Todo[]>>((acc, key) => {
  //   acc[key] = groupedTodos[key];
  //   return acc;
  // }, {});
const sortedGroupedTodos = Object.keys(groupedTodos)
  .sort((a, b) => {
    const parse = (s: string) => {
      if (s === 'no-date') return new Date(0);
      const [dStr, mStr, yStr] = s.split('.');
      const d = Number(dStr);
      const m = Number(mStr);
      const y = Number(yStr);

    
      if (!Number.isFinite(d) || !Number.isFinite(m) || !Number.isFinite(y)) return new Date(0);
      return new Date(y, m - 1, d);
    };

    const dateA = parse(a);
    const dateB = parse(b);

    return dateA.getTime() - dateB.getTime();
  })
  .reduce<Record<string, Todo[]>>((acc, key) => {
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
   <SelectComponent
          options={options}
          value={selectedOption}
          onChange={setSelectedOption}
         
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
              {todos.sort((a, b) => {
                const dateA = a.date ? new Date(a.date) : new Date(0);
                const dateB = b.date ? new Date(b.date) : new Date(0);
                return dateA.getTime() - dateB.getTime();
              }).map((todo) => (

                <li className={`todoItem ${todo.completed ? 'completed' : ''}`} key={todo.id}>
                  <span className='todoDate'>{todo.date ? `${todo.date.getHours() < 10 ? `0${todo.date.getHours()}` : todo.date.getHours()}:${todo.date.getMinutes() < 10 ? `0${todo.date.getMinutes()}` : todo.date.getMinutes()}` : 'no time'}</span>
                  <input className="todoCheckbox" type="checkbox" checked={todo.completed} onChange={() => toggleTodoHandler(todo.id)} />
                  <div className='todoTextContainer'>
                    <span className="todoPriority">{todo.priority ? `${todo.priority.label} ` : ''}</span>
                      <span className={`todoText ${todo.completed ? 'completed' : ''}`}>{todo.text}</span>
                  </div>
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
