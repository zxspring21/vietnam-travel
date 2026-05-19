import { PLACE_DETAILS } from "./placeDetails.js";
import { extractMentionedFromReviews } from "../utils/reviewHighlights.js";

export { PLACE_DETAILS };

export function getPlaceDetails(csvIdOrName) {
  const d = PLACE_DETAILS[csvIdOrName];
  if (!d) return null;
  return {
    ...d,
    mentionedInReviews: d.mentionedInReviews || extractMentionedFromReviews(d.reviews),
  };
}
