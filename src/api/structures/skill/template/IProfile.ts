import { tags } from "typia";

/**
 * chat bot profile
 */
export interface IProfile {
  nickname: string;
  imageUrl: (string & tags.Format<"url">) | null;
}
