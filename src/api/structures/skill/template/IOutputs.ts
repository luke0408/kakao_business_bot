import { tags } from "typia";

import { IButton } from "./IButton";

export type IOutput =
  | IOutputs.ISimpleText
  | IOutputs.ISimpleImage
  | IOutputs.ITextCard;

export type IOutputs = IOutput[] & tags.MaxItems<3> & tags.MinItems<1>;

export namespace IOutputs {
  export interface ISimpleText {
    text: string & tags.MaxLength<1000>;
  }

  export interface ISimpleImage {
    imageUrl: string & tags.Format<"uri">;
    altText: string & tags.MaxLength<50>;
  }

  export type ITextCard = ITextCard.ITitledCard | ITextCard.IDescribedCard;

  /**
   * Namespace containing interfaces for text card structures.
   */
  export namespace ITextCard {
    /**
     * Base interface for a card.
     */
    export interface ICardBase {
      /**
       * The title of the card. It can be a string with a maximum length of 50 characters or null.
       */
      title: (string & tags.MaxLength<50>) | null;

      /**
       * The description of the card. It can be a string with a maximum length of 400 characters or null.
       */
      description: (string & tags.MaxLength<400>) | null;

      /**
       * An array of buttons associated with the card. The array must have at least 1 item and at most 3 items.
       */
      buttons: IButton[] & tags.MaxItems<3> & tags.MinItems<1>;

      /**
       * The layout of the buttons on the card. It can be either "horizontal" or "vertical".
       */
      buttonLayout: "horizontal" | "vertical";
    }

    /**
     * Interface for a card with a mandatory title.
     */
    export interface ITitledCard extends ICardBase {
      /**
       * The title of the card. It must be a string with a maximum length of 50 characters.
       */
      title: string & tags.MaxLength<50>;
    }

    /**
     * Interface for a card with a mandatory description.
     */
    export interface IDescribedCard extends ICardBase {
      /**
       * The description of the card. It must be a string with a maximum length of 400 characters.
       */
      description: string & tags.MaxLength<400>;
    }
  }
}
