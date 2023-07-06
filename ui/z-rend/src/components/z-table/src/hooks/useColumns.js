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
        column._level = level
        return column
    }

    let groupColumns = []
    let colgroups = []

    eachTree(cloneCloumns, convert)

    function convert(column, parentNode, level, index) {
        console.log(column, level, index)

        
    }

    return {
        isGroup: groupColumns.length > 1,
        groupColumns: [],
        colgroups
    }
}