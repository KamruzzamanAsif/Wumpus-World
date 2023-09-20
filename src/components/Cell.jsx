// eslint-disable-next-line react/prop-types
function Cell({ id }) {
  let imgid = `src/assets/${id}.png`;
  let imageSize = 30;

  if (id == "A") {
    imageSize = 50;
  }
  if (id == "S") {
    imageSize = 65;
  }
  if (id == "G") {
    imageSize = 70;
  }
  if (id == "P") {
    imageSize = 70;
  }
  if (id == "W") {
    imageSize = 31;
  }

  return (
    // load relevant image
    <div>
      <img src={imgid} width={imageSize}></img>
    </div>
  );
}

export default Cell;
