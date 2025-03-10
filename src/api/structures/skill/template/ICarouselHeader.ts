import { INewLineLimit } from "./INewLineLimit";
import { IThumbnail } from "./IThumbnail";

/**
 * {@link Carousel}의 제목을 정의하는 타입
 */
export interface ICarouselHeader {
  title: string & INewLineLimit<1>;
  description: string & INewLineLimit<2>;
  thumbnail: IThumbnail;
}
