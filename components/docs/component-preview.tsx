"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string
    children: React.ReactNode
}

export function ComponentPreview({ code, children, className, ...props }: ComponentPreviewProps) {
    const [view, setView] = React.useState<"preview" | "code">("preview")

    return (
        <div className={cn("border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-bw", className)} {...props}>
            <div className="flex border-b-2 border-black divide-x-2 divide-black">
                <button
                    onClick={() => setView("preview")}
                    className={cn(
                        "flex-1 py-2 text-sm font-medium uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset",
                        view === "preview" ? "bg-main" : "bg-bw hover:bg-main/30"
                    )}
                >
                    Preview
                </button>
                <button
                    onClick={() => setView("code")}
                    className={cn(
                        "flex-1 py-2 text-sm font-medium uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset",
                        view === "code" ? "bg-main" : "bg-bw hover:bg-main/30"
                    )}
                >
                    Code
                </button>
            </div>

            <div className="bg-bw">
                {view === "preview" ? (
                    <div className="p-4 min-h-[200px] flex items-center justify-center">
                        {children}
                    </div>
                ) : (
                    <CodeBlock
                        code={code}
                        className="border-0 rounded-none shadow-none m-0"
                    />
                )}
            </div>
        </div>
    )
}
