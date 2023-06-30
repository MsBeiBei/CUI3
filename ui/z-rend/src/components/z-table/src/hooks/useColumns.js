import { eachTree } from '@/utilties/helper/treeHelper'

export const useColumns = (columns) => {
    if (!Array.isArray(columns)) {
        return []
    }


    eachTree(columns)

    function setProperty(index, level) {

    }
}