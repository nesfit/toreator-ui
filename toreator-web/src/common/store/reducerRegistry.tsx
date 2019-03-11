/* tslint:disable:variable-name */
export class ReducerRegistry {
  public _emitChange: any;
  public _reducers: object;
  constructor() {
    this._emitChange = null;
    this._reducers = {};
  }

  public getReducers() {
    return {...this._reducers};
  }

  public register(name: any, reducer: any) {
    this._reducers = {...this._reducers, [name]: reducer};
    if (this._emitChange) {
      this._emitChange(this.getReducers());
    }
  }

  public setChangeListener(listener: any) {
    this._emitChange = listener;
  }
}

const reducerRegistry = new ReducerRegistry();
export default reducerRegistry;
