import sql from 'mssql';

export default class Database {
  config = {};
  poolconnection = null;
  connected = false;

  constructor(config) {
    this.config = config;
    console.log(`Database: config: ${JSON.stringify(config)}`);
  }

  async connect() {
    try {
      console.log(`Database connecting...${this.connected}`);
      if (this.connected === false) {
        this.poolconnection = await sql.connect(this.config);
        this.connected = true;
        console.log('Database connection successful');
      } else {
        console.log('Database already connected');
      }
    } catch (error) {
      console.error(`Error connecting to database: ${JSON.stringify(error)}`);
    }
  }

  async disconnect() {
    try {
      this.poolconnection.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error(`Error closing database connection: ${error}`);
    }
  }

  async executeQuery(query) {
    await this.connect();
    const request = this.poolconnection.request();
    const result = await request.query(query);

    return result.rowsAffected[0];
  }

  async createUser(data) {
    await this.connect();
    const request = this.poolconnection.request();

    request.input('userName', sql.NVarChar(255), data.userName);
    request.input('numRewards', sql.Int, data.numRewards);

    const result = await request.query(
        'INSERT INTO Users(userName, numRewards) VALUES (@userName,@numRewards)'
    );

    return result.rowsAffected[0];
  }

  async readUser(id) {
    await this.connect();

    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, +id)
      .query(`SELECT * FROM Users WHERE userID = @id`);

    return result.recordset[0];
  }

  async readUsers() {
    await this.connect();

    const request = this.poolconnection.request();
    const result = await request
      .query(`SELECT * FROM Users`);

    return result.recordset;
  }

  async deleteUser(id) {
    await this.connect();

    const idAsNumber = Number(id);

    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, idAsNumber)
      .query(`DELETE FROM Users WHERE userID = @id`);

    return result.rowsAffected[0];
  }


  async readItems() {
    await this.connect();

    const request = this.poolconnection.request();
    const result = await request
      .query(`SELECT * FROM Items`);

    return result.recordset;
  }

  async createItem(data) {
    await this.connect();
    const request = this.poolconnection.request();

    request.input('itemName', sql.NVarChar(255), data.ItemName);
    request.input('itemDesc', sql.NVarChar(255), data.ItemDesc);
    request.input('itemPrice', sql.Float, data.ItemPrice);

    const result = await request.query(
        'INSERT INTO Items(ItemName, ItemDesc, ItemPrice) VALUES (@itemName,@itemDesc,@itemPrice)'
    );

    return result.rowsAffected[0];
  }

  async readItem(id) {
    await this.connect();

    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, +id)
      .query(`SELECT * FROM Items WHERE MenuItemID = @id`);

    return result.recordset[0];
  }

  async deleteItem(id) {
    await this.connect();

    const idAsNumber = Number(id);

    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, idAsNumber)
      .query(`DELETE FROM Items WHERE MenuItemID = @id`);

    return result.rowsAffected[0];
  }

  async orderHistory(userName) {
      await this.connect();

      const request = this.poolconnection.request();
      const result = await request.input('user',userName).execute('userOrderHistory');

      return result.recordset;

  }


  async createOrder(data,user) {
    await this.connect();
    const request = this.poolconnection.request();
    
    const items = [];
    const quants = [];
    for (const item of data.items){
      items.push(item.ItemID);
      quants.push(item.Quantity)
    }
    console.log(`items: ${JSON.stringify(items)}`);
    console.log(`quants: ${JSON.stringify(quants)}`);
    
    var strItemList = JSON.stringify(items);
    strItemList = strItemList.slice(1,-1);
    var strQuantList = JSON.stringify(quants);
    strQuantList = strQuantList.slice(1,-1);

    console.log(strItemList);
    console.log(strQuantList);

    const result = await request.input('itemList',strItemList).input('quantList',strQuantList).input('userName',user).execute('createOrder');

    return result.rowsAffected;
  }

}