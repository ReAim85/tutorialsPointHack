import axios from 'axios'

const Auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwMTM0MjIsImVtYWlsIjoidmlzaGFsLmpoYS51ZzI1QGlpbG0uZWR1IiwibmFtZSI6IlZpc2hhbCBKaGEiLCJ0eXBlIjoiVSIsInVzZXJHcm91cElkIjoxMjMsIm9yZ2FuaXphdGlvbl9pZCI6MTA3LCJpYXQiOjE3NzIxOTc5NjZ9.zIZP47Iq7Jt_Kz5B-HlGFI-k6YPZ51XlisTxZfxQjPg"
const fetchCode = 543881
const postLink = "https://restapi.tutorialspoint.com/api/v1/course/quiz/post"

const automateQuiz = async () =>{
    const fetchRes = await axios.get(`https://restapi.tutorialspoint.com/api/v1/course/quiz/${fetchCode}/get`, {headers: {"Authorization": Auth}})

    // console.log(fetchRes.data.data[0].id, fetchRes.data.data[0].content_id)
    // console.log(fetchRes.data.data)
    let array = fetchRes.data.data;
    let contentId = array[0].content_id
    let idArr  = array.map(x => x.id)
    console.log(idArr, contentId)

    await idArr.forEach(async (x) => {
        try{
        let body = {
            question_id: x,
            is_correct_option: 1,
            user_option: 255568,
            content_id: contentId
        }

        let postRes = await axios.post(postLink, body, {headers: {"Authorization": Auth}});

        (postRes.status != 200) && console.log(postRes.message)
    }catch(err){
        console.log(err)
    }
    });
    console.log("all should be done")
    
}

automateQuiz()