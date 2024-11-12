import { useDbData } from "../utils/firebase";

export default function ScoreBar() {
  const [updatedTotalScores] = useDbData(`/knowledge_game/total_scores`);

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 5,
          justifyContent: "space-evenly",
          padding: 10,
          borderRadius: 20,
        }}
      >
        <div>{updatedTotalScores&& updatedTotalScores["Panashe"]}</div>
        <div>Panashe</div>
        <div>Karen</div>
        <div>{updatedTotalScores&& updatedTotalScores["Karen"]}</div>
      </div>
    </>
  );
}
