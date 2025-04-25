export interface ITableHead<T> {
  title?: string
  key: keyof T | 'action'
}

export interface ITableHeaders<T> extends Array<ITableHead<T>> {}
