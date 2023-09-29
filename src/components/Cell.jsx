import { play } from "./Play";

// eslint-disable-next-line react/prop-types
function Cell({ id, cheatMode, x, y }) {
  let imgid, imageSize;

  // eslint-disable-next-line react/prop-types
  if (id.length > 1) {
    if (
      id == "TB" ||
      id == "BT" ||
      id == "TBG" ||
      id == "BTG" ||
      id == "TBS" ||
      id == "SBS"
    ) {
      id = "TB";
    }
    if (id == "TG" || id == "GT") {
      id = "TG";
    }
    if (id == "BG" || id == "GB") {
      id = "BG";
    }
    if (id == "SG" || id == "GS" || id == "SGG" || id == "SSG") {
      id = "G";
    }
    if (id == "" || id == "SS" || id == "") {
      id = "S";
    }
    if (id == "SB" || id == "BS") {
      id = "B";
    }
    if (id == "TS") {
      id = "T";
    }
    if (id == "WT" || id == "TW") {
      id = "W";
    }
    // eslint-disable-next-line react/prop-types
    if (id.includes("P")) {
      id = "P";
    }

    imgid = `src/assets/${id}.png`;
    imageSize = 50;
  } else {
    imgid = `src/assets/${id}.png`;
    imageSize = 50;
  }

  if (id == 0) {
    imgid = `src/assets/S.png`;
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
    imgid = "src/assets/cover.png";
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
