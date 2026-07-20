export default function SectionHeading({
  sub,
  main,
}: {
  sub: string;
  main: string;
}) {
  return (
    <div className="text-center mb-10">
      <p className="text-sm text-primary500 font-medium mb-1">{sub}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{main}</h2>
    </div>
  );
}
