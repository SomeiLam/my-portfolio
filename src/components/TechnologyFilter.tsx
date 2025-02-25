import { useState } from 'react';

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

// Define the constant order for categories
const CATEGORY_ORDER = [
  'Frontend',
  'Backend',
  'Database',
  'Mobile',
  'Deployment',
  'Testing',
  'Ai',
];

export function TechnologyFilter({
  items,
  selectedItems,
  onToggleItem,
  title,
}: TechnologyFilterProps) {
  const [showMore, setShowMore] = useState(false);

  // Group items by category
  const groupedItems = items.reduce<Record<string, FilterItem[]>>(
    (acc, item) => {
      (acc[item.category] ||= []).push(item);
      return acc;
    },
    {},
  );

  // Sort categories based on CATEGORY_ORDER
  const sortedCategories = Object.entries(groupedItems).sort(
    ([catA], [catB]) =>
      CATEGORY_ORDER.indexOf(catA) - CATEGORY_ORDER.indexOf(catB),
  );

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* Display items by sorted category */}
      {sortedCategories.map(([category, categoryItems]) => {
        const displayedItems = showMore
          ? categoryItems
          : categoryItems.slice(0, 6); // Show more logic

        return (
          <div key={category} className="mb-3 flex flex-row gap-4 items-center">
            <h3 className="font-semibold text-gray-900">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {displayedItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onToggleItem(item)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    selectedItems.some(
                      (selected) => selected.name === item.name,
                    )
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'border-gray-300 hover:border-indigo-500 hover:text-indigo-500'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Show more/less button */}
            {categoryItems.length > 6 && (
              <button
                className="text-sm text-indigo-500 hover:underline mt-2"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
