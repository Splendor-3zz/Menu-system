"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface IProps {
    id: string;
    item: { title: string };
}
export default function SortableItem({ id, item }: IProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 border mb-2 rounded shadow flex items-center justify-between"
    >
      <span>{item.title}</span>
      <span className="text-gray-500 cursor-grab">☰</span>
    </div>
  );
}
