"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"

export default function AppearancePage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <CardContent className="p-0">
          <RadioGroup defaultValue={theme} onValueChange={setTheme} className="space-y-4">
            <label className="flex items-center space-x-4 cursor-pointer">
              <RadioGroupItem value="light" id="light" />
              <Sun className="h-5 w-5" />
              <div>
                <p className="font-medium">Light</p>
                <p className="text-sm text-muted-foreground">Use the light theme</p>
              </div>
            </label>
            <label className="flex items-center space-x-4 cursor-pointer">
              <RadioGroupItem value="dark" id="dark" />
              <Moon className="h-5 w-5" />
              <div>
                <p className="font-medium">Dark</p>
                <p className="text-sm text-muted-foreground">Use the dark theme</p>
              </div>
            </label>
            <label className="flex items-center space-x-4 cursor-pointer">
              <RadioGroupItem value="system" id="system" />
              <Monitor className="h-5 w-5" />
              <div>
                <p className="font-medium">System</p>
                <p className="text-sm text-muted-foreground">Follow system theme</p>
              </div>
            </label>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}
