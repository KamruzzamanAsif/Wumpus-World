import { boards } from "./Boards";

// eslint-disable-next-line react/prop-types
function Cell({ id, cheatMode, x, y }) {
  let imgid, imageSize;

  // eslint-disable-next-line react/prop-types
  if (id.length > 1) {
    if (id == "TB" || id == "BT" || id == "TBG" || id == "BTG") {
      id = "TB";
    }
    if (id == "TG" || id == "GT") {
      id = "TG";
    }
    if (id == "BG" || id == "GB") {
      id = "BG";
    }
    if (id == "SG" || id == "GS" || id == "SGG") {
      id = "G";
    }
    if (id == "") {
      id = "S";
    }

    imgid = `src/assets/${id}.png`;
    imageSize = 45;
  } else {
    imgid = `src/assets/${id}.png`;
    imageSize = 30;
  }

  // different size of the board images (as the image aren't of equal size)
  if (id === "A") {
    imageSize = 28;
  }
  if (id === "S") {
    imageSize = 40;
  }
  if (id === "G") {
    imageSize = 50;
  }
  if (id === "P") {
    imageSize = 40;
  }
  if (id === "W") {
    imageSize = 18;
  }

  // If cheatMode is true and id is not 'A', show a closed cell
  if (cheatMode && id !== "A" && !boards.cellVisited[x][y]) {
    imgid = "src/assets/cover.png";
    imageSize = 50;
  }

  return (
    // load relevant image
    <div>
      <img src={imgid} width={imageSize} alt={id} />
    </div>
  );
}

export default Cell;
