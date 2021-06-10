type DataCollectionStoreModule = BaseModule<DataCollectionStoreState, DataCollectionStoreGetters, DataCollectionStoreMutations, DataCollectionStoreActions>;

interface DataCollectionStoreState extends BaseStoreState<DataCollection> {
  resultTableData: TableData<Result>;
  resultTableTotal: number;
  resultTablePagination: TablePagination;
}

interface DataCollectionStoreGetters extends BaseStoreGetters<DataCollectionStoreState> {
  resultFields: StoreGetter<DataCollectionStoreState, ResultField[]>;
}

interface DataCollectionStoreMutations extends BaseStoreMutations<DataCollection> {
  setResultTableData: StoreMutation<DataCollectionStoreState, TableDataWithTotal<Result>>;
  resetResultTableData: StoreMutation<DataCollectionStoreState>;
  setResultTablePagination: StoreMutation<DataCollectionStoreState, TablePagination>;
  resetResultTablePagination: StoreMutation<DataCollectionStoreState>;
}

interface DataCollectionStoreActions extends BaseStoreActions<DataCollection> {
  getResultList: StoreAction<DataCollectionStoreState, { string; ListRequestParams }>;
}
