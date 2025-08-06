import { BadRequestException } from '@nestjs/common';

export const parseDataParameter = <T extends object>(data?: string): T => {
  if (!data) {
    return { options: {} } as T;
  }

  try {
    const decodedData = decodeURIComponent(data);
    return JSON.parse(decodedData) as T;
  } catch (err) {
    throw new BadRequestException(`Invalid data parameter: ${err}`);
  }
};
