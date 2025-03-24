import { tags } from "typia";

export type IOutputs = IOutputs.ISimpleText[] &
  tags.MaxItems<3> &
  tags.MinItems<1>;

export namespace IOutputs {
  export interface ISimpleText {
    text: string & tags.MaxLength<1000>;
  }

  export interface ISimpleImage {
    imageUrl: string & tags.Format<"uri">;
    altText: string & tags.MaxLength<50>;
  }
}
