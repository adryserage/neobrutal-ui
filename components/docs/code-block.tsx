"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"
import { Highlight, themes } from "prism-react-renderer"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string
    language?: string
}

export function CodeBlock({ code, language = "tsx", className, ...props }: CodeBlockProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    const onCopy = () => {
        navigator.clipboard.writeText(code)
        setHasCopied(true)
        setTimeout(() => setHasCopied(false), 2000)
    }

    return (
        <div className={cn("relative group rounded-base border-2 border-border bg-neutral-950 text-neutral-50 font-mono text-sm", className)} {...props}>
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Button
                    size="icon"
                    variant="neutral"
                    className="h-8 w-8 border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200"
                    onClick={onCopy}
                >
                    {hasCopied ? (
                        <CheckIcon className="h-4 w-4" />
                    ) : (
                        <CopyIcon className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy code</span>
                </Button>
            </div>
            <div className="overflow-x-auto p-4">
                <Highlight
                    theme={themes.dracula}
                    code={code}
                    language={language}
                >
                    {({ style, tokens, getLineProps, getTokenProps }) => (
                        <pre style={{ ...style, background: "transparent" }}>
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })}>
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </div>
        </div>
    )
}
