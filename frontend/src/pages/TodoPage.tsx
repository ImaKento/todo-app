import { useEffect } from "react"
import { Toaster } from "sonner"
import { SidebarProvider } from "@/components/ui/sidebar"
import TodoList from "@/features/todos/components/list/TodoList"
import { useTodoContext } from "@/contexts/TodoContext"
import { TodoHeader } from "@/shared/header/TodoHeader"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export default function TodoPage() {
  const { todos, fetchAllTodos } = useTodoContext()
  

  useEffect(() => {
    const fetch = async () => {
      await fetchAllTodos()
    }
    fetch()
  }, [])

  return (
    <SidebarProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="container mx-auto p-4">
          <TodoHeader />
          <TodoList todos={todos} />
          <Toaster richColors position="top-center" />
        </div>
      </DndProvider>
    </SidebarProvider>
    
  )
}
