
export const initState = [];
export const reducer = (state, action)=>{
     switch (action.type){
        case "addUser":
           return [ {name:action.userName,
             messages: []
           }, ...state]
        
        case "removeUser":
           return state.filter((user)=>user.name!== action.name)
          
         case "initUsers":
           return action.users.map((user)=>({
             name: user,
             messages: [],
           }))
           
        case "addMessage":
           return state.map((user)=>{
             if(user.name === action.name)
                   return {
                       name: user.name,
                       messages: [...user.messages, action.payload]
                   }
                 return user
           })

        default :
          return state;
     }
};