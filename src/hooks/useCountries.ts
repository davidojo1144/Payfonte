import { useQuery } from '@tanstack/react-query';

import { countriesQueryKey } from '@/lib/queryClient';
import { fetchCountries } from '@/services/countries';

export function useCountries() {
  return useQuery({
    queryKey: countriesQueryKey,
    queryFn: fetchCountries,
  });
}
