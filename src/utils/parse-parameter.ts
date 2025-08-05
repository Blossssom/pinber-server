import { BadRequestException } from '@nestjs/common';

export const parseDataParameter = (data?: string): any => {
  if (!data) {
    return { options: {} };
  }

  try {
    const decodedData = decodeURIComponent(data);
    return JSON.parse(decodedData);
  } catch (err) {
    throw new BadRequestException(`Invalid data parameter: ${err}`);
  }
};
