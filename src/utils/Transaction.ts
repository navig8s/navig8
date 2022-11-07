type State = 'Init' | 'Pending' | 'Fulfilled' | 'Rejected'

interface Init {
  state: 'Init'
  data: null
  error: null
}
interface Pending<T> {
  state: 'Pending'
  error: null
}
interface PendingFirst<T> {
  state: 'Init' | 'Pending'
  data: null
  error: null
}
interface Fulfilled<T> {
  state: 'Fulfilled'
  data: T
  error: null
}
interface Rejected<E> {
  state: 'Rejected'
  data: null
  error: E
}

interface TransactionContract<E, T> {
  state: State
  data: T | null
  error: E | null
}
/* Transaction is a data wrapper that unites transaction state, and it's response. Also gives an API to handle the state declaratively.
 *   Initial instance has a state 'Init':
 *    new Transaction().isInit() => true
 *
 *   To mark request as pending:
 *    remoteDataInstance = remoteDataInstance.pending()
 *    remoteDataInstance.isPending() => true
 *
 *   To mark request as fulfilled:
 *    remoteDataInstance = remoteDataInstance.fulfilled(data)
 *    remoteDataInstance.isFulfilled() => true
 *    remoteDataInstance.hasData() => true
 *
 *   To mark request as rejected:
 *    remoteDataInstance = remoteDataInstance.rejected(error)
 *    remoteDataInstance.isRejected() => true
 *    remoteDataInstance.hasError() => true
 *
 *   To unwrap the data depending on its state we could use getOrElse, that will return data or default value in case request is not yet fulfilled:
 *    transactionInstance.getOrElse(() => []) => returns data or an empty array in case state is not yet fulfilled
 *    .....
 *  */
export class Transaction<E, T> implements TransactionContract<E, T> {
  constructor(
    public state: State = 'Init',
    public data: T | null = null,
    public error: E | null = null,
  ) {}

  static pending<E, T>(data?: T) {
    return new Transaction<E, T>('Pending', data, null)
  }
  static fulfilled<E, T>(data: T) {
    return new Transaction<E, T>('Fulfilled', data, null)
  }
  static rejected<E, T>(error: E) {
    return new Transaction<E, T>('Rejected', null, error)
  }

  toPending() {
    return new Transaction<E, T>('Pending', this.data, null)
  }
  toFulfilled(data: T) {
    return new Transaction<E, T>('Fulfilled', data, null)
  }
  toRejected(error: E | null) {
    return new Transaction<E, T>('Rejected', null, error)
  }

  fold<R>(onNone: () => R, onRejected: (error: E) => R, onSome: (data: T) => R) {
    if (this.hasError()) return onRejected(this.error)
    if (this.hasData()) return onSome(this.data)

    return onNone()
  }
  foldData<R>(onNone: () => R, onSome: (data: T) => R) {
    return this.data === null ? onNone() : onSome(this.data)
  }
  foldError<R>(onNone: () => R, onSome: (error: E) => R) {
    return this.error === null ? onNone() : onSome(this.error)
  }
  getOrElse<D>(orElse: () => T | D) {
    return this.hasData() ? this.data : orElse()
  }
  getErrorOrElse<T>(orElse: () => E | T) {
    return this.hasError() ? this.error : orElse()
  }

  // TODO: Such type guards do not work correctly in the 'else' part of the if/else statement. Not worth it to solve now but in the future after migration to TS & Vue 3 this class should be reconsidered.
  hasData(): this is { data: T } {
    return this.data !== null
  }
  hasError(): this is { error: E } {
    return this.error !== null
  }

  isInit(): this is Init {
    return this.state === 'Init'
  }
  isPending(): this is Pending<T> {
    return this.state === 'Pending'
  }
  isRejected(): this is Rejected<E> {
    return this.state === 'Rejected'
  }
  isFulfilled(): this is Fulfilled<T> {
    return this.state === 'Fulfilled'
  }
  isPendingFirst(): this is PendingFirst<T> {
    return this.isInit() || (this.isPending() && this.data === null)
  }

  map<N>(mapper: (data: T) => N): Transaction<E, N> {
    if (this.hasData()) {
      const newData = mapper(this.data)

      return this.isFulfilled()
        ? Transaction.fulfilled<E, N>(newData)
        : Transaction.pending<E, N>(newData)
    }

    return new Transaction<E, N>(this.state, null, this.error)
  }
  mapError<N>(mapper: (data: E) => N) {
    if (this.hasError()) return Transaction.rejected<N, T>(mapper(this.error))

    return new Transaction<N, T>(this.state, this.data, null)
  }

  update(data: T) {
    return this.toFulfilled(data)
  }
}
