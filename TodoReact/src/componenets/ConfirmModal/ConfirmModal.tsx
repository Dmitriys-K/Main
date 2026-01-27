import { Popconfirm } from 'antd';
import React from 'react';

// import './ConfirmModal.css';
// export type Task = {
//   id: number ;
// //   title: string;
// };

type props = {
  task?: { id: string }  ;
  onDelete: (id: string) => void;
    children: React.ReactNode;
    title?: string;
};

export const ConfirmModal: React.FC<props> = ({ task, onDelete, children, title = "Вы уверены, что хотите удалить эту задачу?" }) => {
    return (
        <Popconfirm
            title={title}
            onConfirm={() => onDelete(task?.id ? task?.id : '')}
            okText="Да"
            cancelText="Нет"
        >
            {/* <Button type="primary" danger>
                &times;
            </Button> */}
            {children}
        </Popconfirm>
    );
}