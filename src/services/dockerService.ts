import { initDocker } from "../lib/docker.js";
import { containerMountPath } from "../utils/mountDir.js";

const docker = initDocker()
export async function createContainer(projectId: any, userId: any){
    const mountPath = await containerMountPath(userId, projectId)

    const container = await docker.createContainer({
        Image: "ilman7/cloud-ide",
        name: `Container-${userId}`,
        Tty: true,
        HostConfig: {
            Mounts:[
                {
                    Target: "/workspace",
                    Source: mountPath,
                    Type: "bind",
                    ReadOnly: false
                }
            ],
            Memory: 512 * 1024 * 1024,
            NanoCpus: 0.5 * 1e9,
            NetworkMode: "runbox"
        },
        WorkingDir: "/workspace",
        Labels: {
        // Traefik-specific labels
        "traefik.enable": "true",
        "traefik.http.routers.nginx.rule": `Host("${projectId}.localhost")`,
        "traefik.http.routers.nginx.entrypoints": "web", // "websecure" if using TLS
        "traefik.http.services.nginx.loadbalancer.server.port": "80",
        "traefik.docker.network": "runbox"
      }
    })

    console.log("Docker Container Created: ", container);

    await container.start();
    
    return {projectId, containerId: container.id}
}