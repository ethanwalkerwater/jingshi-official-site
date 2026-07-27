export interface TeacherPreferenceSignal {
  /** 0 表示更偏左侧描述，100 表示更偏右侧描述。 */
  position: number;
  /** 参与该维度计算的有效问卷数量。 */
  responseCount: number;
}

export interface StudentReview {
  id: string;
  author: string;
  date: string;
  content: string;
  avatar: string;
}

export interface TeacherFeedbackProfile {
  classStyle: TeacherPreferenceSignal | null;
  teachingPace: TeacherPreferenceSignal | null;
  classroomInteraction: TeacherPreferenceSignal | null;
  reviewCount: number;
  reviews: StudentReview[];
}
