import { useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { Toaster } from "sonner"
import { HTML5Backend } from "react-dnd-html5-backend"
import { SidebarProvider } from "@/components/ui/sidebar"
import SearchList from "@/features/todos/components/list/SearchList"
import { useTodoContext } from "@/contexts/TodoContext"
import { TodoHeader } from "@/shared/header/TodoHeader"
import { SearchColumn } from "@/features/todos/components/list/SearchColumn"
import { SearchTodoParams } from "@/features/todos/schemas/TodoSchema"

export default function FilterPage() {
  const { todos, fetchTodosByCondition } = useTodoContext()
  const [searchParams, setSearchParams] = useState<SearchTodoParams>({})
  
  useEffect(() => {
    const fetch = async () => {
      await fetchTodosByCondition(searchParams)
    }
    fetch()
  }, [searchParams])

  return (
    <SidebarProvider>
        <DndProvider backend={HTML5Backend}>
            <div className="container mx-auto p-4">
                <TodoHeader />
                <SearchColumn 
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
                <SearchList todos={todos} />
                <Toaster richColors position="top-center" />
            </div>
        </DndProvider>
    </SidebarProvider>
    
  )
}
