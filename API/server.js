let cfg = require('./config.json')

let express = require('express');
let cors = require('cors')
const app = express();
app.use(express.static('public')); // host public folder
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *

const pool = require('./pool.js');

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

const checkAuth = require('./check_auth');

const loginRoutes = require('./login');
const { table } = require('console');
app.use("/payOrder", loginRoutes);

/*
Every needed and defined api request.
 */

app.get("/", (req, res) =>
{
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("API is running!");
});


app.get("/login", (req, res) => //Login request
{
  res.setHeader('Content-Type', 'application/json');
  pool.query("select * from users u where u.roletype = '1'")
    .then((data) =>
    {
      res.status(200).send(data.rows);
    });
});

/**
 * MenuItem
 * */

app.get("/menuItems", (req, res) => // Get all menu-items
{

  res.setHeader('Content-Type', 'application/json');
  pool.query("select * from menuitem")
    .then((data) =>
    {
      res.status(200).send(data.rows);
    });
});

app.delete("/menuItems/:id", (req, res) => //Deletes the MenuItem with the given id
{
  res.setHeader('Content-Type', 'application/json');
  let sql = 'DELETE FROM menuitem men WHERE men.menuitemid = $1;'
  pool.query(sql,[req.params.id])
    .then((data) =>
    {
      res.status(200).send();
      console.log('Deleted Entry: ', res.rowsAffected);
    })
});

app.post("/menuItems", (req, res) => //Inserts new item into MenuItem
{
  res.setHeader('Content-Type', 'application/json');
  pool.query("insert into menuitem(menuitemid, title, itemdescription,price, menuallergenes, menucategory)" +
    "values($1, $2, $3, $4, $5, $6)",
    [req.body.menuitemid, req.body.title, req.body.itemdescription, req.body.price, req.body.menuallergenes, req.body.menucategory]).
  then((data) =>
  {
    res.status(200).send();
  });
});


app.put("/menuItems", (req, res) => //Updates existing MenuItem with the given parameters
{
  res.setHeader('Content-Type', 'application/json');
  pool.query("update menuitem set menuitemid = $1, title = $2, itemdescription = $3, price = $4, menuallergenes = $5, menucategory = $6 where menuitemid = $1",
    [req.body.menuitemid, req.body.title, req.body.itemdescription, req.body.price, req.body.menuallergenes, req.body.menucategory]).
  then((data) =>
  {
    res.status(200).send();
  });
});


/**
 * Tables
 * */


app.get("/tables", (req, res) => // Get all tables
{

  res.setHeader('Content-Type', 'application/json');
  pool.query("select * from tables")
    .then((data) =>
    {
      res.status(200).send(data.rows);
    });
});

//Deletes the Table with the given id
app.delete("/tables/:tablesid", (req, res) =>
{
  res.setHeader('Content-Type', 'application/json');
  let sql = 'DELETE FROM tables tab WHERE tab.tablesid = $1;'
  pool.query(sql,[req.params.tablesid])
    .then((data) =>
    {
      res.status(200).send();
      console.log('Deleted Entry: ', res.rowsAffected);
    })
});

//Inserts new item into Tables
app.post("/tables", (req, res) =>
{
  res.setHeader('Content-Type', 'application/json');
  pool.query("insert into tables(tablesid, tablesseats, tableslocationdescription)" +
    "values($1, $2, $3)",
    [req.body.tablesid, req.body.tablesseats, req.body.tableslocationdescription]).
  then((data) =>
  {
    res.status(200).send();
  });
});

//Updates existing Tables with the given parameters
app.put("/tables", (req, res) =>
{
  res.setHeader('Content-Type', 'application/json');
  pool.query("update tables set tablesid = $1, tablesseats = $2, tableslocationdescription = $3 where tablesid = $1",
    [req.body.tablesid, req.body.tablesseats, req.body.tableslocationdescription]).
  then((data) =>
  {
    res.status(200).send();
  });
});


/**
 * Users
 * */

app.get("/users", (req, res) => // Get all users
{

  res.setHeader('Content-Type', 'application/json');
  pool.query("select * from users")
    .then((data) =>
    {
      res.status(200).send(data.rows);
    });
});

//Deletes the Table with the given id
app.delete("/users/:userid", (req, res) =>
{
  res.setHeader('Content-Type', 'application/json');
  let sql = 'DELETE FROM users use WHERE use.userid = $1;'
  pool.query(sql,[req.params.userid])
    .then((data) =>
    {
      res.status(200).send();
      console.log('Deleted Entry: ', res.rowsAffected);
    })
});

