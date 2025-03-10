import { tags } from "typia";

export namespace ISkillPayload {
  /**
   * 사용자의 발화 단위를 정하는 block 정보
   */
  export interface IBlock {
    id: string;
    name: string;
  }

  export namespace IIntent {
    /**
     * 지식 정보
     */
    export interface IKnowledge {
      answer: string;
      question: string;
      categories: string;
      langingUrl: string & tags.Format<"url">;
      imageUrl: string & tags.Format<"url">;
    }
  }
}
