const dbConnection = require("../DB/dbConfig");

const postQuestions = async (req, res) => {
  // Check if request body or required fields are missing
  if (!req.body || !req.body.title || !req.body.description) {
    return res
      .status(400)
      .json({ error: "Missing or incomplete data in the request body." });
  }

  // Destructure request body and extract title, description, and tag
  const { title, description, tag } = req.body;

  // Destructure the userid from the req.user object, which is set by the authentication middleware
  const { userid } = req.user;

  // Generate a unique questionid using a combination of timestamp and a random number
  const timestamp = Date.now();
  console.log("data now ", Date.now());
  const randomId = Math.floor(Math.random() * 1000);
  console.log(
    "math floor and random number",
    Math.floor(Math.random() * 1000)
    //generates a random floating-point number between 0 (inclusive) and 1 (exclusive), and then multiplies it by 1000.
    //   [0, 1000)
  );
  const questionid = `${timestamp}${randomId}`;
  console.log(questionid);

  try {
    // Check if a question with the same title and description already exists
    const [existingQuestion] = await dbConnection.query(
      "SELECT title, description FROM questions WHERE title = ? AND description = ?",
      [title, description]
    );
    // The use of [existingQuestion] is a shorthand for extracting the first element of the array returned by dbConnection.query. It's equivalent to doing something like const resultArray = await dbConnection.query(...); const existingQuestion = resultArray[0];.
    // the 'existingQuestion' itself is an array,like [[],[]]
    // The assumption here is that the query is designed to return either zero or one row from the database. If no matching question is found, existingQuestion will be an empty array ([]). If a matching question is found, existingQuestion will be an array containing the details of that question.

    // If a similar question exists, return a 409 conflict response
    if (existingQuestion.length > 0) {
      console.log(existingQuestion);
      return res.status(400).json({ existingQuestion });
      // .json({ error: "A similar question already exists" });
    }

    // Check if the description is not empty/or less character than 10
    if (description.length <= 10) {
      return res.status(400).json({ error: "Description cannot be empty" });
    }

    // Insert the new question into the database with the generated questionid, title, description, userid, and tag
    await dbConnection.query(
      "INSERT INTO questions (questionid, title, description, userid, tag) VALUES (?, ?, ?, ?,? )",
      [questionid, title, description, userid , tag]
    );

    // Return a 201 created response if the question is successfully inserted
    return res.status(201).json({ msg: "Question submitted" });
  } catch (error) {
    // Log and return a 500 internal server error response if an error occurs
    console.log(error.message);
    res.status(500).json({
      error: "Something went wrong, please try again",
      //  500 Internal Server Error response
    });
  }
};

async function allQuestions(req, res) {
  try {
    const [allQuestion] = await dbConnection.query(
      `SELECT q.questionid, q.title, u.username FROM questions q JOIN users u ON q.userid = u.userid  ORDER BY id DESC;`
      // The use of aliases (q = for question and u = for users) makes the query more readable and helps avoid ambiguity when referencing columns from multiple tables.
    );
    // console.log(allQuestion);
    console.log(allQuestion);
    return res.status(200).json({ allQuestion });
  } catch (error) {
    // Log and return a 500 internal server error response if an error occurs
    console.log(error.message);
    res.status(500).json({ msg: "Something went wrong, please try again" });
  }
}

async function singleQuestion(req, res) {
  const questionid = req.params.questionid;
  console.log("questionId", questionid);
  //check if the question id is provided by the user
  if (!req.params.questionid) {
    return res.status(400).json({ msg: "single question id not provided" });
  }

  try {
    //query to the database to select the question
    const [oneQuestion] = await dbConnection.query(
      "SELECT * FROM questions WHERE questionid = ?",
      [questionid]
    );
    console.log(oneQuestion);

    //check if the provided question id is not in the database
    if (oneQuestion.length == 0) {
      return res
        .status(400)
        .json({ msg: "question not found with the provided id" });
    } else {
      //if the provided question id is exist on the database return the data
      // console.log(oneQuestion);
      res.send({ oneQuestion });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Something went wrong, please try again" });
  }
}

module.exports = { postQuestions, allQuestions, singleQuestion };

// const {v4:uuidv4}= require("uuid");
// const dbconnection = require("../DB/dbConfig");
// const postQuestions = async (req, res) => {
//   try{
//     const [questions] = await dbconnection.query("SELECT * FROM questions ORDER BY questionid DESC");
//   res.json(questions);
//   }catch(error){
//     res.status(500).json({msg: error.message});
//   }
// };
// const allQuestions = async (req, res) => {
// const{title, description} = req.body;
// const userid =req.User.Userid;
//  console.log(userid);
// if (!title || !description) {
//   return res.status(400).json({msg: "Please enter all fields"});
// }
// const questionid = uuidv4();
// try {
//   await dbconnection.query(
//     "INSERT INTO questions(questionid, title, description, userid) VALUES(?,?,?,?)", [questionid, userid, title, description]);
  
//   res.status(201).json({msg: "Question submitted"});
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({msg: error.message});
//   }
// };
// module.exports={postQuestions, allQuestions}