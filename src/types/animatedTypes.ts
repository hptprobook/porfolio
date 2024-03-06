export interface CursorCoreProps {
    outerStyle?: React.CSSProperties;
    innerStyle?: React.CSSProperties;
    color?: string;
    outerAlpha?: number;
    innerSize?: number;
    outerSize?: number;
    outerScale?: number;
    innerScale?: number;
    trailingSpeed?: number;
    clickables?: string[];
}

export interface DeviceInfo {
    info: string;
    Android: () => RegExpMatchArray | null;
    BlackBerry: () => RegExpMatchArray | null;
    IEMobile: () => RegExpMatchArray | null;
    iOS: () => RegExpMatchArray | null;
    iPad: () => boolean;
    OperaMini: () => RegExpMatchArray | null;
    any: () => boolean;
}

export interface AnimatedCursorProps {
    outerStyle?: React.CSSProperties; // Sử dụng kiểu CSSProperties cho các style object
    innerStyle?: React.CSSProperties;
    color?: string;
    outerAlpha?: number;
    innerSize?: number;
    innerScale?: number;
    outerSize?: number;
    outerScale?: number;
    trailingSpeed?: number;
    clickables?: string[];
}
