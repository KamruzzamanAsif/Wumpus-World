// eslint-disable-next-line react/prop-types
function Cell({ id, cheatMode }) {
  let imgid = `src/assets/${id}.png`;
  let imageSize = 30;

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
  if (cheatMode && id !== "A") {
    imgid = "src/assets/cover.png";
    imageSize = 50;
  }

  // TODO: in future, when a cell is visited, it should also be uncovered (Fahad)

  return (
    // load relevant image
    <div>
      <img src={imgid} width={imageSize} alt={id} />
    </div>
  );
}

export default Cell;
