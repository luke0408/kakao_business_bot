import { tags } from "typia";

/**
 * PhoneNumber의 pettern을 정의한 validation type
 *
 * 국제 번호 규격으로 구현되어있습니다.
 *
 * @example
 *  ```ts
 *  const a: IPhoneNumber = "+1 (123) 456-7890";  // pass
 *  const b: IPhoneNumber = "+82 10-1234-5678";   // pass
 *  const c: IPhoneNumber = "010-1234-5678";      // pass
 *  const d: IPhoneNumber = "abcdefg";           // error
 *  ```
 */
export type IPhoneNumber = tags.TagBase<{
  kind: "phoneNumber";
  target: "string";
  value: undefined;
  validate: `/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test($input)`;
}>;

/**
 * Represents a tagged type for validating a string based on the number of newline characters.
 *
 * @template Value - The maximum number of newline characters required in the string.
 */
export type INewLineLmit<Value extends number> = tags.TagBase<{
  kind: "newLineLmit";
  target: "string";
  value: Value;
  validate: `(() => {
      const regex = /(?:.*\n){${Value},}/
      return !regex.test($input)
    })()`;
}>;
