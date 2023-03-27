import * as React from 'react';
import { useDrop, useDrag  } from 'react-dnd';
import { ItemTypes } from '../data/types';
import { tasks, columns} from '../data/data';

const DropWrapper = ({ onDrop, children, status }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes,
        canDrop: (item, monitor) =>{
            return true;
        },
        drop: (item , monitor) => {
            onDrop(item, monitor, status);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} className="drop-wrapper w-96 min-h-[300px] max-h-full bg-gray-300">
            <div className=''>
                <h3>{status}</h3>
            </div>
            {React.cloneElement(children, { isOver })}
        </div>
    );
}

export default DropWrapper;