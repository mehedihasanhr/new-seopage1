import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ColumnTypes } from "../data/types";
import Window from "./Window";

const DragableCol = ({ children, index, moveCol }) => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);
    

    const [, drop] = useDrop({
        accept: ColumnTypes,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientX = clientOffset.x - hoverBoundingRect.left;
            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return;
            }
            moveCol(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },

    });


    const [{ isDragging }, drag] = useDrag({
        item: { type: ColumnTypes, index },
        type: ColumnTypes,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const onOpen = () => { setShow(true); };
    const onClose = () => { setShow(false); };

    return (
        <>
            <div ref={ref} onClick={onOpen} style={{opacity}}>
                {children}
            </div>
            <Window
                onClose = {onClose}
                show = {show}
            > {children} </Window>
        </>
    );
};

export default DragableCol;