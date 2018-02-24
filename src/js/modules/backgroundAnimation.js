// Gets the current page
// Gets info from the page
// Draws shapes based on info
// Animates from previous info if any.

// Pink: #DBA698;
// Tan: #71564F;

const backgroundAnimation = (newContainer, oldContainer) => {
  const wrapper = document.querySelector("#wrapper");
  const canvas =
    document.querySelector("#bars") || document.createElement("canvas");
  canvas.id = "bars";
  const ctx = canvas.getContext("2d");
  const width = wrapper.clientWidth;
  const height = wrapper.clientHeight;
  canvas.width = width;
  canvas.height = height;
  canvas.style.zIndex = 0;

  wrapper.appendChild(canvas);

  // ctx.clearRect(0, 0, width, height);
  let data;
  if (!newContainer) {
    data = document.querySelector(".inner").dataset.lines;
  } else {
    data = newContainer.dataset.lines;
  }

  if (!data) return;
  const draw = () => {
    
  }
  const lines = JSON.parse(data);
  lines.forEach(line => {
    const points = {
      x1: line[0],
      y1: line[1],
      x2: line[2],
      y2: line[3]
    };
    const gradient = ctx.createLinearGradient(
      width * points.x1,
      height * points.y1,
      width * points.x2,
      height * points.y2
    );
    gradient.addColorStop(0, "#DBA698");
    gradient.addColorStop(1, "#71564F");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(width * points.x1, height * points.y1);
    ctx.lineTo(width * points.x2, height * points.y2);
    ctx.stroke();
    ctx.closePath();
  });

  const animate = () => {
    requestAnimationFrame(animate);
  };
  // animate();
};
export default backgroundAnimation;
