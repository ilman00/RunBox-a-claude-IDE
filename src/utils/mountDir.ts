import fs from "fs"
import path from "path"

export async function containerMountPath(userId: string, projectId: string){
    const projectPath = path.resolve(
        process.cwd(),
        "mnt",
        "containers",
        userId
    )

    await fs.promises.mkdir(projectPath, {recursive: true}),
    await fs.promises.chmod(projectPath, 0o777)

    return projectPath;
}