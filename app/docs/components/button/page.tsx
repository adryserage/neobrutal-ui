"use client"

import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const buttonCode = `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-bold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-border",
    {
        variants: {
            variant: {
                default: "bg-main text-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
                noShadow: "bg-main text-black border-2 border-border",
                neutral: "bg-bw text-text shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
                primary: "bg-main text-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
                reverse: "bg-text text-bw shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-neutral-800",
                outline: "bg-bw text-text border-2 border-border hover:bg-neutral-100",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-11 px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }`

export default function ButtonPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black">Button</h1>
                <p className="text-xl text-neutral-600">
                    A versatile button component with multiple variants and sizes. Core component for triggering actions.
                </p>
            </div>

            <ComponentPreview code={buttonCode}>
                <div className="flex flex-wrap items-center gap-4">
                    <Button variant="default">Default</Button>
                    <Button variant="neutral">Neutral</Button>
                    <Button variant="reverse">Reverse</Button>
                    <Button variant="outline">Outline</Button>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Installation</h2>
                <div className="space-y-4">
                    <p>Copy the source code into <code className="bg-neutral-200 px-1 py-0.5 rounded">components/ui/button.tsx</code>:</p>
                    <CodeBlock code={buttonCode} />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Usage</h2>
                <CodeBlock code={`import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Click me</Button>
}`} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Examples</h2>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Variants</h3>
                    <p className="text-neutral-600">Different styles for different contexts.</p>
                    <ComponentPreview code={`<div className="flex flex-wrap gap-4">
  <Button variant="default">Default</Button>
  <Button variant="neutral">Neutral</Button>
  <Button variant="reverse">Reverse</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="noShadow">No Shadow</Button>
</div>`}>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="default">Default</Button>
                            <Button variant="neutral">Neutral</Button>
                            <Button variant="reverse">Reverse</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="noShadow">No Shadow</Button>
                        </div>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Sizes</h3>
                    <p className="text-neutral-600">Different sizes for different contexts.</p>
                    <ComponentPreview code={`<div className="flex items-center gap-4">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon">🔍</Button>
</div>`}>
                        <div className="flex flex-wrap items-center gap-4">
                            <Button size="sm">Small</Button>
                            <Button size="default">Default</Button>
                            <Button size="lg">Large</Button>
                            <Button size="icon">🔍</Button>
                        </div>
                    </ComponentPreview>
                </div>
            </div>
        </div>
    )
}
