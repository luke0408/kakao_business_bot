import { tags } from "typia";

export namespace ISkillCommon {
  /**
   * Skill Link
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

  /**
   * Skill Thumbnail Image
   *
   * `ISkillCommon.IThumbnail`은 thumbnail image에 대한 정보를 담습니다.
   */
  export interface IThumbnail<
    Link extends ISkillCommon.ILink = ISkillCommon.ILink,
  > {
    /**
     * Thumbnail Image url
     */
    imageUrl: string & tags.Format<"url">;

    /**
     * Device의 스크린 리더 기능이 켜져있을 때 재생되는 text
     */
    altText: (string & tags.MaxLength<50>) | null;

    /**
     * 이미지 클릭시 동작하는 {@link ISkillCommon.ILink}
     */
    link: Link | null;

    /**
     * 이미지의 Ratio를 결정합니다.
     *
     * - false(기본값):
     *   - 이미지 영역을 2:1 비율로 두고 이미지의 가운데를 크롭하여 노출합니다.
     *   - 버튼이 세로로 배열되며 최대 3개 노출됩니다.
     * - true:
     *   - 이미지 영역을 1:1 비율로 두고 이미지의 원본 비율을 유지합니다.
     *   - 이미지가 없는 영역은 흰색으로 노출합니다.
     *   - 버튼이 가로로 배열되며 최대 2개로 제한됩니다.
     *
     * ※ {@link Carousel} 내에서는 모든 이미지가 정사각형 (1:1) 혹은 모든 이미지가 와이드형 (2:1)으로 통일되어야 합니다.
     */
    fixedRatio: boolean | null;
  }
}

export namespace IButtonAction {
  export type IPhoneNumber = tags.TagBase<{
    kind: "phoneNumber";
    target: "string";
    value: undefined;
    validate: `/^\+?[1-9]\d{1,14}$/.test($input)`;
  }>;

  export type IActions =
    | "webLink"
    | "message"
    | "phone"
    | "block"
    | "share"
    | "operator";

  export interface IButtonAction {
    label: string & tags.MaxLength<14>;
    action: IActions;
    webLinkUrl: (string & tags.Format<"url">) | null;
    messageText: string | null;
    phoneNumber: (string & IPhoneNumber) | null;
    extra: Map<string, any> | null;
  }

  export interface IWebLinkButton extends IButtonAction {
    action: "webLink";
    webLinkUrl: string & tags.Format<"url">;
  }

  export interface IMessageButton extends IButtonAction {
    action: "message";
    messageText: string;
  }
}
