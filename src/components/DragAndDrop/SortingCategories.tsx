"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable,  type DropResult, } from "@hello-pangea/dnd";
import { reorderCategoriesAction } from "../../../action/action";


interface Category {
  id: string;
  title: string;
}

export default function CategorySortList({ categories }: { categories: Category[] }) {
  const [items, setItems] = useState(categories);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(items);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setItems(reordered);

    const orderedIds = reordered.map((c) => c.id);
    await reorderCategoriesAction(orderedIds);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {items.map((cat, index) => (
                <Draggable key={cat.id} draggableId={cat.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-3 bg-gray-100 dark:bg-gray-800 rounded border cursor-grab"
                    >
                      {cat.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
