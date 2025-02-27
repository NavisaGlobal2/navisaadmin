import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ApplicationFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  expertFilter: string;
  onExpertFilterChange: (value: string) => void;
  stageFilter: string;
  onStageFilterChange: (value: string) => void;
}

export const ApplicationFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  expertFilter,
  onExpertFilterChange,
  stageFilter,
  onStageFilterChange,
}: ApplicationFiltersProps) => {
  return (
    <div className='flex flex-col md:flex-row gap-4'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4' />
        <Input
          placeholder='Search by name, email...'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className='pl-10'
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Filter by status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Statuses</SelectItem>
          <SelectItem value='Pending'>Pending Review</SelectItem>

          {/* <SelectItem value='In Review'>In Review</SelectItem> */}
          <SelectItem value='Completed'>Completed</SelectItem>
          {/* <SelectItem value='Rejected'>Rejected</SelectItem>
          <SelectItem value='More Info Needed'>More Info Needed</SelectItem>
          <SelectItem value='Escalated'>Escalated</SelectItem> */}
        </SelectContent>
      </Select>

      <Select value={stageFilter} onValueChange={onStageFilterChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Filter by status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Stages</SelectItem>
          <SelectItem value='Assessment Test'>Assessment Test</SelectItem>
          <SelectItem value='Document Upload'>Document Upload</SelectItem>
        </SelectContent>
      </Select>
      {/* <Select value={expertFilter} onValueChange={onExpertFilterChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Filter by expert' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Experts</SelectItem>
          <SelectItem value='Sarah Wilson'>Sarah Wilson</SelectItem>
          <SelectItem value='Michael Brown'>Michael Brown</SelectItem>
        </SelectContent>
      </Select> */}
    </div>
  );
};
