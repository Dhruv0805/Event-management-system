import SearchBar from '../common/SearchBar';
import Select from '../common/Select';

// Search + category + status filters for the Events page. Kept dumb
// (controlled by the parent page) so it stays reusable and independent.
const EventFilter = ({ search, onSearchChange, category, onCategoryChange, categories = [] }) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
    <div className="flex-1">
      <SearchBar value={search} onChange={onSearchChange} placeholder="Search events by name or venue..." />
    </div>
    <div className="sm:w-56">
      <Select
        name="category"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        placeholder="All Categories"
        options={categories.map((c) => ({ value: c._id, label: c.name }))}
      />
    </div>
  </div>
);

export default EventFilter;
