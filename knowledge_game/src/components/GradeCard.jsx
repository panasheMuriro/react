import PropTypes from "prop-types";
import { useDbData, useDbUpdate } from "../utils/firebase";
import { categories } from "../data/categories";
import { useEffect } from "react";

export default function GradeCard({grading_index, name }) {
  const [answers] = useDbData(`/knowledge_game/${name}/answers`);
  const [updateScores] = useDbUpdate(`/knowledge_game/${name}/scores`); // for scoring
  const [updatedScores] = useDbData(`/knowledge_game/${name}/scores`);
  const [updateTotalScores] = useDbUpdate(`/knowledge_game/total_scores`);

  const handleScoring = (score) => {
    clearScores();
    document.querySelector(
      `#bt-${name}-${score}`
    ).style.backgroundColor = `green`;

    // handle scores
    updateScoreHelper(score);
  };

  const updateScoreHelper = (score) => {
    let category = categories[grading_index];
    updateScores({
      [category]: score,
    });
  };

  useEffect(() => {
    if (updatedScores) {
      let thisPlayerScores = Object.values(updatedScores).reduce(
        (acc, curr) => acc + curr,
        0
      );
      updateTotalScores({
        [name]: thisPlayerScores,
      });
    }
  }, [updatedScores]);

  const clearScores = () => {
    for (let n of [0, 5, 10]) {
      document.querySelector(
        `#bt-${name}-${n}`
      ).style.backgroundColor = `#f9f9f9`;
    }
  };

  const initializeBtColors = () => {
    clearScores();
    if (updatedScores) {
      let category_score = updatedScores[categories[grading_index]];
      if (category_score != undefined) {
        document.querySelector(
          `#bt-${name}-${category_score}`
        ).style.backgroundColor = `green`;
      }
    }
  };

  useEffect(() => {
    initializeBtColors();
  }, [updatedScores, grading_index]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>{name} said,</div>
        <div>{answers ? answers[categories[grading_index || 0]] : ""}</div>
        <div style={{ display: "flex", gap: 20, justifyContent:"center" }}>
          <button id={`bt-${name}-0`} onClick={() => handleScoring(0)}>
            0
          </button>
          <button id={`bt-${name}-5`} onClick={() => handleScoring(5)}>
            5
          </button>
          <button id={`bt-${name}-10`} onClick={() => handleScoring(10)}>
            10
          </button>
        </div>
      </div>
    </>
  );
}

GradeCard.propTypes = {
  grading_index: PropTypes.number.isRequired, // 'title' is a required string
  name: PropTypes.string.isRequired,
  // inputChange: PropTypes.func.isRequired
};
