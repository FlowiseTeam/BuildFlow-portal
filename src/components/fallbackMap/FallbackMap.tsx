export function FallbackMap({ street, city }: { street: string; city: string }) {
  return (
    <iframe
      width="100%"
      height="100%"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.GOOGLE_MAPS_KEY}&q=${encodeURIComponent(
        `${street}+${city}`,
      )}`}
    ></iframe>
  );
}
