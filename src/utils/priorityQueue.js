class PriorityQueue {
  constructor(comparator) {
    this.array = [];
    this.size = 0;
    this.compare = comparator;
  }

  add(item) {
    let i = this.size;
    console.log(i);
    this.array[this.size] = item;
    this.size += 1;
    let iParent;
    let valParent;
    while (i > 0) {
      iParent = (i - 1) >> 1;
      valParent = this.array[iParent];
      if (!this.compare(item, valParent)) {
        break;
      }
      this.array[i] = valParent;
      i = iParent;
    }
    this.array[i] = item;
  }

  _percolateDown(i) {
    let size = this.size;
    let hsize = this.size >>> 1;
    let ai = this.array[i];
    let l;
    let r;
    let bestc;
    while (i < hsize) {
      l = (i << 1) + 1;
      r = l + 1;
      bestc = this.array[l];
      if (r < size) {
        if (this.compare(this.array[r], bestc)) {
          l = r;
          bestc = this.array[r];
        }
      }
      if (!this.compare(bestc, ai)) {
        break;
      }
      this.array[i] = bestc;
      i = l;
    }
    this.array[i] = ai;
  }
  poll() {
    if (this.size == 0) return undefined;
    let ans = this.array[0];
    if (this.size > 1) {
      this.array[0] = this.array[--this.size];
      this._percolateDown(0);
    } else {
      this.size -= 1;
    }
    return ans;
  }

  isEmpty() {
    return this.size === 0;
  }
}

module.exports = PriorityQueue;
