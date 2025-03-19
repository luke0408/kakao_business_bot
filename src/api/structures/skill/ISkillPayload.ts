import { tags } from "typia";

/**
 * Main payload structure for skill interactions
 * Contains bot information, intent details, action data, and user request context
 */
export interface ISkillPayload {
  bot: ISkillPayload.IBot;
  intent: ISkillPayload.IIntent;
  action: ISkillPayload.IAction;
  userRequest: ISkillPayload.IUserRequest;
  contexts: [];
}

export namespace ISkillPayload {
  /**
   * 사용자의 발화 단위를 정하는 block 정보
   */
  export interface IBlock {
    id: string;
    name: string;
  }

  /**
   * 사용자의 발화 정보를 담는 {@link ISkillPayload.IBlock}의 한 종류
   *
   * @property extra의 하위 정보를 통해 추가적인 정보를 전달할 수 있음
   */
  export interface IIntent<
    Knowledge extends IIntent.IKnowledge = IIntent.IKnowledge,
  > {
    extra: {
      knowledges: {
        matheadKnowledges: Knowledge[];
      } | null;
    } | null;
  }

  export namespace IIntent {
    /**
     * 지식 정보
     */
    export interface IKnowledge {
      answer: string;
      question: string;
      categories: string;
      landingUrl: string & tags.Format<"url">;
      imageUrl: string & tags.Format<"url">;
    }
  }

  /**
   * bot User
   *
   * id:
   * - 사용자를 식별할 수 있는 Key
   * - 특정한 봇에서 사용자를 식별할 때 사용가능
   * - 같은 사용자더라도, 봇이 다르면 다른 id 발급
   *
   * type:
   * - 현재는 "botUserKey" type만 지원
   *
   * properties:
   * - 추가적으로 제공되는 사용자 속성 정보
   */
  export interface IUser<Property extends IUser.IProperty = IUser.IProperty> {
    id: string & tags.MaxLength<70>;
    type: "botUserKey";
    properties: Property | null;
  }

  export namespace IUser {
    /**
     * user property
     *
     * plusfriendUserKey:
     * - 카카오톡 채널에서 제공하는 사용자 식별키
     * - {@link ISkillPayload.IUser.id}와 마찬가지로 사용자를 식별하는데 사용됨
     *
     * appUserId:
     * - 봇 설정에서 앱 키를 설정한 경우에만 제공되는 사용자 정보
     * - 앱 키를 설정하기 위해서는 카카오톡 디벨로퍼스 사이트에서 앱을 생성해야함
     *
     * isFriend:
     * - 사용자가 봇과 열결된 카카오톡 채널을 추가한 경우 제공되는 식별키
     * - 채널을 친구로 추가한 경우에만 `true`
     */
    export interface IProperty {
      plusfriendUserKey: string;
      appUserId: string | null;
      isFriend: boolean | null;
    }
  }

  /**
   * 대화 흐름에 대한 정보를 가지는 flow type
   *
   * trigger:
   * - {@link IFlow.ITrigger} 로 정의됨
   * - 사용자 발화를 생성시킨 트리거 정보를 가짐
   *
   * lastBlock:
   * - {@link ISkillPayload.IBlock} 로 정의 됨
   * - 바로 직전에 사용된 블록 정보를 가짐
   */
  export interface IFlow<
    Trigger extends IFlow.ITrigger = IFlow.ITrigger,
    Block extends ISkillPayload.IBlock = ISkillPayload.IBlock,
  > {
    trigger: Trigger;
    lastBlock: Block;
  }

  export namespace IFlow {
    /**
     * trigger types
     *
     * 구분 | Trigger Type | Output Type | Action Type
     * --- | --- | --- | ---
     * 발화 입력 | TEXT_INPUT | INPUT | TEXT
     * 일반 카드의 버튼-메시지 전송 | CARD_BUTTON_MESSAGE | CARD_BUTTON | MESSAGE
     * 일반 카드의 버튼-블록 연결 | CARD_BUTTON_BLOCK | CARD_BUTTON | BLOCK
     * 리스트 카드의 버튼-블록 연결 | LIST_ITEM_MESSAGE | LIST_ITEM | MESSAGE
     * 리스트 카드의 버튼-메시지 전송 | LIST_ITEM_BLOCK | LIST_ITEM | BLOCK
     * 리스트 메뉴의 버튼-블록 연결 | LISTMENU_MESSAGE | LISTMENU | MESSAGE
     * 리스트 메뉴의 버튼-블록 전송 | LISTMENU_BLOCK | LISTMENU | BLOCK
     * 바로 연결의 버튼-블록 연결 | QUICKREPLY_BUTTON_MESSAGE | QUICKREPLY | MESSAGE
     * 바로 연결의 버튼-메시지 전송 | QUICKREPLY_BUTTON_BLOCK | QUICKREPLY | BLOCK
     */
    export type ITriggerType =
      | "TEXT_INPUT"
      | "CARD_BUTTON_MESSAGE"
      | "CARD_BUTTON_BLOCK"
      | "LIST_ITEM_MESSAGE"
      | "LIST_ITEM_BLOCK"
      | "LISTMENU_MESSAGE"
      | "LISTMENU_BLOCK"
      | "QUICKREPLY_BUTTON_MESSAGE"
      | "QUICKREPLY_BUTTON_BLOCK";

    /**
     * trigger 정보
     *
     * - type: {@link ITriggerType}
     * - referrerBlock: {@link ISkillPayload.IBlock}
     */
    export interface ITrigger {
      type: ITriggerType;
      referrerBlock: ISkillPayload.IBlock;
    }
  }

  /**
   * Action을 정의 하기 위한 타입
   *
   * 다음과 같은 타입 추론 도우미 함수를 이용해야 정확한 타입 추론 가능
   * @example
   * ```ts
   * function create<
   *  P extends Record<string, string> = Record<string, string>,
   *  D extends { [K in keyof P]: IAction.IDetailParam } = {
   *    [K in keyof P]: IAction.IDetailParam;
   *  },
   * >(action: {
   *  id: string;
   *  name: string;
   *  params: P;
   *  detailParams: D;
   *  clientExtra: Record<string, any> | null;
   * }): IAction<P, D> {
   *  return action;
   * }
   * ```
   */
  export interface IAction<
    P extends Record<string, string> = Record<string, string>,
    D extends { [K in keyof P]: IAction.IDetailParam } = {
      [K in keyof P]: IAction.IDetailParam;
    },
  > {
    id: string;
    name: string;
    params: P | null;
    detailParams: D | null;
    clientExtra: Record<string, any> | null;
  }

  export namespace IAction {
    export interface IDetailParam {
      origin: string;
      value: string;
      groupName: string;
    }
  }

  /**
   * Bot에 대한 메타 데이터
   */
  export interface IBot {
    id: string;
    name: string;
  }

  /**
   * User Request
   *
   * 발화 내용 중 유저의 직접적인 요청 데이터
   *
   * timezone:
   * - 사용자의 시간대
   * - ex) Asia/Seoul
   *
   * block:
   * - 사용자의 발화에 반응한 {@link ISkillPayload.IBlock} 정보
   *
   * utterance:
   * - 봇 시스템에 전달된 사용자의 발화
   *
   * lang:
   * - 사용자의 언어
   * - ex) ko
   *
   * user:
   * - 요청을 작성한 {@link ISkillPayload.IUser} 정보
   */
  export interface IUserRequest {
    timezone: string;
    block: ISkillPayload.IBlock;
    utterance: string;
    lang: string;
    user: ISkillPayload.IUser;
  }
}
