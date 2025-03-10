import { INewLineLmit } from "./INewLineLmit";
import { IThumbnail } from "./IThumbnail";

/**
 * {@link Carousel}의 제목을 정의하는 타입
 */
export interface ICarouselHeader {
  title: string & INewLineLmit<1>;
  description: string & INewLineLmit<2>;
  thumbnail: IThumbnail;
}
