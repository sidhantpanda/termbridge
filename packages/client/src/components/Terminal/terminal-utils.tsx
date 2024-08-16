const getTerminalCols = (container: HTMLElement) => {
  // const container = getContainer();
  const width = container.clientWidth;
  const characterWidth = 9;  // This is a rough estimation; you might need to adjust this based on the terminal's font size.
  return Math.floor(width / characterWidth);
}

const getTerminalRows = (container: HTMLElement) => {
  const width = container.clientHeight;
  const characterHeight = 18;  // This is a rough estimation; you might need to adjust this based on the terminal's font size.
  return Math.floor(width / characterHeight);
}

export const getTerminalGridUnits = (container: HTMLElement) => ({
  rows: getTerminalRows(container),
  cols: getTerminalCols(container)
});
