import { useEffect, useState } from "react";
import { getPlacePhotoCandidates } from "../utils/placePhoto";

export function usePlacePhoto(stop) {
  const [urls, setUrls] = useState(() => getPlacePhotoCandidates(stop));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const preset = getPlacePhotoCandidates(stop);
    setUrls(preset);
    setLoading(false);
  }, [stop?.csvId, stop?.csvName, stop?.hotelId, stop?.title, stop?.photoKey, stop?.souvenirId]);

  return { urls, loading, currentUrl: urls[0] ?? null };
}
