import { tags } from "typia";

import { IPhoneNumber } from "./ISkillCommon";

/**
 * Button의 정보({@link IButton.IButtonTemp})를 정의합니다.
 */
export type IButton =
  | IButton.IWebLinkButton
  | IButton.IMessageButton
  | IButton.IPhoneButton
  | IButton.IBlockButton
  | IButton.IShareButton
  | IButton.IOperatorButton;

export namespace IButton {
  /**
   * Button이 가질 수 있는 Action Type
   *
   * Types:
   * - webLink: {@link IButton.IWebLinkButton}
   * - message: {@link IButton.IMessageButton}
   * - phone: {@link IButton.IPhoneButton}
   * - block: {@link IButton.IBlockButton}
   * - share: {@link IButton.IShareButton}
   * - operator: {@link IButton.IOperatorButton}
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
