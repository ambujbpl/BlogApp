module.exports = {
  connectionString : "mongodb+srv://yourMongohost:yourMongoUser@app.xb7b5.mongodb.net/yourDBName?retryWrites=true&w=majority",
  port : 3355,
  secret : "this should be bigger secret dont show anyone",
  maxAge: 300,//3(days) * 24(hous) * 60(Min) * 60(sec); = 3 Days
}