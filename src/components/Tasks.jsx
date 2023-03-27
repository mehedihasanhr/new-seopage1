import {tasks} from '../data/data'
import Item from './Item';
import Col from './Col'
import { useState } from 'react';
import DropWrapper from './DropWrapper';
import { columns as cols } from '../data/data';
import DragableCol from './DragableCol';
import { useDrop } from 'react-dnd';
import { ColumnTypes } from '../data/types';

const Tasks = () => {
    const [items, setItems] = useState(tasks);
    const [columns, setColumns] = useState(cols);
    
    const onDrop = (item, monitor, status) => {
        const itemIndex = items.findIndex( t => t.id === item.id);
        setItems(p => {
            const newItems = [...p];
            newItems[itemIndex].status = status;
            return newItems;
        });
    };

   

    const moveItem = (dragIndex, hoverIndex) => {
        const dragItem = items[dragIndex];
        setItems(prevState => {
            const newItems = [...prevState];
            newItems.splice(dragIndex, 1);
            newItems.splice(hoverIndex, 0, dragItem);
            return newItems;
        })
    };

    const moveCol = (dragIndex, hoverIndex) => {
        const dragItem = columns[dragIndex];
        setColumns(prevState => {
            const newItems = [...prevState];
            newItems.splice(dragIndex, 1);
            newItems.splice(hoverIndex, 0, dragItem);
            return newItems;
        })
    };
    

    // cols drop
    const [, drop] = useDrop({
        accept: ColumnTypes,
        onDrop: (item, monitor) => {
            console.log(item);
            console.log(monitor);
        },
    });

    // create array of columns based on status

    console.log(columns);
   

    return (
        <div ref={drop} className="tasks flex gap-10"> 
            {columns.map((column, index) => {
                return (
                    <DragableCol key={column} moveCol={moveCol} index={index}>
                        <DropWrapper key={column} onDrop={onDrop} status={column}>
                            <Col status={column}> 
                                {items && items.map((item, index) => {
                                    if (item.status === column) {
                                        return ( 
                                            <Item
                                                key={item.id}
                                                item={item}
                                                index={index}
                                                status={column}
                                                moveItem={moveItem}
                                            />
                                        );
                                    }else {
                                        return null;
                                    }
                                })}
                            </Col>
                        </DropWrapper>
                    </DragableCol>
                );
            })}
        </div>
    )
};


export default Tasks;