"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CaretDown } from "@phosphor-icons/react"

const AccordionContext = React.createContext<{
    activeItem: string | undefined
    setActiveItem: (value: string | undefined) => void
} | null>(null)

const AccordionItemContext = React.createContext<{
    value: string
} | null>(null)

const Accordion = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        type?: "single" | "multiple"
        collapsible?: boolean
        defaultValue?: string
    }
>(({ className, type = "single", collapsible = false, defaultValue, children, ...props }, ref) => {
    const [activeItem, setActiveItem] = React.useState<string | undefined>(defaultValue)

    const handleSetActiveItem = (value: string | undefined) => {
        if (type === "single") {
            if (activeItem === value && collapsible) {
                setActiveItem(undefined)
            } else {
                setActiveItem(value)
            }
        }
        // Multiple not implemented in this simple version for brevity
    }

    return (
        <AccordionContext.Provider value={{ activeItem, setActiveItem: handleSetActiveItem }}>
            <div ref={ref} className={className} {...props}>
                {children}
            </div>
        </AccordionContext.Provider>
    )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => (
    <AccordionItemContext.Provider value={{ value }}>
        <div
            ref={ref}
            className={cn("border-b-2 border-black", className)}
            {...props}
        >
            {children}
        </div>
    </AccordionItemContext.Provider>
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const { activeItem, setActiveItem } = React.useContext(AccordionContext)!
    const { value } = React.useContext(AccordionItemContext)!
    const isOpen = activeItem === value

    return (
        <div className="flex">
            <button
                ref={ref}
                onClick={() => setActiveItem(value)}
                className={cn(
                    "flex flex-1 items-center justify-between py-4 font-bold transition-all hover:underline",
                    className
                )}
                {...props}
            >
                {children}
                <CaretDown
                    className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
                />
            </button>
        </div>
    )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { activeItem } = React.useContext(AccordionContext)!
    const { value } = React.useContext(AccordionItemContext)!
    const isOpen = activeItem === value

    if (!isOpen) return null

    return (
        <div
            ref={ref}
            className={cn("overflow-hidden text-sm transition-all", className)}
            {...props}
        >
            <div className="pb-4 pt-0">{children}</div>
        </div>
    )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
