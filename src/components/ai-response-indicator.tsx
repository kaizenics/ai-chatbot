import { AlertCircle, Loader2 } from "lucide-react"

interface AIResponseIndicatorProps {
  isLoading?: boolean
  isError?: boolean
}

export function AIResponseIndicator({ isLoading, isError }: AIResponseIndicatorProps) {
  if (isError) {
    return (
      <div className="flex items-center gap-2 text-destructive animate-in fade-in">
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm">Something went wrong. Please try again.</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground animate-in fade-in">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">AI is thinking...</span>
      </div>
    )
  }

  return null
}
