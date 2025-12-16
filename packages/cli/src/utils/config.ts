import path from "path"
import fs from "fs-extra"
import { z } from "zod"

export const REGISTRY_URL = "https://neobrutal-ui-mocha.vercel.app/r"

export const configSchema = z.object({
    $schema: z.string().optional(),
    style: z.string().default("default"),
    rsc: z.boolean().default(true),
    tsx: z.boolean().default(true),
    tailwind: z.object({
        config: z.string().optional(),
        css: z.string(),
        baseColor: z.string().default("neutral"),
        cssVariables: z.boolean().default(true),
        prefix: z.string().optional(),
    }),
    aliases: z.object({
        components: z.string(),
        utils: z.string(),
        ui: z.string().optional(),
        lib: z.string().optional(),
        hooks: z.string().optional(),
    }),
})

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string): Promise<Config | null> {
    const configPath = path.resolve(cwd, "components.json")

    if (!await fs.pathExists(configPath)) {
        return null
    }

    try {
        const configContent = await fs.readFile(configPath, "utf-8")
        const rawConfig = JSON.parse(configContent)
        return configSchema.parse(rawConfig)
    } catch {
        return null
    }
}

export async function writeConfig(cwd: string, config: Config): Promise<void> {
    const configPath = path.resolve(cwd, "components.json")
    await fs.writeFile(
        configPath,
        JSON.stringify(config, null, 2) + "\n",
        "utf-8"
    )
}

export function resolveImport(alias: string, cwd: string): string {
    if (alias.startsWith("@/")) {
        return path.resolve(cwd, alias.replace("@/", ""))
    }
    if (alias.startsWith("~/")) {
        return path.resolve(cwd, alias.replace("~/", ""))
    }
    return path.resolve(cwd, alias)
}

export async function getProjectInfo(cwd: string): Promise<{
    framework: "next" | "vite" | "remix" | "unknown"
    srcDir: boolean
    typescript: boolean
}> {
    const packageJsonPath = path.resolve(cwd, "package.json")

    if (!await fs.pathExists(packageJsonPath)) {
        return { framework: "unknown", srcDir: false, typescript: false }
    }

    const packageJson = await fs.readJson(packageJsonPath)
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }

    const srcDir = await fs.pathExists(path.resolve(cwd, "src"))
    const typescript = await fs.pathExists(path.resolve(cwd, "tsconfig.json"))

    if (deps.next) {
        return { framework: "next", srcDir, typescript }
    }

    if (deps.vite) {
        return { framework: "vite", srcDir, typescript }
    }

    if (deps["@remix-run/react"]) {
        return { framework: "remix", srcDir, typescript }
    }

    return { framework: "unknown", srcDir, typescript }
}
