import { tags } from "typia";

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
}
