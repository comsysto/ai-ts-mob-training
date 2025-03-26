const images: Uint8Array[] = [];

export function getImageURL(imageData: Uint8Array): string {
  images.push(imageData);

  return `http://localhost:3000/images/${images.length - 1}`;
}

export function getImage(imageId: string): Uint8Array {
  return images[Number(imageId)];
}