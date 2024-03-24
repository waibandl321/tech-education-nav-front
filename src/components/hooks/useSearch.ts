import { LearningCenter, LearningCenterCourse } from "@/API";
import { useRouter } from "next/router";
import { useState } from "react";

export default function useSearch() {
  const router = useRouter();
  const [selectedCenter, setSelectedCenter] = useState<LearningCenter | null>(
    null
  );
  const [selectedCourse, setSelectedCourse] =
    useState<LearningCenterCourse | null>(null);

  const handleCourseAndCenterSelection = () => {
    // コースが選択されている状態でスクールが削除された場合、コースを初期化
    if (!selectedCenter) {
      setSelectedCourse(null);
      return;
    }
    // コースが選択されている状態でスクールが変更された場合、コースを初期化
    if (selectedCenter.id !== selectedCourse?.learningCenterId) {
      setSelectedCourse(null);
      return;
    }
    // 共に選択されている場合は検索処理を実行する
    if (selectedCenter && selectedCourse) {
      if (!selectedCenter?.id || !selectedCourse?.id) return;
      router.push(`/reviews/${selectedCenter.id}/${selectedCourse.id}`);
    }
  };

  return {
    selectedCenter,
    setSelectedCenter,
    selectedCourse,
    setSelectedCourse,
    handleCourseAndCenterSelection,
  };
}
