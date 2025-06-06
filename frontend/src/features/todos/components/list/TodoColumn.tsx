import { useState } from "react"
import { useDrop } from "react-dnd"
import { cn } from "@/lib/utils"
import { Todo, DragItem } from "@/features/todos/schemas/TodoSchema"
import { DraggableTodoCard } from "./DraggableTodoCard"
import { NewTodoButton } from "@/shared/button/NewTodoButton"
import { CreateTodoDialog } from "@/features/todos/components/dialogs/CreateTodoDialog"
import { EditTodoDialog } from "@/features/todos/components/dialogs/EditTodoDialog"

// タスク列コンポーネント
export function TodoColumn({
    title,
    status,
    color,
    bgColor,
    hoverColor,
    todos,
    count,
    onMoveTodo,
    onDuplicateButton,
    onCompleteButton,
    onDeleteButton,
    emoji = "",
}: {
    title: string
    status: "not_started" | "in_progress" | "completed" | "deleted"
    color: string
    bgColor: string
    hoverColor: string
    todos: Todo[]
    count: number
    onMoveTodo: (todoId: string, status: "not_started" | "in_progress" | "completed" | "deleted") => void
    onDuplicateButton: (todoId: string) => void
    onCompleteButton?: (todoId: string) => void
    onDeleteButton?: (todoId: string) => void
    emoji?: string
}) {
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

    const handleCardClick = (todo: Todo) => {
        setSelectedTodo(todo)
    }

    const handleCloseDialog = () => {
        setSelectedTodo(null)
    }

    // ドロップ処理の設定
    const [{ isOver }, drop] = useDrop({
        accept: "todo",
        drop: (item: DragItem) => {
        if (item.status !== status) {
            onMoveTodo(item.id, status)
        }
        },
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver(),
        }),
    })

    return (
        <div className="space-y-4">
            {/* ラベル部分 */}
            <div className="flex items-center justify-between mb-2">
                {/* 左寄せ：タイトル・emoji・カウント */}
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${color}`}></div>
                    <h2 className="font-medium">
                    {title} {emoji}
                    </h2>
                    <span className="text-gray-500 ml-2">{count}</span>
                </div>
                {/* 新規作成ボタン */}
                <CreateTodoDialog 
                    trigger={<NewTodoButton onClick={() => {}} className={cn(bgColor, hoverColor)} />}
                    status={status}
                />
            </div>
            {/* ドロップエリア */}
            <div
                ref={(node) => {
                    if (node) drop(node)
                }}
                className={cn(bgColor, "rounded-lg p-4 min-h-[500px] transition-colors", isOver && "ring-2 ring-blue-400")}
            >

                {/* タスクの一覧 */}
                {[...todos]
                    .sort((a, b) => {
                        if (a.dueDate && b.dueDate) {
                            return a.dueDate.getTime() - b.dueDate.getTime()
                        } else if (a.dueDate) {
                            return -1
                        } else if (b.dueDate) {
                            return 1
                        } else {
                            return 0
                        }
                    })
                    .map((todo) => (
                        <DraggableTodoCard 
                            key={todo.id}
                            todo={todo}
                            onDuplicateButton={onDuplicateButton}
                            onCompleteButton={onCompleteButton}
                            onDeleteButton={onDeleteButton}
                            onCardClick={() => handleCardClick(todo)}
                        />
                    ))
                }
                {/* 編集ダイアログ */}
                {selectedTodo && (
                    <EditTodoDialog
                    todo={selectedTodo}
                    open={!!selectedTodo}
                    onClose={handleCloseDialog}
                    />
                )}
            </div>
        </div>
    )
}