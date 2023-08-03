/**
 * key 規則:
 * 1. 跳過空字串
 * 2. 不能使用 . 開頭(throw no dot start error)
 * 3. 不能使用 . 結尾(throw no dot ending error)
 * 4. 若 . 後串聯多點也報錯。ex: abc... / abc..vd / ab.sle..e(throw no consecutive dot error)
 * 5. 可以使用空白作為 key
 * 6. key 字詞間最多只有一個空白，其餘會被刪除
 */

/**
 * value 規則
 * 1. value 字詞間最多只有一個空白，其餘會被刪除
 */

/**
 * Setting value:
 * 1. 若碰到同 key，且該 key 已經有 value，且其 value 為 string，則此 key 無法再使用巢狀結構(throw cannot reset value error)
 */

import { ParsingError } from '../erros/paring.error';

export type DataTreeType = {
  [key: string]: string | DataTreeType;
};

export function treeParser(treeDatas: string[][]) {
  const tree: DataTreeType = {};
  for (let i = 0; i < treeDatas.length; i += 1) {
    const key = treeDatas[i][0];
    if (!key) {
      continue;
    }

    const value = treeDatas[i][1];

    if (!value) {
      continue;
    }

    const trimValue = value.replace(/^\s+|\s+$|\s+(?=\s)/g, '');

    recursiveSetter(key, trimValue, tree, i);
  }

  return tree;
}

function recursiveSetter(key: string, value: string, data: DataTreeType, pairIndex: number) {
  if (key.startsWith('.')) {
    throw new ParsingError('No_Dot_Starting', 'Cannot use dot(.) as starting.', pairIndex);
  }

  if (key.endsWith('.')) {
    throw new ParsingError('No_Dot_Ending', 'Cannot use dot(.) as ending.', pairIndex);
  }

  const splitKeys = key.split('.');
  if (splitKeys.length - 1 !== (key.match(/\./g) || []).length) {
    throw new ParsingError('No_Consecutive_Dot', 'Detect consecutive dot in your key.', pairIndex);
  }

  const trimKey = splitKeys[0].replace(/^\s+|\s+$|\s+(?=\s)/g, '');

  if (splitKeys.length > 1) {
    if (data[trimKey]) {
      const nestData = data[trimKey];
      if (typeof nestData === 'string') {
        throw new ParsingError(
          'Cannot_Reset_Value',
          'Detect the value is already set as string, cannot reset it to nested object.',
          pairIndex,
        );
      } else {
        recursiveSetter(splitKeys.slice(1).join('.'), value, nestData, pairIndex);
      }
    } else {
      const newTree: DataTreeType = {};
      data[trimKey] = newTree;
      recursiveSetter(splitKeys.slice(1).join('.'), value, newTree, pairIndex);
    }
  } else {
    data[trimKey] = value;
  }
}
