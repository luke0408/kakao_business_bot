import { tags } from "typia";

import { IThumbnail } from "./IThumbnail";

export namespace ISkillCommon {
  /**
   * Button Layout 정보를 정의합니다.
   *
   * - Vertical: 최대 3개의 버튼을 세로로 배치
   * - Horizontal: 최대 2개의 버튼을 가로로 배치
   */
  export interface IButtonLayout {
    buttonLayout: "vertical" | "horizontal";
  }

  /**
   * 말풍선에 전달하기 아이콘 노출 여부를 정합니다.
   *
   * 전달하기 아이콘이 노출 될 수 없는 경우:
   *  1. {@link Carousel}인 경우
   *  2. {@link ISkillCommon.IButton}이 포함된 경우
   *  3. {@link ListCard}의 {@link ListItem}에 {@link Link} 또는 {@link Action}이 포함된 경우
   */
  export interface IForwardable {
    forwardable: boolean | null;
  }

  /**
   * {@link Carousel}의 제목을 정의하는 타입
   */
  export interface ICarouselHeader {
    title: string & INewLineLmit<1>;
    description: string & INewLineLmit<2>;
    thumbnail: IThumbnail;
  }

  /**
   * chat bot profile
   */
  export interface IProfile {
    nickname: string;
    imageUrl: (string & tags.Format<"url">) | null;
  }
}

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
