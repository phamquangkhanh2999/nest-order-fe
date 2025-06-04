import _ from "lodash";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const hasSeconds = (time: string): boolean => {
  return /^\d{2}:\d{2}:\d{2}$/.test(time.trim());
};
export const sanitizeParams = (obj: Record<string, any>): Record<string, any> =>
  _.reduce(
    obj,
    (result, value, key) => {
      if (_.isNil(value) || value === '' ) return result;

   

      if (_.isString(value)) {
        const trimmed = value.trim();
        if (!trimmed) return result;
        result[key] = trimmed;
        return result;
      }

      if (_.isArray(value)) {
        const cleaned = value
          .map(item => (_.isPlainObject(item) ? sanitizeParams(item) : item))
          .filter(
            item => !_.isNil(item) && item !== '' && (!_.isPlainObject(item) || !_.isEmpty(item))
          );

        if (cleaned.length) result[key] = cleaned;
        return result;
      }

      if (_.isPlainObject(value)) {
        const cleaned = sanitizeParams(value);
        if (!_.isEmpty(cleaned)) result[key] = cleaned;
        return result;
      }

      result[key] = value;
      return result;
    },
    {} as Record<string, any>
  );