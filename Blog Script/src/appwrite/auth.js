import config from "../config/config.js";
import { Client, Account } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {  // this constructor will be called when the class is instantiated
        this.client
            .setEndpoint(config.appwriteUrl) // Your Appwrite Endpoint
            .setProject(config.appwriteProjectId); // Your project ID
        this.account = new Account(this.client); 
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // call another method
                return this.Login({email, password});
            }else{
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }

    async Login({email, password}){
        try {
            await this.account.createEmailPasswordSession({
                email: 'email@example.com',
                password: 'password'
            });
        } catch (error) {
            
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: Logout :: error", error);
        }
    }
}

const authService = new AuthService(); // here we are creating a single instance of AuthService class and above we are defining this class 

export default AuthService