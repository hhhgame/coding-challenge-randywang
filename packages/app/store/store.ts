// 状态库 store.ts
import { Asset } from '@chain-registry/types';
import { asset_list } from '@chain-registry/osmosis';
interface PoolsData {
  id: string;
  token1: { name: string; imgSrc: string };
  token2: { name: string; imgSrc: string };
  poolLiquidity: number;
  apr: number;
  myLiquidity: number;
  myBoundedAmount: number;
  longestDaysUnbonding: boolean;
}
// eslint-disable-next-line no-undef
interface Store {
  // eslint-disable-next-line no-undef
  readonly all_assets_list: Asset[];
  readonly all_poollist: Asset[];
  // eslint-disable-next-line no-undef
  assets_list: Asset[];
  // eslint-disable-next-line no-undef
  poll_list: PoolsData[];
}

const getShuffledArr = (arr: any[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  return arr;
};
const allTokens = asset_list.assets.map(({ name, logo_URIs }) => ({
  name: name,
  imgSrc: logo_URIs.png
}));
const poolOptionToken1 = getShuffledArr([...allTokens]);
const poolOptionToken2 = getShuffledArr([...allTokens]).filter(
  (v, i) => v !== poolOptionToken1[i]
);
const getRandomId = getShuffledArr(
  [...Array(500)].map((v, i) => (v = i + 1))
).slice(0, 4);
const getRandomPoolLiquidity = [...Array(4)].fill(undefined).map((_) => {
  return parseInt(
    getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      .toString()
      .replaceAll(',', '')
  );
});
const getRandomMyLiquidity = [...Array(4)].fill(undefined).map((_) => {
  return parseInt(
    getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      .toString()
      .slice(0, 5)
      .replaceAll(',', '')
  );
});
const getRandomAPR = [...Array(4)].fill(undefined).map((_) => {
  return (
    parseInt(
      getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        .toString()
        .slice(0, 7)
        .replaceAll(',', '')
    ) / 100
  );
});
const getDefaultData = [...Array(asset_list.assets.length)]
  .fill(undefined)
  .map((_, i) => ({
    id: getRandomId[i],
    token1: poolOptionToken1[i],
    token2: poolOptionToken2[i],
    poolLiquidity: getRandomPoolLiquidity[i],
    apr: getRandomAPR[i],
    myLiquidity: getRandomMyLiquidity[i],
    myBoundedAmount: getRandomMyLiquidity[i],
    longestDaysUnbonding: Math.random() < 0.5
  }));

export function createStore() {
  return {
    assets_list: asset_list.assets,
    // @ts-ignore
    poll_list: getDefaultData,
    get all_assets_list() {
      return this.assets_list;
    },
    get all_poll_list() {
      return this.poll_list;
    },
    add_asset(asset: Asset) {
      this.assets_list.push(asset);
    }
  };
}

export default createStore;

// eslint-disable-next-line no-undef
export type TStore = ReturnType<typeof createStore>;
