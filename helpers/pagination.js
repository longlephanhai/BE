const paginationHelper = (objectPagination, query, countProduct) => {
    if (query.page) {
        objectPagination.currenttPage = Number(query.page);
    }
    objectPagination.skip = (objectPagination.currenttPage - 1) * objectPagination.limitItems;
    const totalPage = countProduct / objectPagination.limitItems;
    objectPagination.totalPage = Math.ceil(totalPage)
    return objectPagination
}
module.exports = paginationHelper