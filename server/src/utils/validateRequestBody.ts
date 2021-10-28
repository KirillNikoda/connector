// validate request body for all fields corresponding to entity in db
export const validateRequestBody = (
  previousObject: Record<string, any>,
  entries: string[],
) => {
  const resultObject = {};

  entries.forEach((entry) => {
    if (previousObject[entry]) {
      resultObject[entry] = previousObject[entry];
    }
  });

  return resultObject;
};