//Inserts new item into Tables
app.post("/users", (req, res) =>
{
  res.setHeader('Content-Type', 'application/json');
  pool.query("insert into users(userid, username, password,  roletype)" +
    "values($1, $2, $3, $4)",
    [req.body.userid, req.body.username, req.body.password, req.body.roletype]).
  then((data) =>
  {
    res.status(200).send();
  });
});

//Updates existing Tables with the given parameters
app.put("/users", (req, res) =>
{
  res.setHeader('Content-Type', 'application/json');
  pool.query("update users set userid = $1, username = $2, password = $3, roletype = $4 where userid = $1",
    [req.body.userid, req.body.username, req.body.password, req.body.roletype ]).
  then((data) =>
  {
    res.status(200).send();
  });
});


/**
 * Categories
 * */


app.get("/categories", (req, res) => // Get all categories
{

  res.setHeader('Content-Type', 'application/json');
  pool.query("select * from category")
    .then((data) =>
    {
      res.status(200).send(data.rows);
    });
});

//Deletes the Categorie with the given id
app.delete("/categories/:categoryid", (req, res) =>
{
  res.setHeader('Content-Type', 'application/json');
  let sql = 'DELETE FROM category cat WHERE cat.categoryid = $1;'
  pool.query(sql,[req.params.categoryid])
    .then((data) =>
    {
      res.status(200).send();
      console.log('Deleted Entry: ', res.rowsAffected);
    })
});

//Inserts new item into Categories
app.post("/categories", (req, res) =>
{
  res.setHeader('Content-Type', 'application/json');
  pool.query("insert into category(categoryid, categorytitle, categorydescription) " +
    "values($1, $2, $3)",
    [req.body.categoryid, req.body.categorytitle, req.body.categorydescription]).
  then((data) =>
  {
    res.status(200).send();
  });
});

//Updates existing categorie with the given parameters
app.put("/categories", (req, res) =>
{
  res.setHeader('Content-Type', 'application/json');
  pool.query("update category set categoryid = $1, categorytitle = $2, categorydescription = $3 where categoryid = $1",
    [req.body.categoryid, req.body.categorytitle, req.body.categorydescription]).
  then((data) =>
  {
    res.status(200).send();
  });
});

/*
The following code is from our other teams to work with their views and was not written by us.
 */

app.get("/menuCategories/:title", (req, res) =>
{
    res.setHeader('Content-Type', 'application/json');
    pool.query("select categoryId, title, description " +
        "from menu_categories cat " +
        "where LOWER(cat.title) = LOWER($1);",
        [req.params.title])
        .then((data) =>
        {

            res.status(200).send(data.rows[0]);
        });
});


app.get("/menuList/:category", (req, res) =>
{
    res.setHeader('Content-Type', 'application/json');
    pool.query("select items.itemid, items.title, items.description, price, allergens, status " +
        "from menu_items items, menu_categories cat, menu_itemsXmenu_categories merger " +
        "where items.itemId = merger.itemId and cat.categoryId = merger.categoryId and LOWER(cat.title) = LOWER($1);",
        [req.params.category])
        .then((data) =>
        {
            res.status(200).send(data.rows);
        });
});

app.get("/reviews", (req, res) =>
{
    res.setHeader('Content-Type', 'application/json');
    pool.query("select * from reviews").
        then((data) =>
        {
            res.status(200).send(data.rows);
        });
});

app.post("/review", (req, res) =>
{
    res.setHeader('Content-Type', 'application/json');
    pool.query("insert into reviews(description, stars, createdAt) " +
        "values($1, $2, $3)",
        [req.body.description, req.body.stars, req.body.createdAt]).
        then((data) =>
        {
            res.status(200).send();
        });
});

app.post("/order", checkAuth, (req, res) =>
{
    res.setHeader('Content-Type', 'application/json');
    let tableId = req.tableId;
    console.log(tableId);
});

app.get("/orders", (req, res) =>
{
    res.setHeader('Content-Type', 'application/json');

    let tableId = req.query.tableId;

    pool.query("select o.orderId, o.status, o.orderDate, o.paymentReference, mItem.itemId, mItem.title, mItem.description, mItem.price, mItem.allergens, mItem.status, oItem.count " +
        "from orders o, menu_items mItem, orderedItems oItem " +
        "where o.tableId = $1 and o.orderId = oItem.orderId and mItem.itemId = oItem.itemId ",
        [tableId])
        .then((data) =>
        {
            let orders = [];

            data.rows.forEach((row) =>
            {
                insertIntoOrders(row);
            });

            res.status(200).send(orders);

            function insertIntoOrders(row)
            {
                let order =
                {
                    orderId: row.orderid,
                    status: row.status,
                    orderDate: row.orderdate,
                    paymentReference: row.paymentreference,
                    menuItems: []
                };

                let orderIndex = findOrder(order.orderId);

                let menuItem =
                {
                    itemid: row.itemid,
                    title: row.title,
                    description: row.description,
                    price: row.price,
                    allergens: row.allergens,
                    count: row.count
                };

                if (orderIndex == -1)
                {
                    orders.push(order);
                    order.menuItems.push(menuItem);
                }
                else
                {
                    orders[orderIndex].menuItems.push(menuItem);
                }
            }

            function findOrder(id)
            {
                for (let i = 0; i < orders.length; i++)
                {
                    if (orders[i].orderId == id)
                    {
                        return i;
                    }
                }

                return -1;
            }
        });


});

