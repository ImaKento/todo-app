import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

// 新しいタスク追加ボタン
export function NewTodoButton({ onClick, className }: { onClick: any,  className?: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-[200px] py-3 flex items-center justify-center text-black rounded-lg mt-3 transition-colors",
                className,
            )}
        >
        <Plus className="h-4 w-4 mr-2" />
        <span>New Todo</span>
        </button>
    )
}