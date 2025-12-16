import chalk from "chalk"

export const logger = {
    log: (...args: unknown[]) => {
        console.log(...args)
    },

    info: (...args: unknown[]) => {
        console.log(chalk.blue("info"), ...args)
    },

    success: (...args: unknown[]) => {
        console.log(chalk.green("✔"), ...args)
    },

    warn: (...args: unknown[]) => {
        console.log(chalk.yellow("warning"), ...args)
    },

    error: (...args: unknown[]) => {
        console.log(chalk.red("error"), ...args)
    },

    break: () => {
        console.log("")
    },
}

export const highlighter = {
    info: (text: string) => chalk.cyan(text),
    success: (text: string) => chalk.green(text),
    warn: (text: string) => chalk.yellow(text),
    error: (text: string) => chalk.red(text),
    code: (text: string) => chalk.gray(text),
}
