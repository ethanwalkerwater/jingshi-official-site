export interface TeacherPreferenceSignal {
  /** 0 表示更偏左侧描述，100 表示更偏右侧描述。 */
  position: number;
  /** 参与该维度计算的有效问卷数量。 */
  responseCount: number;
}

/** 与教师详情页课堂体验标签共用的倾向分段。 */
export function preferenceCategory(position: number): "left" | "center" | "right" {
  if (position <= 40) return "left";
  if (position >= 60) return "right";
  return "center";
}

export type ReviewerType = "student" | "parent" | "anonymous";

export interface TeacherReview {
  id: string;
  author: string;
  reviewerType: ReviewerType;
  date: string;
  content: string;
  avatar: string;
}

export interface TeacherFeedbackProfile {
  classStyle: TeacherPreferenceSignal | null;
  teachingPace: TeacherPreferenceSignal | null;
  classroomInteraction: TeacherPreferenceSignal | null;
  reviewCount: number;
  reviews: TeacherReview[];
}
