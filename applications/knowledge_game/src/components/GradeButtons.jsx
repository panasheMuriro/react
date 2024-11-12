import { categories } from "../data/categories";
import { useDbData, useDbUpdate } from "../utils/firebase";

export default function GradeButtons() {
  const [changeGradingIndex] = useDbUpdate(
    "/knowledge_game/controls"
  );
  const [grading_index] = useDbData("/knowledge_game/controls/grading_index");

  const handleGradeIndexChange = (type) => {
    if (type == "Next" && grading_index < categories.length-1) {
      changeGradingIndex({grading_index: grading_index + 1});
    }

    if (type == "Prev" && grading_index > 0) {
      changeGradingIndex({grading_index: grading_index - 1});
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button onClick={()=> handleGradeIndexChange("Prev")}>Prev</button>
        <button onClick={()=> handleGradeIndexChange("Next")}>Next</button>
      </div>
    </>
  );
}
