import React from 'react';

export default function withTreeData(WrappedComponent) {
  class WithTreeData extends React.Component {
    number = 0;
    state = {
      tree: [],
      flat: [],
    };

    render() {
      const { state, ...other } = this;
      const { forwardedRef, ...propsOther } = this.props;
      return (
        <WrappedComponent
          {...propsOther}
          dataSource={{ ...state, ...other }}
          ref={forwardedRef}
          forwardedRef={forwardedRef}
        />
      );
    }

    add = (item, path = '') => {
      const { flat, tree } = this.state;
      this.parsingPath(path).push(item);
      flat.push(item);
      this.setState({ tree, flat });
    };
    /**
     * 删除一个元素
     * @param {String} key [字段名]
     * @param {Any} value [字段值]
     * @return {Object} [返回被删除的元素]
     */
    remove = (key, value) => {
      const { tree, flat } = this.state;
      const result = { tree: [], flat: [] };
      let flatLen = flat.length;
      // 删除平级数据
      while (flatLen--) {
        if (flat[flatLen][key] === value) {
          result.flat = flat.splice(flatLen, 1);
          flatLen = 0;
        }
      }
      // 删除树形数据
      TreeItem(key, value, tree);
      function TreeItem(key, value, data) {
        for (let i = 0, len = data.length; i < len; i++) {
          const temp = data[i];
          if (temp[key] === value) {
            result.tree = data.splice(i, 1);
            return;
          }
          if (Array.isArray(temp.children)) {
            TreeItem(key, value, temp.children);
          }
        }
      }
      this.setState({ tree, flat });
      return result;
    };
    update = (key, value, item) => {
      const { tree, flat } = this.state;
      // 更新平级数据
      let flatLen = flat.length;
      while (flatLen--) {
        if (flat[flatLen][key] === value) {
          flat[flatLen] = item;
          flatLen = 0;
        }
      }
      // 更新树形数据
      treeItem(key, value, tree);
      function treeItem(key, value, data) {
        for (let i = 0, len = data.length; i < len; i++) {
          const temp = data[i];
          if (temp[key] === value) {
            data[i] = item;
            return;
          }
          if (Array.isArray(temp.children)) {
            treeItem(key, value, temp.children);
          }
        }
      }
      this.setState({ tree, flat });
    };
    find = (key, value) => {
      const { flat } = this.state;
      let len = flat.length;
      while (len--) {
        if (flat[len][key] === value) {
          return flat[len];
        }
      }
    };
    /**
     * 在某个层级加创建一个父节点
     * @param {Any} item [节点信息]
     * @param {String} path [路径]
     */
    createTreeLayer = (item, path) => {
      this.parsingPath(path).push({ children: [], ...item, path: `1` });
    };
    createDataSource = ({ tree = [], flat = [] }) => {
      this.setState({ tree, flat });
    };
    /**
     * 解析路径
     * @param {String} path [路径]
     * @return {Array} [路径下的子节点集合]
     */
    parsingPath = (path = '') => {
      const { tree } = this.state;
      const indexs = path ? path.split('-') : [];
      return indexs.length ? getNode(indexs, 0, tree) : tree;

      function getNode(keys, index, next) {
        const key = keys[index];
        if (key === undefined) {
          return next;
        }
        if (Array.isArray(next[key].children)) {
          getNode(keys, index + 1, next[key].children);
        }
      }
    };
    /**
     * 累加数，保持节点唯一性
     * @return {Number} [返回一个唯一的字符串]
     */
    count = () => {
      return `${this.number++}`;
    };

    getData = () => {
      return this.state;
    };
  }
  return React.forwardRef((props, ref) => <WithTreeData {...props} forwardedRef={ref} />);
}
