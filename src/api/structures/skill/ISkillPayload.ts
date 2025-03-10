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
}
