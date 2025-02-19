import { X } from 'lucide-react';

interface FilterItem {
  id?: string;
  name: string;
  category: string;
}

interface TechnologyFilterProps {
  items: FilterItem[];
  selectedItems: FilterItem[];
  onSelectItem: (item: FilterItem) => void;
  onRemoveItem: (item: FilterItem) => void;
  title: string;
}

export function TechnologyFilter({
  items,
  selectedItems,
  onSelectItem,
  onRemoveItem,
  title,
}: TechnologyFilterProps) {
  // Group items by category (works for both technologies & note categories)
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, FilterItem[]>,
  );

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* Display selected items */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedItems.map((item) => (
          <span
            key={item.name}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
          >
            {item.name}
            <button
              onClick={() => onRemoveItem(item)}
              className="ml-2 hover:text-indigo-600"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      {/* Display items by category */}
      {Object.keys(groupedItems).map((category) => (
        <div key={category} className="mb-4 flex flex-row gap-3 items-center">
          <h3 className="font-semibold text-gray-900">{category}</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {groupedItems[category].map((item) => (
              <button
                key={item.name}
                onClick={() => onSelectItem(item)}
                className="px-3 py-1 rounded-full text-sm border border-gray-300 hover:border-indigo-500 hover:text-indigo-500 transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
