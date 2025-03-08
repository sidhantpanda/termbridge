import { DockerContainer } from '../../models/DockerContainer';

export interface GetDockerContainers {
  containers: DockerContainer[];
}