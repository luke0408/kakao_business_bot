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

  /**
   * Button의 정보({@link IButtonAction.IButtonTemp})를 정의합니다.
   */
  export type IButton =
    | IButtonAction.IWebLinkButton
    | IButtonAction.IMessageButton
    | IButtonAction.IPhoneButton
    | IButtonAction.IBlockButton
    | IButtonAction.IShareButton
    | IButtonAction.IOperatorButton;

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
}

export namespace IButtonAction {
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
   * Button이 가질 수 있는 Action Type
   *
   * Types:
   * - webLink: {@link IButtonAction.IWebLinkButton}
   * - message: {@link IButtonAction.IMessageButton}
   * - phone: {@link IButtonAction.IPhoneButton}
   * - block: {@link IButtonAction.IBlockButton}
   * - share: {@link IButtonAction.IShareButton}
   * - operator: {@link IButtonAction.IOperatorButton}
   */
  export type IActions =
    | "webLink"
    | "message"
    | "phone"
    | "block"
    | "share"
    | "operator";

  /**
   * {@link IButton}이 가질 수 있는 데이터를 정의합니다.
   */
  export interface IButtonTemp {
    label: string & tags.MaxLength<14>;
    action: IActions;
    webLinkUrl: (string & tags.Format<"url">) | null;
    messageText: string | null;
    phoneNumber: IPhoneNumber | null;
    blockId: string | null;
    extra: Map<string, any> | null;
  }

  export interface IWebLinkButton extends IButtonTemp {
    action: "webLink";
    webLinkUrl: string & tags.Format<"url">;
  }

  export interface IMessageButton extends IButtonTemp {
    action: "message";
    messageText: string;
  }

  export interface IPhoneButton extends IButtonTemp {
    action: "phone";
    phoneNumber: IPhoneNumber;
  }

  export interface IBlockButton extends IButtonTemp {
    action: "block";
    messageText: string;
    blockId: string;
  }

  export interface IShareButton extends IButtonTemp {
    action: "share";
  }

  export interface IOperatorButton extends IButtonTemp {
    action: "operator";
  }
}
