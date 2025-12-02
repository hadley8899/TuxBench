import { exec } from 'node:child_process';

export const checkMangoHudAvailability = async (): Promise<boolean> => {
  const command = 'which mangohud';

  return new Promise((resolve) => {
    exec(command, (error, stdout) => {
      if (error) {
        resolve(false);
        return;
      }

      resolve(stdout.trim().length > 0);
    });
  });
};
