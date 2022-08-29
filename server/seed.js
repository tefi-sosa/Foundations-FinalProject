require('dotenv').config()
const {DATABASE_URL} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

////////////////////////////////////////////////////////////////////

const hikes = [
  {
      id: 0,
      name: 'Table Rock Mountain', 
      url: 'https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMjkyMDE0MTQvMTAzYWUyNjAzNThiYjRhMzYxMzVhOWQ5MTFlNDZlZGQuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ==',
      difficulty: "Hard",
      rating: 4, 
  },
  {
    id: 1,
    name: 'Fitz Roy', 
    url: 'https://besthike.files.wordpress.com/2019/08/46445784931_594de8be61_z.jpg',
    difficulty: "Hard",
    rating: 5, 
},
] 

module.exports = {
  hikes,
  seed: (req, res) => {
    sequelize.query(`
    DROP TABLE IF EXISTS hikes cascade;    
    DROP TABLE IF EXISTS location;
    DROP TABLE IF EXISTS favorites;        


    create table location (
        location_id serial primary key, 
        location_name varchar(100), 
        state varchar(50)
    );

    CREATE TABLE hikes (
        hike_id serial primary key, 
        hike_name varchar(100), 
        hike_dificulty varchar(100), 
        img_url varchar(300), 
        hike_distance integer,
        hike_elevation integer,
        hike_rating decimal,
        location_id integer references location(location_id),
        location_map varchar(300)        
    );

    create table favorites (
        favorites_id serial primary key, 
        hike_id integer references hikes(hike_id)
    );

    insert into location (location_name, state)
    values ('El Chalten', 'Santa Cruz'),
        ('Calafate', 'Santa Cruz'),
        ('Humahuaca', 'Jujuy'),
        ('Iguazu National Park', 'Misiones');

    insert into hikes (hike_name, hike_dificulty, img_url, hike_distance, hike_elevation, hike_rating, location_id, location_map)
    values ('Laguna de los Tres', 'Moderate', 'https://mapio.net/images-p/46998982.jpg', 12.9, 3326, 5, 1, 'https://goo.gl/maps/JA2gXxizyjM1vxaa7' ),
        ('Laguna Torre', 'Hard', 'https://live.staticflickr.com/94/31376760961_6d94eac77d_b.jpg', 11.4, 1771, 4.8, 1,'https://goo.gl/maps/3BNJLnWPw1833bkN6'),
        ('Loma del Pliegue Tumbado', 'Hard', 'https://walk-trek.tur.ar/wp-content/uploads/2020/05/Loma-del-pliegue-10-comp-min-1024x574.jpg', 11.4, 3704, 5, 1, 'https://goo.gl/maps/tcU88LpsoaWnF2T3A' ),
        ('Glaciar Perito Moreno', 'Easy', 'https://www.maravillasdelatierra.com/wp-content/uploads/2019/12/Perito-moreno-001.jpg', 2.9, 623, 4.8, 2, 'https://goo.gl/maps/zauLSQ1aRXoYptd79'),
        ('Circuito Inferior Cataratas del Iguazu', 'Easy', 'https://www.hotelinfo.com.ar/uploads/60ff57d19523b.jpg', 1.3, 203, 4.7, 4, 'https://goo.gl/maps/YGkega2e3UB1huWPA'),
        ('El Hornocal', 'Easy', 'https://www.clarin.com/img/2017/10/13/BJoX9OChZ_1256x620.jpg', 0.7, 229, 4.5, 3, 'https://goo.gl/maps/gqfUnNWwxWfrjZNt7');
        `).then(() => {
          console.log('DB seeded!')
          res.sendStatus(200)
      }).catch(err => console.log('error seeding DB', err))
  }
}
