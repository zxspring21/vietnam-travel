import { resolvePlacePhoto, getPlacePhotoSrc } from "../utils/placePhoto";
import { HOTELS } from "./hotels";

export function getImageByName(name) {
  return resolvePlacePhoto({ csvName: name, title: name }) || null;
}

export function getPlaceImage() {
  return null;
}

export function getHotelImage(hotelId) {
  const h = HOTELS[hotelId];
  return h?.photoPath || getPlacePhotoSrc({ hotelId, isHotel: true }) || null;
}
