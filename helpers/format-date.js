
const getFormatedDate = async () => {
    let dateElapsed = Date.now();
    let date = new Date(dateElapsed);
    const formatDate = date.toISOString().split('T')[0];
    return formatDate
}

module.exports = {
    getFormatedDate
}