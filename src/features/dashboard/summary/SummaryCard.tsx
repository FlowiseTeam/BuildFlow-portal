export function SummaryCard({ name, num, imgSrc }: { name: string; num: number; imgSrc: string }) {
  return (
    <div className="flex items-center h-full p-5">
      <div>
        <img src={imgSrc} />
      </div>
      <div className="flex ml-4 flex-col justify-center ">
        <p className="text-gray-500 font-abhaya">{name}</p>
        <p className="font-semibold text-primary text-2xl">{num}</p>
      </div>
    </div>
  );
}
