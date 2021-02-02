import getNodeStyleByTheme from './node-style';
import getEdgeStyleByTheme from './edge-style';
import getComboStyleByTheme from './combo-style';
import { NodeStyle, EdgeStyle, ComboStyle } from '../typings/type';

export const DEFAULT_THEME = {
  mode: 'light',
  primaryColor: '#269a99', // '#3D76DD',
  nodeSize: 26,
  edgeSize: 1,
  primaryEdgeColor: '#ddd',
};

export interface ThemeType {
  /**
   * @description 模式 light | dark
   * @default light
   */
  mode: 'light' | 'dark';
  /**
   * @description 画布背景色
   */
  background: string;
  /**
   * @description 节点大小
   */
  nodeSize: number;
  /**
   * @description 节点主要颜色
   */
  primaryColor: string;
  /**
   * @description 边的大小
   */
  edgeSize: number;
  /**
   * @description 边的主要颜色
   */
  primaryEdgeColor: string;
}

export type NodeTheme = Pick<ThemeType, 'mode' | 'primaryColor' | 'nodeSize'>;

export type EdgeTheme = Pick<ThemeType, 'mode' | 'primaryEdgeColor' | 'edgeSize'>;

export interface ThemeData extends ThemeType {
  defaultNodeStyle: NodeStyle & { type: string };
  defaultNodeStatusStyle: NodeStyle['status'];
  defaultEdgeStyle: EdgeStyle & { type: string };
  defaultEdgeStatusStyle: EdgeStyle['status'];
  defaultComboStyle: ComboStyle & { type: string };
  defaultComboStatusStyle: ComboStyle['status'];
}

export const getDefaultStyleByTheme = (inputTheme: Partial<ThemeType> | undefined) => {
  const theme = { ...DEFAULT_THEME, ...inputTheme } as ThemeType;
  const { primaryColor, primaryEdgeColor, nodeSize, edgeSize, mode, background } = theme;

  const nodeStyle = getNodeStyleByTheme({
    primaryColor,
    nodeSize,
    mode,
  });

  const edgeStyle = getEdgeStyleByTheme({
    primaryEdgeColor,
    edgeSize,
    mode,
  });

  const comboStyle = getComboStyleByTheme();

  const BackgroundStyle = {
    light: '#fff',
    dark: '#1f1f1f',
  };

  return {
    ...theme,
    mode,
    background: background || BackgroundStyle[mode],
    defaultNodeStyle: { type: nodeStyle.type, style: nodeStyle.style },
    defaultNodeStatusStyle: { status: nodeStyle.status },
    defaultEdgeStyle: { type: edgeStyle.type, style: edgeStyle.style },
    defaultEdgeStatusStyle: { status: edgeStyle.status },
    defaultComboStyle: { type: comboStyle.type, style: comboStyle.style },
    defaultComboStatusStyle: { status: comboStyle.status },
  };
};
