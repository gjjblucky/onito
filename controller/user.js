const db=require('../db')
const mysql = require('mysql2/promise')

exports.longestDuration=async(req,res)=>{
    try {
        const connection=await mysql.createConnection(db)
        const result = await connection.execute(`SELECT tconst,primaryTitle,runtimeMinutes,genres FROM movies ORDER BY runtimeMinutes DESC LIMIT 10`)
       if (!result) {
        res.json({status:404, message:"data not found"})
        
       } else {
        // console.log(result[0])
        res.json({status:200, message:"successfull", data:result[0]})
       }
      
    } catch (error) {
        console.log(error)
        res.json({status:503, message:"something went wrong", err:error})
    }
}

exports.addMovies = async (req, res) => {
   
  
   try {
    const connection = await mysql.createConnection(db)
     const { tconst, titleType, primaryTitle, runtimeMinutes, genres } = req.body
   
     
     const sqlSearch = 'SELECT * FROM movies WHERE primaryTitle = ?'
     const matchemail = await connection.execute(sqlSearch, [primaryTitle])
   
     if (matchemail[0].length !== 0) {
       res.status(409).json({ status: '409 conflict', message: 'movie already exist' })
     } else {
      await connection.execute(`INSERT INTO movies (tconst,titleType,primaryTitle,runtimeMinutes,genres
            ) VALUES
         (?,?,?,?,?)`, [(tconst || null),
           (titleType || null),
         (primaryTitle || null),
         (runtimeMinutes || null),
         (genres || null)
       ])
   
       res.status(201).json({ status: '201 created', message: 'movie added successfully' })
     }
   } catch (error) {
    console.log(error)
    res.json({status:503, message:"something went wrong", err:error})
   }
  }

  exports.topratedMovies=async(req,res)=>{
    
    try {
        const connection = await mysql.createConnection(db)
        const result = await connection.execute(`SELECT movies.tconst, movies.primaryTitle,movies.genres,ratings.averageRating
        FROM ratings
        INNER JOIN movies ON ratings.tconst = movies.tconst WHERE ratings.averageRating>6`)

        if (!result) {
         res.json({status:404, message:"data not found"})
         
        } else {
         // console.log(result[0])
         res.json({status:200, message:"successfull", data:result[0]})
        }
    } catch (error) {
        console.log(error)
    res.json({status:503, message:"something went wrong", err:error})
    }
  }

  exports.runtime=async(req,res)=>{
    try {
      const connection = await mysql.createConnection(db)
      
      await connection.execute(`UPDATE movies SET runtimeMinutes = CASE 
      WHEN   genres="ANIMATION" THEN (runtimeMinutes + 30)
      WHEN genres="Documentary" THEN (runtimeMinutes + 15)
    
      ELSE runtimeMinutes +45 END`)
      const result= await connection.execute(`SELECT * FROM movies`)
      
      res.json({status:201, message:"successfull", data:result[0]})
  
    } catch (error) {
      console.log(error)
      res.json({status:503, message:"something went wrong", err:error})
    }

  }

  // my sql query 
  // `UPDATE movies SET runtimeMinutes = CASE 
  //     WHEN   genres="ANIMATION" THEN (runtimeMinutes + 30)
  //     WHEN genres="Documentary" THEN (runtimeMinutes + 15)
    
  //     ELSE runtimeMinutes +45 END`