/**
 * 말풍선에 전달하기 아이콘 노출 여부를 정합니다.
 *
 * 전달하기 아이콘이 노출 될 수 없는 경우:
 *  1. {@link Carousel}인 경우
 *  2. {@link ISkillCommon.IButton}이 포함된 경우
 *  3. {@link ListCard}의 {@link ListItem}에 {@link Link} 또는 {@link Action}이 포함된 경우
 */
export interface IForwardable {
  forwardable: boolean | null;
}
