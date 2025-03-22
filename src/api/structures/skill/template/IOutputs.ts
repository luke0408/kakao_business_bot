import { tags } from "typia";

export type IOutputs = IOutputs.ISimpleText[] &
  tags.MaxItems<3> &
  tags.MinItems<1>;

export namespace IOutputs {
  export interface ISimpleText {
    text: string & tags.MaxLength<1000>;
  }
}
