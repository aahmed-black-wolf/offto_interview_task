interface CounterProps {
  label: string;
  subLabel?: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function Counter({
  label,
  subLabel,
  value,
  onIncrement,
  onDecrement,
}: CounterProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="font-medium text-gray-700">{label}</span>
        {subLabel && <span className="text-sm text-gray-500">{subLabel}</span>}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onDecrement}
          className="w-8 h-8 border border-primaryText text-primaryText rounded-full flex items-center justify-center text-lg font-medium"
        >
          -
        </button>
        <span>{value}</span>
        <button
          onClick={onIncrement}
          className="w-8 h-8 border border-[#115153] text-[#115153] rounded-full flex items-center justify-center text-lg font-medium"
        >
          +
        </button>
      </div>
    </div>
  );
}