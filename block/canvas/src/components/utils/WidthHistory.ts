class StorageData {
  data: any;
  history: any[] = [];
  redoHistory: any[] = [];

  createData(data: any) {
    this.data = data;
    this.history = [JSON.stringify(data)];
  }
  addHistory(data: any) {
    this.history.push(JSON.stringify(data));
    this.redoHistory = [];
  }
  getHistory() {
    return this.history;
  }
  getRedo() {
    return this.redoHistory;
  }
  getData() {
    return this.data;
  }
  undo() {
    if (this.history.length) {
      const lastHistory = this.history.pop();
      this.redoHistory.push(lastHistory);
      if (this.history.length) {
        return JSON.parse(this.history.slice(-1)[0]);
      } else {
        return null;
      }
    }
    return null;
  }
  redo() {
    if (this.redoHistory.length) {
      const lastRedo = this.redoHistory.pop();
      this.history.push(lastRedo);
      return JSON.parse(lastRedo);
    }
    return null;
  }
}

export default StorageData;
