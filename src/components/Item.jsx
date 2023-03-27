import React, { useState, useRef, Fragment } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../data/types";
import Task from "./Task";
import Window from "./Window";

const Item = ({ id, item, index, status, moveItem }) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes,
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
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes, id, index, ...item },
    type: ItemTypes,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const onOpen = () => {
    setShow(true);
  };
  const onClose = () => {
    setShow(false);
  };

  return (
    <Fragment>
      <div ref={ref} style={{ opacity }} onClick={onOpen}>
        <Task item={item} status={status} id={item.id} />
      </div>

      <Window onClose={onClose} show={show}></Window>
    </Fragment>
  );
};

export default Item;
