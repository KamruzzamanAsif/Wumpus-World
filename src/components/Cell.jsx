/* eslint-disable react/prop-types */
import { play } from "./Play";

// eslint-disable-next-line react/prop-types
function Cell({ id, cheatMode, x, y }) {
  let imgid, imageSize;

  const agent_x = play.agentIndex.row;
  const agent_y = play.agentIndex.column;

  const isAgentCell = agent_x === x && agent_y === y;
  if (isAgentCell) {
    id = "A";
  }

  // eslint-disable-next-line react/prop-types
  if (id.length > 1) {
    if (
      id == "TB" ||
      id == "BT" ||
      id == "TBG" ||
      id == "BTG" ||
      id == "TBS" ||
      id == "SBS" ||
      (id.includes("T") && id.includes("B"))
    ) {
      id = "TB";
    }
    if (id == "TG" || id == "GT" || (id.includes("T") && id.includes("G"))) {
      id = "TG";
    }
    if (id == "BG" || id == "GB" || (id.includes("G") && id.includes("B"))) {
      id = "BG";
    }
    if (
      id == "SG" ||
      id == "GS" ||
      id == "SGG" ||
      id == "SSG" ||
      id.includes("G")
    ) {
      id = "G";
    }
    if (id == "" || id == "SS" || id == "" || id.includes("S")) {
      id = "S";
    }
    if (id == "SB" || id == "BS" || (id.includes("B") && id.includes("S"))) {
      id = "B";
    }
    if (id == "TS" || (id.includes("T") && id.includes("S"))) {
      id = "T";
    }
    if (id == "WT" || id == "TW" || (id.includes("T") && id.includes("W"))) {
      id = "W";
    }
    if (id.includes("P")) {
      id = "P";
    }
    if (id.includes("T") && id.includes("B") && id.includes("G")) {
      id = "TBG";
    }

    imgid = `/assets/${id}.png`;
    imageSize = 50;
  } else {
    imgid = `/assets/${id}.png`;
    imageSize = 50;
  }

  if (id == 0) {
    imgid = `/assets/S.png`;
    imageSize = 50;
  }

  // different size of the board images (as the image aren't of equal size)
  if (id === "A") {
    imageSize = 50;
  }
  if (id === "S") {
    imageSize = 50;
  }
  if (id === "G") {
    imageSize = 50;
  }
  if (id === "P") {
    imageSize = 50;
  }
  if (id === "W") {
    imageSize = 50;
  }
  if (id == "D") {
    imageSize = 50;
  }

  // If cheatMode is true and id is not 'A', show a closed cell
  if (cheatMode && id !== "A" && !play.cellVisited[x][y]) {
    imgid = "/assets/cover.png";
    imageSize = 65;
  }

  return (
    // load relevant image
    <div>
      <img src={imgid} width={imageSize} height={imageSize} alt={id} />
    </div>
  );
}

export default Cell;
