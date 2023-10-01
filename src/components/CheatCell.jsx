import "../styles/Grid.css";
import { play } from "./Play";

// eslint-disable-next-line react/prop-types
function CheatCell({ id, x, y }) {
  const agent_x = play.agentIndex.row;
  const agent_y = play.agentIndex.column;

  const isAgentCell = agent_x === x && agent_y === y;
  let backgroundColor = "";

  const currCellId = play.getBoard()[x][y];

  if (id === 0.25) {
    backgroundColor = "orange";
  } else if (id === 0.5) {
    backgroundColor = "tomato";
  } else if (id > 0.5) {
    backgroundColor = "crimson";
  } else {
    if (isAgentCell) {
      backgroundColor = "blue";
    }
  }

  if (currCellId.includes("G")) {
    backgroundColor = "yellow";
  }

  const cellStyle = {
    fontWeight: isAgentCell ? "bold" : "normal",
    backgroundColor: backgroundColor,
    width: "39px",
    height: "39px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: isAgentCell ? "white" : "black",
  };

  return (
    <div
      style={cellStyle}
    >
      {id}
    </div>
  );
}

export default CheatCell;
