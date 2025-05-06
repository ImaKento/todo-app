import { TodoColumn } from "@/features/todos/components/list/TodoColumn"
import { DeletedTodoColumn } from "@/features/todos/components/list/DeletedTodoColumn"
import { useUpdateTodo } from "@/features/todos/hooks/useFilterTodo"
import { Todo } from "@/features/todos/schemas/TodoSchema";

type Props = {
    todos: Todo[]
}

export default function SearchList({ todos }: Props) {
    const { useDuplicateTodo, useMoveTodo, useMoveCompleteTodo, useDeleteTodo } = useUpdateTodo()
    
    return (
        <>
            {/* カンバンボード */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 未着手列 */}
                <TodoColumn
                    title="未着手"
                    status="not_started"
                    color="bg-red-500"
                    bgColor="bg-red-50"
                    hoverColor="hover:bg-red-100"
                    todos={todos.filter(t => t.status === "not_started")}
                    count={todos.filter(t => t.status === "not_started").length}
                    onMoveTodo={useMoveTodo}
                    onDuplicateButton={useDuplicateTodo}
                    onCompleteButton={useMoveCompleteTodo}
                    onDeleteButton={useDeleteTodo}
                />

                {/* 進行中列 */}
                <TodoColumn
                    title="進行中"
                    status="in_progress"
                    color="bg-blue-500"
                    bgColor="bg-blue-50"
                    hoverColor="hover:bg-blue-100"
                    todos={todos.filter(t => t.status === "in_progress")}
                    count={todos.filter(t => t.status === "in_progress").length}
                    onMoveTodo={useMoveTodo}
                    onDuplicateButton={useDuplicateTodo}
                    onCompleteButton={useMoveCompleteTodo}
                    onDeleteButton={useDeleteTodo}
                />

                {/* 完了列 */}
                <TodoColumn
                    title="完了"
                    status="completed"
                    color="bg-green-500"
                    bgColor="bg-green-50"
                    hoverColor="hover:bg-green-100"
                    todos={todos.filter(t => t.status === "completed")}
                    count={todos.filter(t => t.status === "completed").length}
                    onMoveTodo={useMoveTodo}
                    onDuplicateButton={useDuplicateTodo}
                    onDeleteButton={useDeleteTodo}
                    emoji="🎉"
                />
            </div>
            <div className="mt-4 mb-4">
                {/* 削除済み */}
                <DeletedTodoColumn
                    title="削除済み"
                    status="deleted"
                    color="bg-gray-500"
                    bgColor="bg-gray-50"
                    todos={todos.filter(t => t.status === "deleted")}
                    count={todos.filter(t => t.status === "deleted").length}
                    onMoveTodo={useMoveTodo}
                />
            </div>
        </>
    )
}

