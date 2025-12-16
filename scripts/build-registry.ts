import * as fs from "fs/promises"
import * as path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, "..")
const OUTPUT_DIR = path.resolve(ROOT_DIR, "public/r")

interface RegistryFile {
    path: string
    type: string
}

interface RegistryItem {
    name: string
    type: string
    description?: string
    dependencies?: string[]
    devDependencies?: string[]
    registryDependencies?: string[]
    files: RegistryFile[]
}

interface Registry {
    name: string
    homepage: string
    items: RegistryItem[]
}

async function buildRegistry() {
    console.log("Building registry...")

    const registryPath = path.resolve(ROOT_DIR, "registry.json")
    const registryContent = await fs.readFile(registryPath, "utf-8")
    const registry: Registry = JSON.parse(registryContent)

    await fs.mkdir(OUTPUT_DIR, { recursive: true })

    const index: Array<{
        name: string
        type: string
        description?: string
        dependencies?: string[]
        registryDependencies?: string[]
    }> = []

    for (const item of registry.items) {
        console.log(`  Building ${item.name}...`)

        const filesWithContent = await Promise.all(
            item.files.map(async (file) => {
                const filePath = path.resolve(ROOT_DIR, file.path)
                const content = await fs.readFile(filePath, "utf-8")
                return {
                    path: file.path,
                    content,
                    type: file.type,
                }
            })
        )

        const outputItem = {
            $schema: "https://ui.shadcn.com/schema/registry-item.json",
            name: item.name,
            type: item.type,
            description: item.description,
            dependencies: item.dependencies,
            devDependencies: item.devDependencies,
            registryDependencies: item.registryDependencies,
            files: filesWithContent,
        }

        const outputPath = path.resolve(OUTPUT_DIR, `${item.name}.json`)
        await fs.writeFile(outputPath, JSON.stringify(outputItem, null, 2), "utf-8")

        index.push({
            name: item.name,
            type: item.type,
            description: item.description,
            dependencies: item.dependencies,
            registryDependencies: item.registryDependencies,
        })
    }

    const indexPath = path.resolve(OUTPUT_DIR, "index.json")
    await fs.writeFile(indexPath, JSON.stringify(index, null, 2), "utf-8")

    console.log(`\nBuilt ${registry.items.length} registry items to ${OUTPUT_DIR}`)
    console.log("Done!")
}

buildRegistry().catch(console.error)
