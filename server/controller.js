require("dotenv").config();
const Sequelize = require('sequelize')


const { default: axios } = require("axios");

const { BASEURL, KEY, CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
let movieId = []

module.exports = {
  getPopMovie: (req, res) => {
    const idArr = [];
    axios
      .get(
        `${BASEURL}movie/top_rated?api_key=${KEY}&language=en-US&page=${
          ((Math.random() * 100) | 0) + 1
        }`
      )
      .then((dbres) => {
        for (let i = 0; i < dbres.data.results.length; i++) {
          idArr.push(dbres.data.results[i].id);
        }
        const randomID = (Math.random() * idArr.length) | 0;
        axios
          .all([
            axios.get(
              `${BASEURL}movie/${idArr[randomID]}?api_key=${KEY}&language=en-US`
            ),
            axios.get(
              `${BASEURL}movie/${idArr[randomID]}/watch/providers?api_key=${KEY}&language=en-US`
            ),
          ])
          .then(
            axios.spread((dbres1, dbres2) => {
              const dbObj = {
                ...dbres1.data,
                ...dbres2.data,
              };
              res.status(200).send(dbObj);
            })
          )
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  genreMovie: (req, res) => {
    const { genre, date, date1 } = req.body;
    let counter = 0

    const findGenre = () => {
      const idArr = [];
      axios
        .get(
          `${BASEURL}movie/top_rated?api_key=${KEY}&language=en-US&page=${
            ((Math.random() * 100) | 0) + 1
          }&primary_release_date.gte=${date}&primary_release_date.lte=${date1}&with_genres=${genre}`
        )
        .then((dbres) => {
          // loops over the page of movies obj and adds the movie id to an array
          for (let i = 0; i < dbres.data.results.length; i++) {
            idArr.push(dbres.data.results[i].id);
          }
          if (idArr.length === 0) {
            counter += 1;
            if (counter < 10) {
              console.log(counter);
              findGenre();
              return;
            } else {
              res.status(204).send("no movie found");
            }
          }
          const randomID = (Math.random() * idArr.length) | 0;
          axios
            .all([
              axios.get(
                `${BASEURL}movie/${idArr[randomID]}?api_key=${KEY}&language=en-US`
              ),
              axios.get(
                `${BASEURL}movie/${idArr[randomID]}/watch/providers?api_key=${KEY}&language=en-US`
              ),
            ])
            .then(
              axios.spread((dbres1, dbres2) => {
                const dbObj = {
                  ...dbres1.data,
                  ...dbres2.data,
                };
                res.status(200).send(dbObj);
              })
            )
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    };
    findGenre();
  },
  getFood: (req, res) => {
    console.log('hit food end')
    axios.get('http://www.themealdb.com/api/json/v1/1/random.php')
    .then(dbres => {
      console.log(dbres)
      res.status(200).send(dbres.data)
    })
  },
  categoryFood: (req, res) => {
    console.log(req.body)
    const {category} = req.body
    axios.get(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(dbres => {
      //this get a random obj from the category response
      const randomMealID = (Math.random() * dbres.data.meals.length) | 0
      console.log(dbres.data.meals[randomMealID].idMeal)
      axios.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${dbres.data.meals[randomMealID].idMeal}`)
      .then(dbres2 => {
        console.log(dbres2.data)
        res.send(dbres2.data)
      })
    })
  },
  countryFood: (req, res) => {
    const {country} = req.body
    axios.get(`http://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
        .then(dbres => {
          const randomMealID = (Math.random() * dbres.data.meals.length) | 0
      console.log(dbres.data.meals[randomMealID].idMeal)
      axios.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${dbres.data.meals[randomMealID].idMeal}`)
      .then(dbres2 => {
        console.log(dbres2.data)
        res.send(dbres2.data)
      })
        })
  },
  // this was the first add movie functions
  addMovie: (req, res) => {
    const {id} = req.body
    // where ${user_id};
    sequelize.query(`
    select * from movieId;
    `)
    .then(sqlres => {
      if(sqlres[0].length <= 20){
        sequelize.query(`
        insert into movieID(movie_id)
        values(${id})
        `)
      }
      sqlres[0].map(el => {
        movieId.push(el.movie_id)
      })
      // movieId.push(sqlres[0][0].movieId)
      // console.log(movieId)
    })
  },
  displayList: (req,res) => {
    const list = []
    sequelize.query(`
    select * from movieId;
    `)
    .then(sqlres => {
      //takes movie_ids from db and adds it to an array in controller named movieId
       axios.all(sqlres[0].map(el => {
        
         return axios.get(`${BASEURL}movie/${el.movie_id}?api_key=${KEY}&language=en-US`)   
      }))
        .then(axios.spread((...mdbres) => {
          let info = []
          mdbres.map(el => {
            info.push(el.data)
          })
        //  let info = JSON.parse({mdbres})
        //  let info = {mdbres}[0]
         console.log(info)
        res.status(200).send(info)
        }))
    })
    .catch(err => console.log(err))
  },
  deleteMovie: (req, res) => {
    console.log(req.params.id)
    sequelize.query(`
    delete from movie_info2
    where id = '${req.params.id}';
    `)
    .then(dbres => {
      console.log(dbres.data)
      res.status(200).send(dbres.data)
    })
  },
  addUser: (req, res) => {
    console.log(req.body)
    const {userName, password} = req.body
    if(userName && password){
    sequelize.query(`
      insert into users(user_name, user_password)
      values('${userName}', '${password}');
       select user_name from users
       where user_name = '${userName}';
    `)
    .then(dbres => {
      console.log(dbres)
      res.status(200).send(dbres[0])
    })} else{
      res.status(200).send('no user found')
    }
  },
  checkUser: (req, res) => {
    //user and password are user input fro login form
    const {user, password} = req.body
    sequelize.query(`
    select * from users
    where user_name = '${user}'
    and user_password = '${password}'
    `)
    .then(dbres => {
      console.log(dbres[0].user_name, user)
      // looking for a obj in the sql response
      if(dbres[0][0]){
        res.status(200).send(dbres[0])
      }else{
        res.status(200).send()
      }
    })
  }
  , addMovie2: (req, res) => {
    let {title, image, UserID} = req.body
    title = title.replace("'", '~')
    console.log(title, image, UserID)
    sequelize.query(`
    select * from movie_info2
    where user_id = ${UserID};
    `)
    .then(sqlres => {
      if(sqlres[0].length <= 19){
        console.log('hit the insert one')
        sequelize.query(`
        insert into movie_info2(title, image, user_id)
        values('${title}', '${image}', ${UserID});
        
        select * from movie_info2;
        `)
        .then(dbres => {
            res.status(200).send(dbres[0])
        })
      }else if(sqlres[0].length >= 19){
        res.status(200).send('tooManyMovies')
      }
    })
  },
  displayList2: (req, res) => {
    console.log(req.body)
    sequelize.query(`
    select * from movie_info2
    where user_id = '${req.body.userID}';
    `)
    .then(dbres => {
      // console.log(dbres)
      res.status(200).send(dbres[0])
    })
  }
};
