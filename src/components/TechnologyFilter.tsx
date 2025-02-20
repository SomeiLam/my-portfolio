export interface FilterItem {
  id?: string;
  name: string;
  category: string;
}

interface TechnologyFilterProps {
  items: FilterItem[];
  selectedItems: FilterItem[];
  onToggleItem: (item: FilterItem) => void;
  title: string;
}

export function TechnologyFilter({
  items,
  selectedItems,
  onToggleItem,
  title,
}: TechnologyFilterProps) {
  // Group items by category
  const groupedItems = items.reduce<Record<string, FilterItem[]>>(
    (acc, item) => {
      (acc[item.category] ||= []).push(item);
      return acc;
    },
    {},
  );

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* Display items by category */}
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category} className="mb-4 flex flex-row gap-3 items-center">
          <h3 className="font-semibold text-gray-900">{category}</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {categoryItems.map((item) => (
              <button
                key={item.name}
                onClick={() => onToggleItem(item)}
                className={`px-3 py-1 rounded-full text-sm border border-gray-300 hover:border-indigo-500 hover:text-indigo-500 transition-colors ${
                  selectedItems.some((selected) => selected.name === item.name)
                    ? 'bg-indigo-100 text-indigo-800'
                    : ''
                }`}
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
