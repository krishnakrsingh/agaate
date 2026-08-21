import type { ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export function CmsDragHandle({ id }: { id: string | number }) {
  const { attributes, listeners, setActivatorNodeRef, isDragging } = useSortable({ id });
  return (
    <button
      type="button"
      ref={setActivatorNodeRef}
      className={cn(
        "cursor-grab rounded p-1 text-muted-foreground hover:bg-muted active:cursor-grabbing",
        isDragging && "opacity-50",
      )}
      {...attributes}
      {...listeners}
      aria-label="Drag to reorder"
    >
      <GripVertical className="h-4 w-4" />
    </button>
  );
}

export function CmsSortableRow({
  id,
  children,
  className,
}: {
  id: string | number;
  children: ReactNode;
  className?: string;
}) {
  const { setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <tr
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(isDragging && "bg-muted/50", className)}
    >
      {children}
    </tr>
  );
}

export function CmsSortableProvider<T extends { id: number }>({
  items,
  onReorder,
  children,
}: {
  items: T[];
  onReorder: (ids: number[]) => void;
  children: ReactNode;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const next = arrayMove(items, oldIndex, newIndex);
    onReorder(next.map((i) => i.id));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
