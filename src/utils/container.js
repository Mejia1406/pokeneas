import { readFileSync } from 'fs';
import { hostname } from 'os';

function resolveContainerId() {
  try {
    const cgroup = readFileSync('/proc/self/cgroup', 'utf8');

    for (const line of cgroup.split('\n')) {
      const match = line.match(/\/([a-f0-9]{64})$/);

      if (match) {
        return match[1].substring(0, 12);
      }
    }
  } catch {
  }

  return hostname();
}

export const containerId = resolveContainerId();