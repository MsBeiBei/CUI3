export function treeMap(treeData, opt, level = 0) {
    return treeData.map((item, index) => treeMapEach(item, opt, level, index));
}


export function treeMapEach(
    data,
    { children = 'children', conversion },
    level = 0,
    index
) {
    const haveChildren = Array.isArray(data[children]) && data[children].length > 0;
    const conversionData = conversion(data, level, index) || {};
    if (haveChildren) {
        return {
            _level: level,
            ...conversionData,
            [children]: data[children].map((i) =>
                treeMapEach(i, {
                    children,
                    conversion,
                }, ++level),
            ),
        };
    } else {
        return {
            _level: level,
            ...conversionData,
        };
    }
}

export function eachTree(treeDatas, callBack, parentNode = {}, level = 0) {
    treeDatas.forEach((element, index) => {
        const newNode = callBack(element, parentNode, level, index) || element;
        if (element.children) {
            eachTree(element.children, callBack, newNode, ++level);
        }
    });
}