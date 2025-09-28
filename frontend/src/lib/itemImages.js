// Grab all PNGs from assets/items
const images = import.meta.glob("../assets/items/*.png", { eager: true });

// Build a mapping like { "sitting": <image path>, "dancing": <image path> }
export const itemImageMap = Object.fromEntries(
  Object.entries(images).map(([path, module]) => {
    const filename = path.split("/").pop().replace(".png", ""); // "sitting"
    return [filename, module.default]; // key = "sitting", value = imported image
  })
);
