import { tags } from "typia";

export namespace ISkillCommon {
  /**
   * Skill을 위한 Link
   *
   * `ISkillCommon.ILink`은 PC, Mobile, Web 환경에 대한 외부 Link 정보를 담습니다.
   *
   * Link 적용 우선순위:
   * - PC 환경: pc < web
   * - Mobile 환경: mobile < web
   *
   * 위 규칙에 따라 항상 web이 먼저 동작합니다.
   */
  export interface ILink {
    /**
     * PC 환경에서 작동할 url link
     */
    pc: (string & tags.Format<"url">) | null;

    /**
     * Mobile 환경에서 작동할 url link
     */
    mobile: (string & tags.Format<"url">) | null;

    /**
     * Web 환경에서 작동할 url link
     */
    web: (string & tags.Format<"url">) | null;
  }
}
