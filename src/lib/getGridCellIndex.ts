const getPositionByGlobalPoint = (point: number[], cellWidth: number, cellHeight: number) => {
    const [x, y] = point;
    const col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);
    return [col, row]
}

const getIndex = (position: number[], maxCol: number) => {
    const [col, row] = position;
    return col + row * maxCol
}

/**
 * 根据全局的位置获取网格格子的索引
 * @param globalPoint 
 * @returns 
 */
export const getGridCellIndex = (globalPoint: number[], cellWidth: number, cellHeight: number, maxCol: number) => {
    return getIndex(
        getPositionByGlobalPoint(globalPoint, cellWidth, cellHeight),
        maxCol
    );
}