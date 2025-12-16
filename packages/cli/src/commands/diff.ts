import path from "path"
import fs from "fs-extra"
import { Command } from "commander"
import { z } from "zod"
import { logger, highlighter } from "../utils/logger.js"
import { spinner } from "../utils/spinner.js"
import { handleError } from "../utils/errors.js"
import { getConfig, resolveImport } from "../utils/config.js"
import { getRegistryItem } from "../utils/registry.js"

const diffOptionsSchema = z.object({
    component: z.string(),
    cwd: z.string(),
})

export const diff = new Command()
    .name("diff")
    .description("show differences between local and registry version")
    .argument("<component>", "the component to diff")
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .action(async (component, opts) => {
        try {
            const options = diffOptionsSchema.parse({
                component,
                cwd: path.resolve(opts.cwd),
            })

            await runDiff(options)
        } catch (error) {
            handleError(error)
        }
    })

async function runDiff(options: z.infer<typeof diffOptionsSchema>): Promise<void> {
    const { component, cwd } = options

    const config = await getConfig(cwd)

    if (!config) {
        logger.error(
            `No ${highlighter.info("components.json")} file found at ${highlighter.info(cwd)}.`
        )
        logger.info("Run `npx neobrutal-ui init` to initialize the project.")
        return
    }

    const diffSpinner = spinner(`Checking ${component}...`).start()

    try {
        const registryItem = await getRegistryItem(component)

        diffSpinner.succeed(`Found ${component} in registry.`)

        for (const file of registryItem.files) {
            const localPath = resolveFilePath(cwd, config, file.path)

            if (!await fs.pathExists(localPath)) {
                logger.break()
                logger.warn(`${highlighter.warn(file.path)} does not exist locally.`)
                continue
            }

            const localContent = await fs.readFile(localPath, "utf-8")
            const registryContent = file.content

            if (localContent === registryContent) {
                logger.break()
                logger.success(`${highlighter.success(file.path)} is up to date.`)
            } else {
                logger.break()
                logger.warn(`${highlighter.warn(file.path)} has local modifications.`)

                const localLines = localContent.split("\n").length
                const registryLines = registryContent.split("\n").length

                logger.info(`  Local: ${localLines} lines`)
                logger.info(`  Registry: ${registryLines} lines`)
            }
        }

        logger.break()
        logger.info("To update to the latest version, run:")
        logger.break()
        logger.log(`  ${highlighter.code(`npx neobrutal-ui add ${component} --overwrite`)}`)
        logger.break()
    } catch (error) {
        diffSpinner.fail(`Failed to check ${component}.`)
        throw error
    }
}

function resolveFilePath(cwd: string, config: any, filePath: string): string {
    if (filePath.startsWith("components/ui/")) {
        const uiAlias = config.aliases.ui || `${config.aliases.components}/ui`
        return path.resolve(
            cwd,
            filePath.replace("components/ui/", uiAlias.replace("@/", "") + "/")
        )
    }

    if (filePath.startsWith("lib/")) {
        const libAlias = config.aliases.lib || "@/lib"
        return path.resolve(
            cwd,
            filePath.replace("lib/", libAlias.replace("@/", "") + "/")
        )
    }

    return path.resolve(cwd, filePath)
}
