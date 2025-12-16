"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const popoverCode = `"use client"

import * as React from "react"
import { Popover as BasePopover } from "@base-ui/react/popover"
import { cn } from "@/lib/utils"

const Popover = BasePopover.Root

const PopoverTrigger = BasePopover.Trigger

type PopoverContentProps = React.ComponentPropsWithoutRef<typeof BasePopover.Popup> & {
    align?: "start" | "center" | "end"
    sideOffset?: number
}

const PopoverContent = React.forwardRef<
    React.ComponentRef<typeof BasePopover.Popup>,
    PopoverContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <BasePopover.Portal>
        <BasePopover.Positioner sideOffset={sideOffset} align={align}>
            <BasePopover.Popup
                ref={ref}
                className={cn(
                    "z-50 w-72 rounded-base border-2 border-border bg-bw p-4 text-text shadow-brutal outline-none transition-[transform,scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
                    className
                )}
                {...props}
            />
        </BasePopover.Positioner>
    </BasePopover.Portal>
))
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }`

export default function PopoverPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Popover</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Displays rich content in a portal, triggered by a button.
                </p>
            </section>

            <ComponentPreview code={popoverCode}>
                <Popover>
                    <PopoverTrigger render={<Button />}>Open Popover</PopoverTrigger>
                    <PopoverContent>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-bold leading-none">Dimensions</h4>
                                <p className="text-sm text-black">
                                    Set the dimensions for the layer.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="width" className="text-sm font-bold">Width</label>
                                    <input
                                        id="width"
                                        defaultValue="100%"
                                        className="col-span-2 h-8 border-2 border-black px-2 text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="maxWidth" className="text-sm font-bold">Max. width</label>
                                    <input
                                        id="maxWidth"
                                        defaultValue="300px"
                                        className="col-span-2 h-8 border-2 border-black px-2 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Installation</h2>
                <CodeBlock code={`npm install @base-ui/react`} language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Accessibility</h2>
                <ul className="space-y-2 list-disc list-inside font-bold">
                    <li>Follows WAI-ARIA Popover pattern</li>
                    <li>Focus management handled by Radix UI</li>
                    <li>Keyboard navigation support (Esc to close)</li>
                    <li>Screen reader announcements</li>
                </ul>
            </div>
        </div>
    )
}
