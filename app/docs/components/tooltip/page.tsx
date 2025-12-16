"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const tooltipCode = `"use client"

import * as React from "react"
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import { cn } from "@/lib/utils"

const TooltipProvider = BaseTooltip.Provider

const Tooltip = BaseTooltip.Root

const TooltipTrigger = BaseTooltip.Trigger

type TooltipContentProps = React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup> & {
    sideOffset?: number
}

const TooltipContent = React.forwardRef<
    React.ComponentRef<typeof BaseTooltip.Popup>,
    TooltipContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
    <BaseTooltip.Portal>
        <BaseTooltip.Positioner sideOffset={sideOffset}>
            <BaseTooltip.Popup
                ref={ref}
                className={cn(
                    "z-50 overflow-hidden rounded-base border-2 border-border bg-black px-3 py-1.5 text-xs text-white transition-[transform,scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
                    className
                )}
                {...props}
            />
        </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
))
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }`

export default function TooltipPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Tooltip</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A small, floating label that appears on hover. Perfect for contextual information and help text.
                </p>
            </section>

            <ComponentPreview code={tooltipCode}>
                <TooltipProvider>
                    <div className="flex gap-4">
                        <Tooltip>
                            <TooltipTrigger render={<Button />}>Hover me</TooltipTrigger>
                            <TooltipContent>This is helpful information</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger render={<Button variant="neutral" />}>More info</TooltipTrigger>
                            <TooltipContent side="bottom">Tooltip appears below button</TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>Smart positioning:</strong> Automatically adjusts side (top/bottom/left/right)</li>
                    <li><strong>Hover trigger:</strong> Appears on hover, disappears on blur</li>
                    <li><strong>Animated:</strong> Smooth fade-in and zoom animation</li>
                    <li><strong>Provider wrapper:</strong> Requires TooltipProvider at app root</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Positioning</h2>
                <p className="text-black mb-4">
                    Tooltips can appear on different sides of the trigger. They auto-flip to stay visible.
                </p>
                <TooltipProvider>
                    <div className="flex flex-wrap gap-4">
                        <Tooltip>
                            <TooltipTrigger render={<Button size="sm" />}>Top</TooltipTrigger>
                            <TooltipContent side="top">Tooltip on top</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger render={<Button size="sm" />}>Bottom</TooltipTrigger>
                            <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger render={<Button size="sm" />}>Left</TooltipTrigger>
                            <TooltipContent side="left">Tooltip on left</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger render={<Button size="sm" />}>Right</TooltipTrigger>
                            <TooltipContent side="right">Tooltip on right</TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Setup</h2>
                <p className="text-black mb-2">
                    Tooltips require a <code className="bg-neutral-200 px-1 py-0.5 rounded">TooltipProvider</code> wrapper at your app root:
                </p>
                <CodeBlock code={`// app/layout.tsx
import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}`} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Accessibility</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>No forced tooltips:</strong> Not the only way to get information</li>
                    <li><strong>Keyboard support:</strong> Hover/focus triggers tooltip</li>
                    <li><strong>Short content:</strong> Keep text concise (1-2 lines ideal)</li>
                    <li><strong>High contrast:</strong> Black on white is highly accessible</li>
                    <li><strong>Screen readers:</strong> Use aria-label on trigger if needed</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-black mb-2">Install dependency:</p>
                <CodeBlock code="npm install @base-ui/react" language="bash" />
                <p className="text-black mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/tooltip.tsx</code>:</p>
                <CodeBlock code={tooltipCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>Hover for help</button>
        </TooltipTrigger>
        <TooltipContent>This explains the button</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`} />
            </div>
        </div>
    )
}
