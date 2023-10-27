const query = {
    SELECT_all: 'SELECT  * FROM stock order by Timestamp DESC Limit 5',
    SELECT_flow: 'SELECT * FROM stock order by Timestamp DESC Limit 1'
};
module.exports=query