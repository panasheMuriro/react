import GradeButtons from "../components/GradeButtons";
import GradeCard from "../components/GradeCard";
import Navbar from "../components/Navbar";
import ScoreBar from "../components/ScoreBar";
import { categories } from "../data/categories";
import { useDbData } from "../utils/firebase";

export default function GradingPage() {
  // data panashe: food: answer/score , panashe/food/score (0,5,10)
  // panashe/total_score/ int
  const [grading_index] = useDbData("/knowledge_game/controls/grading_index");

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "80vh",
        }}
      >
        <Navbar />
        <ScoreBar />
        <h2> {categories[grading_index || 0].toUpperCase()} </h2>
        <GradeCard grading_index={grading_index || 0} name="Karen" />
        <GradeCard grading_index={grading_index || 0} name="Panashe" />
        <GradeButtons />
      </div>
    </>
  );
}
