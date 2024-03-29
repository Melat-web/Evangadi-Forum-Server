const dbConnection = require("../DB/dbConfig");

// post answer
const postanswer = async (req, res) => {
    const { answer } = req.body;
    console.log("ansewers", answer);
    console.log("Answer length:", answer.length);

    // const questionid = req.params.questionid;
    // const userid = req.user.userid;
    // console.log(questionid);

    const questionid = req.params.questionid; // Change to questionId
    const userid = req.user.userid;
    console.log("Questionid:", questionid);

    if (!answer) {
        return res.status(300).json({ msg: "provide answer field" });
        // (custom status, not standard HTTP) i.e, though 300 is not a standard HTTP status code;it might be a custom code in your application
    }
    try {
        await dbConnection.query(
            "INSERT INTO answers (questionid, userid, answer  ) value(?,?,?)",
            [questionid, userid, answer]
        );

        return res.status(200).json({ msg: "Answer posted successfully" });
    } catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json({ msg: "something went to wrong try again later" });
        // In case of an error during the database operation, it catches the error.
    }
};

// get answer
const getanswer = async (req, res) => {
    // const answerid = req.params.answerid;
    // console.log("Received request for answers of answerid:", answerid);
    // const questionid = req.params.questionid;
    // Change from answerid to questionid
    // console.log("Received request for answers of questionid:", questionid);
    //
    const questionid = req.params.questionid;
    console.log("Received request for answers of questionid:", questionid);

    try {
        let [allAnswer] = await dbConnection.query(
            `SELECT a.answer, u.username FROM answers a INNER JOIN users u ON a.userid = u.userid
WHERE a.questionid  = ?`,
            [questionid]
        );
        return res.status(200).json({ allAnswer });
    } catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json({ msg: "something went to wrong try again later" });
    }
};

module.exports = { postanswer, getanswer };

// const DbConection = require("../db/dbConfige");
// const uuid=require("uuid");
// //post answer
// const postanswer = async (req, res) => {
//   const { answer } = req.body;
//   // const userid = req.params.questionid;
//   const { userid } = req.user;
//   // console.log(questionid);
//   if (!answer) {
//     return res.status(400).json({msg:'provide answer field'})
//   }
//   try {
//     const answerid=uuid.v4();

//     await DbConection.query('INSERT INTO answer(questionid,userid, answer  ) value(?,?,?)',[ answerid, userid, answer,])

//     return res.status(200).json({msg:'Answer posted successfully'})
//   } catch (error) {
//     console.log(error.message);
//     return res
//       .status(500)
//       .json({ msg: "something went to wrong try again later" });
//   }
// };
// const getanswer = async (req, res) => {
// 	const answerid = req.params.answerid;
//   console.log(answerid)

// 	try {
// 		let [allAnswer] = await dbConnection.query(
// 			`SELECT answers.answer, users.username FROM answers INNER JOIN users ON answers.userid = users.userid
// WHERE answers.questionid = ?`,
// 			[questionid]
// 		);
// 		return res.status(200).json({ allAnswer });
// 	} catch (error) {
// 		console.log(error.message);
// 		return res
// 			.status(500)
// 			.json({ msg: "something went to wrong try again later" });
// 	}
// };

// module.exports = { postanswer, getanswer };