//https://sebhastian.com/javascript-group-by/
function groupBy(arr, criteria)
{
    const newObj = arr.reduce(function (acc, currentValue)
    {
        if (!acc[currentValue[criteria]])
        {
            acc[currentValue[criteria]] = [];
        }
        acc[currentValue[criteria]].push(currentValue);
        return acc;
    }, {});
    return newObj;
}


app.get("/resetDatabase", (req, res) =>
{
    let menuItemsJson = require('../json_Files/menu_Items.json');
    let menuCategoriesJson = require('../json_Files/menu_categories.json');

    res.setHeader('Content-Type', 'application/json');

    pool.query("delete from menu_itemsXmenu_categories;" +
        "delete from orderedItems;" +
        "delete from menu_categories;" +
        "delete from menu_items;" +
        "delete from reviews;" +
        "delete from orders;"
        )
        .then(() =>
        {
            uploadMenuCategories().
                then(() =>
                {
                    uploadMenuItems();
                    console.log("Reset Database successfull");
                });

            res.status(200).send(menuItemsJson);
        });

    function uploadMenuItems()
    {
        for (let key in menuItemsJson)
        {

            if (menuItemsJson.hasOwnProperty(key))
            {

                let allergens = "";

                for (let keyAllergen in menuItemsJson[key].allergens)
                {
                    if (menuItemsJson.hasOwnProperty(keyAllergen))
                    {
                        allergens += menuItemsJson[key].allergens[keyAllergen];
                    }
                }

                pool.query('insert into menu_items(itemid, title, description, price, status, allergens) ' +
                    'values($1, $2, $3, $4, $5, $6)',
                    [
                        menuItemsJson[key].itemId,
                        menuItemsJson[key].title,
                        menuItemsJson[key].desc,
                        menuItemsJson[key].price,
                        menuItemsJson[key].status,
                        allergens
                    ])
                    .then(() =>
                    {
                        for (let keyCategory in menuItemsJson[key].category)
                        {

                            if (menuItemsJson[key].category.hasOwnProperty(keyCategory))
                            {
                                pool.query("insert into menu_itemsXmenu_categories(itemId, categoryId) " +
                                    "values($1, $2)",
                                    [
                                        menuItemsJson[key].itemId,
                                        menuItemsJson[key].category[keyCategory]
                                    ]
                                );
                            }
                        }

                    })
            }
        }
    }

    function uploadMenuCategories()
    {
        let promise;
        for (var key in menuCategoriesJson)
        {

            if (menuCategoriesJson.hasOwnProperty(key))
            {

                promise = pool.query('insert into menu_categories(categoryId, title, description) ' +
                    'values($1, $2, $3)',
                    [
                        menuCategoriesJson[key].categoryId,
                        menuCategoriesJson[key].title,
                        menuCategoriesJson[key].desc
                    ])
            }
        }
        return promise;
    }
});



// // the rest of the route handlers are mostly the same as in EX3 with important differences
// app.get("/products", checkAuth, (req, res) => {
//     pool.query("Select * from products").
//     then(data => res.status(200).send(data.rows))
// });

// app.get("/product/:id", checkAuth, (req, res) => {
//     pool.query(
//         "Select * " +
//         "from products " +
//         "where id = $1"
//     ,[req.params.id]).
//     then(data => res.status(200).send(data.rows))
// });

// app.post("/product/:id", checkAuth, (req, res) => {
//     pool.query(
//         "update products " +
//         "set description = $2 " +
//         "where id = $1"
//     ,[req.params.id, req.body.description]).
//     then(data => res.status(200).send(data.rows))
//     .catch(err => res.status(400).send());
// });

// app.get("/logout", (req, res) => {
//     req.session.destroy()

//     if(req.session != null)
//     {
//         res.status(400).send();
//     }

//     res.status(200).send("Successfully logged out");
// });

// //For debugging
// app.get("/session", checkAuth, (req, res) => {
//      res.status(200).send(req.session)
// });

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);
