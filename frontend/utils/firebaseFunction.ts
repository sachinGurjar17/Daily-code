import { ref, set, update, onValue, runTransaction , getDatabase } from 'firebase/database';


interface User {
    email:string,
    username : string ,
    userId : number ,
    isAdmin : boolean ,
    points : number,
    totalSolvedQuestion : number,
    easyQuestions : number ,
    mediumQuestions : number ,
    hardQuestions : number,
    lastSubmission : number ,
    solvedQuestions : number[]
}

const db = getDatabase();
export async function getNewUserId() {
  const userIdRef = ref(db, 'counter');
  try {
    const newId = await runTransaction(userIdRef, (currentId) => {
      return (currentId || 0) + 1;
    });
    return newId.snapshot.val();
  } catch (error) {
    console.error('Error generating new user ID: ', error);
    throw error;
  }
}

export async function getUserData(){
    const userRef = ref(db,'/users');
    try{
        onValue(userRef , (snapshot)=>{
            if(snapshot.exists()){
                return snapshot.val();
            }else{
                console.log("no data available");
            }
        })
    }catch(e){
        console.log("error",e);
    }
}

export async function updateUserData(user:User) {
    const userRef = ref(db, `users/${user.email.replace('.', '_')}`); 

        try {
          await update(userRef, {
            points: user.points ,
            easyQuestions: user.easyQuestions,
            mediumQuestions: user.mediumQuestions,
            hardQuestions: user.hardQuestions,
            lastSubmission: user.lastSubmission,
            totalSolvedQuestion:user.totalSolvedQuestion,
            solvedQuestions:user.solvedQuestions
          });
          console.log('User data updated in Firebase');
        } catch (error) {
          console.error('Error updating user data in Firebase:', error);
        }
}
