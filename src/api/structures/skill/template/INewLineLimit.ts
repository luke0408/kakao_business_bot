import { tags } from "typia";

/**
 * Represents a tagged type for validating a string based on the number of newline characters.
 *
 * @template Value - The maximum number of newline characters required in the string.
 */
export type INewLineLimit<Value extends number> = tags.TagBase<{
  kind: "newLineLmit";
  target: "string";
  value: Value;
  validate: `(() => {
      const regex = /(?:.*\n){${Value},}/
      return !regex.test($input)
    })()`;
}>;
