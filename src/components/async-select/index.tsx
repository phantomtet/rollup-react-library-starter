import { Empty, Select, Spin } from 'antd/es';
import { DefaultOptionType, SelectProps } from 'antd/es/select';
import React, { UIEvent, useEffect, useRef, useState } from 'react';

export interface I_AsyncSelectProps extends SelectProps {
  getOptions: (
    args: I_SearchParams,
  ) => Promise<DefaultOptionType[]> | DefaultOptionType[];
  getInitialValue: () => Promise<DefaultOptionType>;
  debounceTime?: number;
}

export interface I_SearchParams {
  search: string;
  page: number;
  currentOptions: DefaultOptionType[];
}

const initialSearchParams: I_SearchParams = {
  page: 1,
  search: '',
  currentOptions: [],
};
export const AsyncSelect = ({
  getOptions,
  debounceTime = 400,
  getInitialValue,
  ...props
}: I_AsyncSelectProps) => {
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const timeoutHandler = useRef<NodeJS.Timeout>();
  const searchParams = useRef<I_SearchParams>({ ...initialSearchParams });
  const handleSearch = (params: I_SearchParams, loadMore?: boolean) => {
    if (!getOptions) return;
    searchParams.current = params;
    setLoading(true);
    !loadMore && setOptions([]);
    clearTimeout(timeoutHandler.current);
    timeoutHandler.current = setTimeout(
      async () => {
        try {
          const options = await getOptions(params);
          setLoading(false);
          if (loadMore) setOptions((prev) => [...prev, ...options]);
          else setOptions(options);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
        props.onSearch?.(params.search);
      },
      loadMore || !params.search ? 0 : debounceTime,
    );
  };
  const loadMore = (e: UIEvent<HTMLDivElement, globalThis.UIEvent>) => {
    const target = e.target as HTMLDivElement;
    if (
      loading ||
      target.scrollHeight - Math.abs(target.scrollTop) - target.clientHeight >
        50
    )
      return;
    handleSearch(
      {
        page: searchParams.current.page + 1,
        search: searchParams.current.search,
        currentOptions: options,
      },
      true,
    );
  };
  const fetchInitialData = async () => {
    setLoading(true);
    const data = await getInitialValue();
    setLoading(false);
    if (!data) return;
    setOptions([data]);
  };
  useEffect(() => {
    fetchInitialData();
  }, [getInitialValue]);

  return (
    <Select
      notFoundContent={loading ? <Spin /> : <Empty />}
      placeholder="選択してください"
      virtual={false}
      allowClear
      filterOption={false}
      showSearch
      {...props}
      labelRender={(p) => (loading ? '...' : props.labelRender?.(p) || p.label)}
      onDropdownVisibleChange={(open) =>
        open && handleSearch(initialSearchParams)
      }
      onPopupScroll={loadMore}
      onSearch={(search) => handleSearch({ ...initialSearchParams, search })}
      options={options}
    />
  );
};
