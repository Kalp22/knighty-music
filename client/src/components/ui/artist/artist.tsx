import { Artist } from "@/app/types";

export default function ArtistComponent({
  artists,
  range,
}: {
  artists: Artist[];
  range?: number;
}) {
  return artists.map((artist: Artist, index: number) =>
    range ? (
      index < range && (
        <span key={index} className="text-sm text-gray-400">
          {artist.name}
          {index <
            (artists !== undefined ? (range ? range : artists?.length) : 0) -
              1 && ", "}
        </span>
      )
    ) : (
      <span key={index} className="text-sm text-gray-400">
        {artist.name}
        {index < artists?.length - 1 && ", "}
      </span>
    )
  );
}
