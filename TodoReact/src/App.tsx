import { useState } from 'react'
import DatePicker from 'react-datepicker';
import { subDays } from 'date-fns';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import { SelectComponent } from './componenets/Select/Select';
import type { Option } from './componenets/Select/Select';
import Button from './componenets/Button/Button';
import { ConfirmModal } from './componenets/ConfirmModal/ConfirmModal';


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
    // При использовании AnimatePresence можно удалять элемент сразу —
    // фреймер выполнит exit-анимацию.
    setTodos(prev => {
      const next = prev.filter(todo => todo.id !== id);
      try {
        localStorage.setItem('todos', JSON.stringify(next));
      } catch (e) {
        console.error('Ошибка сохранения в localStorage после удаления', e);
      }
      return next;
    });

  }

  const toggleTodoHandler = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    localStorage.setItem('todos', JSON.stringify(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)));

  }

  const removeAllTodosHandler = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  }

  const groupedTodos = todos.reduce<Record<string, Todo[]>>((acc, todo) => {
    const key = todo.date ? todo.date.toLocaleDateString().slice(0, 10) : 'no-date';

    if (!acc[key]) acc[key] = [];
    acc[key].push(todo);

    return acc;
  }, {});


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

  const parseGroupKeyToDate = (key: string): Date | null => {
    if (key === 'no-date') return null;
    const parts = key.split('.');
    if (parts.length !== 3) return null;
    const [dStr, mStr, yStr] = parts;
    const d = Number(dStr), m = Number(mStr), y = Number(yStr);
    if (!Number.isFinite(d) || !Number.isFinite(m) || !Number.isFinite(y)) return null;
    return new Date(y, m - 1, d);
  };


  return (
    <div className="TodoApp">
      <header className='header'>
        <h1>Список дел</h1>
        <ConfirmModal onDelete={removeAllTodosHandler} title="Вы уверены, что хотите удалить все задачи?">
             <span style={{ color: 'red', cursor: 'pointer', fontSize: '32px', transform: 'translateY(-10px)' }}>&times;</span>
         
        </ConfirmModal>
      </header>
    
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
          customInputRef=''
                // calendarStartDay={1}
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
        <Button onClick={addTodoHandler} variant="primary">Добавить</Button>

      </div>
      <ul>
        <AnimatePresence initial={true}>
          {Object.entries(sortedGroupedTodos).map(([date, todos]) => (
            <motion.li
              layout
              className='groupWrapper'
              key={date}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.25 }}
            // style={{ transformOrigin: 'top' }}
            >

              {/* <h3 className='title-h3'>{date}</h3> */}
              <h3 className='title-h3'>
                {date}
                {date !== 'no-date' && (() => {
                  const d = parseGroupKeyToDate(date);
                  const weekday = d ? format(d, 'EEEE', { locale: ru }) : '';
                  return (
                    <span style={{ marginLeft: 8, color: 'var(--primary-hover)', fontSize: '0.8em', fontStyle: 'italic'}}>
                      {weekday}
                    </span>
                  );
                })()}
              </h3>
              <ul className='todoList'>
                <AnimatePresence initial={true}>
                  {todos.sort((a, b) => {
                    const dateA = a.date ? new Date(a.date) : new Date(0);
                    const dateB = b.date ? new Date(b.date) : new Date(0);
                    return dateA.getTime() - dateB.getTime();
                  }).map((todo) => (
                    <motion.li
                      // layout
                      className={`todoItem ${todo.completed ? 'completed' : ''}`}
                      key={todo.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.25 }}
                    >

                          
                      <span className='todoDate'>{todo.date ? `${todo.date.getHours() < 10 ? `0${todo.date.getHours()}` : todo.date.getHours()}:${todo.date.getMinutes() < 10 ? `0${todo.date.getMinutes()}` : todo.date.getMinutes()}` : 'no time'}</span>
                      <input className="todoCheckbox" type="checkbox" checked={todo.completed} onChange={() => toggleTodoHandler(todo.id)} />
                      <div className='todoTextContainer'>
                        <span className="todoPriority">{todo.priority ? `${todo.priority.label} ` : ''}</span>
                        <span className={`todoText ${todo.completed ? 'completed' : ''}`}>{todo.text}</span>
                      </div>
                      <ConfirmModal task={{ id: todo.id }} onDelete={removeTodoHandler} >
                            <span style={{ color: 'red', cursor: 'pointer', fontSize: '32px' }}>&times;</span>
                          </ConfirmModal>
                       {/* <span style={{ color: 'red', cursor: 'pointer', fontSize: '32px' }} onClick={() => removeTodoHandler(todo.id)}>&times;</span> */}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

            </motion.li>
          ))}

        </AnimatePresence>
      </ul>

      {todos.length === 0 && <p>Список дел пуст. Добавьте новое дело!</p>}
    </div>

  )
}

export default App
