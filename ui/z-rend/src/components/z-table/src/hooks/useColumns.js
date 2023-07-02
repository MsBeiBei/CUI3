import { omit, get, isEmpty } from 'lodash-es'
import { treeMap, eachTree } from '@/utilties/helper/treeHelper'

export const useColumns = (columns) => {
    if (!Array.isArray(columns)) {
        return []
    }


    let maxLevel = 0

    const cloneCloumns = treeMap(columns, { conversion })

    function conversion(column, level) {
        maxLevel = Math.max(maxLevel, level)
        return column
    }

    let groupColumns = []
    let colgroups = []

    eachTree(cloneCloumns, convert)

    function convert(column, parentNode, level, index) {
        if (isEmpty(column.children)) {
            column._keys = column.key;
            column._colspan = 1;
            column._rowspan = maxLevel - level + 1;
        } else {
            let colspan = 0
        }

        return column
    }

    console.log(cloneCloumns)

    return {
        isGroup: groupColumns.length > 1,
        groupColumns: [],
        colgroups
    }
}