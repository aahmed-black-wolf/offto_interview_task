
// Reusable Button Component
interface TabButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}
export default function  TabButton({ children, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 md:px-6 lg:px-8 xl:px-10 py-1 md:py-2 lg:py-3 rounded-xl transition-colors 
        ${isActive ? 'bg-primaryText text-white' : 'bg-white text-gray-500 hover:bg-gray-100 border'}`}
    >
      {children}
    </button>
  );
}