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
        <div className={cn("relative group rounded-base border-2 border-border bg-black text-white font-mono text-sm", className)} {...props}>
            <div className="absolute right-4 top-4 z-10">
                <Button
                    size="icon"
                    className="h-8 w-8 border-white/60 bg-white/20 hover:bg-black/30 text-white hover:translate-0"
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
