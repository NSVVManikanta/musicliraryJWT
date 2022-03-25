const express = require('express'); 
const sequelize =require('./util/database');
const albums = require('./models/albums');
const songs = require('./models/songs');
const route = require('./routes/route');
const users = require('./routes/user');
const auth = require('./routes/auth')
const app = express();

app.use(express.json());

albums.hasMany(songs,{ foreignKey: 'albumId' });
songs.belongsTo(albums);

sequelize
.sync()
.then((result)=>{
    console.log(result);
}).catch(err=>console.log(err));

app.use('/',route);
app.use('/auth',auth);
app.use('/users',users);





app.listen(8080,()=>{
    console.log('Sever running on 8080!');
});