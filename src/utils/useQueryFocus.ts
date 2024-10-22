import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
export function useQueryFocus(
  queryKey: Array<string>,
  queryFn: any,
  notifyOnChangeProps: any,
) {
  const focusedRef = React.useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      focusedRef.current = true;
      return () => {
        focusedRef.current = false;
      };
    }, []),
  );

  const handleChangeProps = () => {
    if (!focusedRef.current) return [];
    if (typeof notifyOnChangeProps === 'function') return notifyOnChangeProps();
    return notifyOnChangeProps;
  };

  const queryResult = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    enabled: focusedRef.current,
    notifyOnChangeProps: handleChangeProps(),
    refetchOnWindowFocus: true,
    staleTime: 5000,
  });

  return queryResult;
}
