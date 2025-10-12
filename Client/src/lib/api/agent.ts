import axios from "axios";

const sleep=(dealy:number)=>{
    return new Promise(resolve=>{
        setTimeout(resolve,dealy);
    });
}

const agent=axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

agent.interceptors.response.use(async response=>{        //When we talk about Axios, the term “interceptor” is basically the Axios version of “middleware.”
    try{
        await sleep(1000);
        return response;
    }
    catch(error){
        console.log(error);
        return  Promise.reject(error);
    }
});

export default agent;


// delay:number  EXP:-
// In plain JavaScript, you’d just write (delay).
// In TypeScript, you can annotate the type of a variable


// Vite automatically picks:
// .env.development when you run npm run dev
// .env.production when you run npm run build