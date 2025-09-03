import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Tables, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    tables;

    constructor(){
        this.client 
        .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
        .setProject(conf.appwriteProjectId); // Your project ID
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        this.tables = new Tables(this.client);
    }

    async createPost(slug, {title, content, featuredImage, status, userId}){
        try {
            return await this.tables.createRow({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug, 
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
        }); 
        return true;
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return false
        }
    }

    async updatePost(slug, {title,  content, featuredImage, status}){
        try {
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                },
            })

        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try{
            return this.tables.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
            });
        }catch(error){
            console.log("Appwrite service :: deletePost :: error", error);
        }
    }

    async getPost(slug){
        try {
           return await this.tables.getRow({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
           });
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
    }
    
    async getPosts(query = [Query.equal("status", "Active")]){
        try {
           return await this.tables.listRow({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                queries: query,
           });
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file,
            })
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            })

        }catch(error){
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    async getFilePreview(fileId){
        try{
            return this.bucket.getFilePreview({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            })
        }catch(error){
            console.log("Appwrite service :: getFilePreview :: error", error);
            return false
        }
    }
}
const service = new Service();

export default service;