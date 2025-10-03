import Docker from "dockerode";
import os from "os";

let docker: Docker;

export function initDocker() {
  if (!docker) {
    const platform = os.platform();

    if (platform === "win32") {
      // Windows usually uses TCP
      docker = new Docker({
        socketPath: "//./pipe/docker_engine"
      });
    } else {
      // Linux and macOS use the Unix socket
      docker = new Docker({
        socketPath: "/var/run/docker.sock",
      });
    }
  }

  return docker;
}
