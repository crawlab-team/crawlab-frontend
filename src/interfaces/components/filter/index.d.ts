import {ASCENDING, DESCENDING, UNSORTED,} from '@/constants/sort';

declare global {
  type SortDirection = ASCENDING | DESCENDING | UNSORTED | undefined;
}
