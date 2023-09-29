import { play } from "./Play";

// eslint-disable-next-line react/prop-types
function CheatCell({ id, x, y }) {
  const agent_x = play.agentIndex.row;
  const agent_y = play.agentIndex.column;

  const isAgentCell = agent_x === x && agent_y === y;
  let backgroundColor = "";

  if (id === 0.25) {
    backgroundColor = "orange";
  } else if (id === 0.5) {
    backgroundColor = "red";
  } else if (id > 0.5) {
    backgroundColor = "darkred";
  } else {
    if (isAgentCell) {
      backgroundColor = "brown";
    }
  }

  const cellStyle = {
    fontWeight: isAgentCell ? "bold" : "normal",
    backgroundColor: backgroundColor,
    width: isAgentCell ? "39px" : "",
    height: isAgentCell ? "39px" : "",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: isAgentCell ? "white" : "black",
  };

  return <div style={cellStyle}>{id}</div>;
}

export default CheatCell;
