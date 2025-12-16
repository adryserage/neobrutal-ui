import { z } from "zod"
import { REGISTRY_URL } from "./config.js"

export const registryItemFileSchema = z.object({
    path: z.string(),
    content: z.string(),
    type: z.enum(["registry:ui", "registry:lib", "registry:hook", "registry:component"]),
})

export const registryItemSchema = z.object({
    name: z.string(),
    type: z.enum(["registry:ui", "registry:lib", "registry:hook", "registry:component", "registry:style"]),
    description: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    devDependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    files: z.array(registryItemFileSchema),
    tailwind: z.object({
        config: z.record(z.unknown()).optional(),
    }).optional(),
    cssVars: z.record(z.record(z.string())).optional(),
    docs: z.string().optional(),
})

export const registryIndexSchema = z.array(
    z.object({
        name: z.string(),
        type: z.enum(["registry:ui", "registry:lib", "registry:hook", "registry:component", "registry:style"]),
        description: z.string().optional(),
        dependencies: z.array(z.string()).optional(),
        registryDependencies: z.array(z.string()).optional(),
    })
)

export type RegistryItem = z.infer<typeof registryItemSchema>
export type RegistryIndex = z.infer<typeof registryIndexSchema>

export async function getRegistryIndex(): Promise<RegistryIndex> {
    const response = await fetch(`${REGISTRY_URL}/index.json`)

    if (!response.ok) {
        throw new Error(`Failed to fetch registry index: ${response.statusText}`)
    }

    const json = await response.json()
    return registryIndexSchema.parse(json)
}

export async function getRegistryItem(name: string): Promise<RegistryItem> {
    const response = await fetch(`${REGISTRY_URL}/${name}.json`)

    if (!response.ok) {
        throw new Error(`Component "${name}" not found in registry`)
    }

    const json = await response.json()
    return registryItemSchema.parse(json)
}

export async function getRegistryItems(names: string[]): Promise<RegistryItem[]> {
    const items: RegistryItem[] = []

    for (const name of names) {
        const item = await getRegistryItem(name)
        items.push(item)
    }

    return items
}

export async function resolveRegistryDependencies(
    items: RegistryItem[]
): Promise<RegistryItem[]> {
    const resolved = new Map<string, RegistryItem>()
    const queue = [...items]

    while (queue.length > 0) {
        const item = queue.shift()!

        if (resolved.has(item.name)) {
            continue
        }

        resolved.set(item.name, item)

        if (item.registryDependencies?.length) {
            for (const dep of item.registryDependencies) {
                if (!resolved.has(dep)) {
                    const depItem = await getRegistryItem(dep)
                    queue.push(depItem)
                }
            }
        }
    }

    return Array.from(resolved.values())
}
